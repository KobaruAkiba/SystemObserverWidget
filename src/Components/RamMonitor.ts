import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './PercentageMonitorBar';
import { nameof } from 'src/Utils/types';
import { calculateColorFromPercentage } from 'src/Utils/styling';

@customElement('ram-monitor')
export class RamMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) memoryLoad = 0;

	totalMemory = 0;

	@state() memoryBanksLayout = '...';
	@state() memoryPercentageText = '...%';
	@state() memoryPercentageBarWidth = '0%';
	@state() memoryPercentageBarColor = 'green';

	protected firstUpdated(_changedProperties: PropertyValues): void {
		const { ram } = window.sow;
		ram.getMemoryBanksLayout().then((response) => (this.memoryBanksLayout = response));
		ram.getTotalMemory().then((response) => (this.totalMemory = response));
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		if (_changedProperties.has(nameof<RamMonitor>('memoryLoad')) && this.totalMemory > 0) {
			this.updateMemoryLoad();
		}
	}

	private updateMemoryLoad() {
		if (this.memoryLoad < 0) {
			this.memoryPercentageText = 'N/A%';
			this.memoryPercentageBarWidth = '0%';
			this.memoryPercentageBarColor = 'green';
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
					style="width:100%;"
				>
				</percentage-monitor-bar>
			</div>
		</div>`;
	}
}

