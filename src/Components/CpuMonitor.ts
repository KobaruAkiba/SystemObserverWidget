import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
	StyleColors,
} from '../Utils/styling';
import { nameof } from '../Utils/types';
import { loadingStrings } from '../Utils/notAvailable';
import { toPercentage } from '../Utils/numbers';

@customElement('cpu-monitor')
export class CpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) cpuLoad = 0;
	@property({ type: Number }) cpuTemperature = 0;

	@state() cpuName = loadingStrings.Dots;
	@state() cpuPercentageText = `${loadingStrings.Dots}%`;
	@state() cpuFanSpinningDuration = '1s';
	@state() cpuPercentageBarWidth = '0%';
	@state() cpuPercentageBarColor = StyleColors.GREEN;

	@state() cpuTemperatureText = `${loadingStrings.Dots}°C`;
	@state() cpuMaxTemperature = 0;
	@state() cpuTemperatureBarWidth = '0%';
	@state() cpuTemperatureBarColor = StyleColors.GREEN;

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		const { cpu } = window.sow;
		await cpu.getCpuName().then((response) => (this.cpuName = response));
		await cpu.getCpuMaxTemperature().then((response) => (this.cpuMaxTemperature = response));
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		console.log('cpu% ', this.cpuPercentageText);
		console.log('cpu° ', this.cpuTemperatureText);

		if (
			_changedProperties.has(nameof<CpuMonitor>('cpuLoad')) &&
			_changedProperties.get(nameof<CpuMonitor>('cpuLoad')) !== this.cpuLoad &&
			this.cpuLoad !== 0 // wait for the first tick to update
		) {
			this.updateCpuLoad();
		}

		if (
			_changedProperties.has(nameof<CpuMonitor>('cpuTemperature')) &&
			_changedProperties.get(nameof<CpuMonitor>('cpuTemperature')) !== this.cpuTemperature &&
			this.cpuTemperature !== 0 // wait for the first tick to update
		) {
			this.updateCpuTemperature();
		}
	}

	private updateCpuLoad(): void {
		if (this.cpuLoad < 0) {
			this.cpuPercentageText = `${loadingStrings.NotAvailable}%`;
			this.cpuFanSpinningDuration = '1s';
			this.cpuPercentageBarWidth = '0%';
			this.cpuPercentageBarColor = StyleColors.GREEN;
			return;
		}

		this.cpuPercentageText = `${this.cpuLoad.toFixed(1)}%`;
		this.cpuFanSpinningDuration = `${calculateAnimationDurationFromPercentage(this.cpuLoad)}s`;
		this.cpuPercentageBarWidth = `${this.cpuLoad}%`;
		this.cpuPercentageBarColor = calculateColorFromPercentage(this.cpuLoad);
	}

	private updateCpuTemperature(): void {
		if (this.cpuTemperature < 0 || this.cpuMaxTemperature < 0) {
			this.cpuTemperatureText = `${loadingStrings.NotAvailable}%`;
			this.cpuTemperatureBarWidth = '0%';
			this.cpuTemperatureBarColor = StyleColors.GREEN;
			return;
		}

		const tempPercentage = toPercentage(this.cpuTemperature, this.cpuMaxTemperature);
		this.cpuTemperatureText = `${this.cpuTemperature.toFixed(1)}%`;
		this.cpuTemperatureBarWidth = `${tempPercentage}%`;
		this.cpuTemperatureBarColor = calculateColorFromPercentage(tempPercentage);
	}

	render() {
		return html`
			<div
				id="cpu-usage-container"
				class="grid-container"
			>
				<monitor-spinning-icon
					backgroundId="cpu-usage-icon"
					spinningId="cpu-usage-circle"
					spinningDuration=${this.cpuFanSpinningDuration}
				>
				</monitor-spinning-icon>
				<div
					id="cpu-usage-info"
					class="grid-item"
				>
					<div>[CPU]</div>
					<div
						id="cpu-usage-name"
						class="text-ellipsis"
					>
						${this.cpuName}
					</div>
					<percentage-monitor-bar
						barWidth=${this.cpuPercentageBarWidth}
						barBackgroundColor=${this.cpuPercentageBarColor}
						progressText=${this.cpuPercentageText}
						?isDisabled=${this.cpuLoad < 0}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
					<percentage-monitor-bar
						barWidth=${this.cpuTemperatureBarWidth}
						barBackgroundColor=${this.cpuTemperatureBarColor}
						progressText=${this.cpuTemperatureText}
						?isdisabled=${this.cpuMaxTemperature < 0}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
				</div>
			</div>
		`;
	}
}
