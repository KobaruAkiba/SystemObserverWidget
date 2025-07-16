import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './PercentageMonitorBar';
import { nameof } from '../Utils/types';
import { calculateColorFromPercentage, StyleColors } from '../Utils/styling';
import { toBytes } from '../Utils/numbers';
import { loadingStrings } from '../Utils/notAvailable';

@customElement('ram-monitor')
export class RamMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) memoryLoad = 0;

	totalMemory = 0;

	@state() memoryBanksLayout = loadingStrings.Dots;
	@state() memoryPercentageText = `${loadingStrings.Dots}%`;
	@state() memoryPercentageBarWidth = '0%';
	@state() memoryPercentageBarColor = StyleColors.GREEN;

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		const { ram } = window.sow;
		await ram.getTotalMemory().then((response) => (this.totalMemory = response));
		await ram
			.getMemoryBanksLayout()
			.then(
				(response) =>
					(this.memoryBanksLayout = `${response}, ${toBytes(this.totalMemory, 'GB').toFixed(1)} GB`)
			);
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		if (
			_changedProperties.has(nameof<RamMonitor>('memoryLoad')) &&
			_changedProperties.get(nameof<RamMonitor>('memoryLoad')) !== this.memoryLoad &&
			this.memoryLoad !== 0 // wait for the first tick to update
		) {
			this.updateMemoryLoad();
		}
	}

	private updateMemoryLoad() {
		if (this.memoryLoad < 0) {
			this.memoryPercentageText = `${loadingStrings.Dots}%`;
			this.memoryPercentageBarWidth = '0%';
			this.memoryPercentageBarColor = StyleColors.GREEN;
			return;
		}

		const usedMemoryPercentage = (this.memoryLoad / this.totalMemory) * 100;
		this.memoryPercentageText = `${usedMemoryPercentage.toFixed(1)}%`;
		this.memoryPercentageBarWidth = `${usedMemoryPercentage}%`;
		this.memoryPercentageBarColor = calculateColorFromPercentage(usedMemoryPercentage);
	}

	render() {
		return html` <div
			id="ram-container"
			class="grid-container"
		>
			<div
				id="ram-icon"
				class="background-icon grid-item"
			></div>
			<div class="grid-item">
				<div>[RAM]</div>
				<div
					id="ram-banks"
					class="text-ellipsis"
				>
					${this.memoryBanksLayout}
				</div>
				<percentage-monitor-bar
					barWidth=${this.memoryPercentageBarWidth}
					barBackgroundColor=${this.memoryPercentageBarColor}
					progressText=${this.memoryPercentageText}
					?isDisabled=${this.memoryLoad < 0}
					style="width:100%;"
				>
				</percentage-monitor-bar>
			</div>
		</div>`;
	}
}

