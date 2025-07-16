import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import './PercentageMonitorBar';
import { nameof } from '../Utils/types';
import { toPercentage } from '../Utils/numbers';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
	StyleColors,
} from '../Utils/styling';
import { loadingStrings } from '../Utils/notAvailable';

@customElement('gpu-monitor')
export class GpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) gpuLoad = 0;
	@property({ type: Number }) gpuTemperature = 0;

	gpuTotalMemory = 0;
	gpuCriticalTemperature = 99; // Assuming 99°C is the max temperature

	@state() gpuName = loadingStrings.Dots;
	@state() gpuPercentageText = `${loadingStrings.Dots}%`;
	@state() gpuFanSpinningDuration = '1s';
	@state() gpuPercentageBarWidth = '0%';
	@state() gpuPercentageBarColor = StyleColors.GREEN;

	@state() gpuTemperatureText = `${loadingStrings.Dots}°C`;
	@state() gpuTemperatureBarWidth = '0%';
	@state() gpuTemperatureBarColor = StyleColors.GREEN;

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		const { gpu } = window.sow;
		await gpu.getGpuName().then((response) => (this.gpuName = response));
		await gpu.getGpuTotalMemory().then((response) => (this.gpuTotalMemory = response));
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		console.log('gpu% ', this.gpuPercentageText);
		console.log('gpu° ', this.gpuTemperatureText);

		if (
			_changedProperties.has(nameof<GpuMonitor>('gpuLoad')) &&
			_changedProperties.get(nameof<GpuMonitor>('gpuLoad')) !== this.gpuLoad &&
			this.gpuLoad !== 0 // wait for the first tick to update
		) {
			this.updateGpuLoad();
		}

		if (
			_changedProperties.has(nameof<GpuMonitor>('gpuTemperature')) &&
			_changedProperties.get(nameof<GpuMonitor>('gpuTemperature')) !== this.gpuTemperature &&
			this.gpuTemperature !== 0 // wait for the first tick to update
		) {
			this.updateGpuTemperature();
		}
	}

	private updateGpuLoad() {
		if (this.gpuLoad < 0 || this.gpuTotalMemory < 0) {
			this.gpuPercentageText = `${loadingStrings.NotAvailable}%`;
			this.gpuPercentageBarWidth = '0%';
			this.gpuFanSpinningDuration = '1s';
			this.gpuPercentageBarColor = StyleColors.GREEN;
			return;
		}

		const percentage = toPercentage(this.gpuLoad, this.gpuTotalMemory);
		this.gpuFanSpinningDuration = `${calculateAnimationDurationFromPercentage(percentage)}s`;
		this.gpuPercentageText = `${percentage.toFixed(1)}%`;
		this.gpuPercentageBarWidth = `${percentage}%`;
		this.gpuPercentageBarColor = calculateColorFromPercentage(percentage);
	}

	private updateGpuTemperature() {
		if (this.gpuTemperature < 0) {
			this.gpuTemperatureText = `${loadingStrings.NotAvailable}°C`;
			this.gpuTemperatureBarWidth = '0%';
			this.gpuTemperatureBarColor = StyleColors.GREEN;
			return;
		}

		const temperaturePercentage = toPercentage(this.gpuTemperature, this.gpuCriticalTemperature);
		this.gpuTemperatureText = `${this.gpuTemperature}°C`;
		this.gpuTemperatureBarWidth = `${temperaturePercentage}%`;
		this.gpuTemperatureBarColor = calculateColorFromPercentage(temperaturePercentage);
	}

	render() {
		return html` <div
			id="gpu-usage-container"
			class="grid-container"
		>
			<monitor-spinning-icon
				backgroundId="gpu-usage-icon"
				spinningId="gpu-usage-circle"
				spinningDuration=${this.gpuFanSpinningDuration}
			>
			</monitor-spinning-icon>
			<div
				id="gpu-usage-info"
				class="grid-item"
			>
				<div>[GPU]</div>
				<div
					id="gpu-usage-name"
					class="text-ellipsis"
				>
					${this.gpuName}
				</div>
				<percentage-monitor-bar
					barWidth=${this.gpuPercentageBarWidth}
					barBackgroundColor=${this.gpuPercentageBarColor}
					progressText=${this.gpuPercentageText}
					?isDisabled=${this.gpuLoad < 0}
					style="width:100%;"
				>
				</percentage-monitor-bar>
				<percentage-monitor-bar
					barWidth=${this.gpuTemperatureBarWidth}
					barBackgroundColor=${this.gpuTemperatureBarColor}
					progressText=${this.gpuTemperatureText}
					?isDisabled=${this.gpuTemperature < 0}
					style="width:100%;"
				>
				</percentage-monitor-bar>
			</div>
		</div>`;
	}
}

