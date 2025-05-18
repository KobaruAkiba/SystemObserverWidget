import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
} from 'src/Utils/styling';
import { nameof } from 'src/Utils/types';

@customElement('cpu-monitor')
export class CpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) cpuLoad = 0;

	@state() cpuName = '...';
	@state() cpuPercentageText = '...%';
	@state() cpuFanSpinningDuration = '1s';
	@state() cpuPercentageBarColor = 'green';

	@state() cpuTemperatureText = '...°C';

	protected firstUpdated(_changedProperties: PropertyValues): void {
		const { cpu } = window.sow;
		cpu.getCpuName().then((response) => (this.cpuName = response));
		this.cpuTemperatureText = `${cpu.getCpuTemperature()}°C`;
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		if (_changedProperties.has(nameof<CpuMonitor>('cpuLoad'))) {
			this.updateCpuLoad();
		}
	}

	private updateCpuLoad(): void {
		if (this.cpuLoad < 0) {
			this.cpuPercentageText = 'N/A%';
			this.cpuFanSpinningDuration = '1s';
			this.cpuPercentageBarColor = 'green';
			return;
		}

		this.cpuPercentageText = `${this.cpuLoad.toFixed(1)}%`;
		this.cpuFanSpinningDuration = `${calculateAnimationDurationFromPercentage(this.cpuLoad)}s`;
		this.cpuPercentageBarColor = calculateColorFromPercentage(this.cpuLoad);
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
						barWidth=${this.cpuPercentageText}
						barBackgroundColor=${this.cpuPercentageBarColor}
						progressText=${this.cpuPercentageText}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
					<percentage-monitor-bar
						barWidth="0%"
						barBackgroundColor="green"
						progressText=${this.cpuTemperatureText}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
				</div>
			</div>
		`;
	}
}
