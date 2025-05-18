import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
} from 'src/Utils/styling';

@customElement('cpu-monitor')
export class CpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Number }) cpuLoad = 0;
	@state() cpuName = '...';
	@state() cpuPercentage = '...%';
	@state() cpuTemperature = '...°C';
	@state() cpuFanSpinningDuration = '1s';
	@state() cpuPercentageBarWidth = '0%';
	@state() cpuPercentageBarColor = 'green';

	protected firstUpdated(_changedProperties: PropertyValues): void {
		const { cpu } = window.sow;
		cpu.getCpuName().then((response) => (this.cpuName = response));
		this.cpuTemperature = `${cpu.getCpuTemperature()}°C`;
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		if (_changedProperties.has('cpuLoad')) {
			this.updateCpuLoad();
		}
	}

	updateCpuLoad(): void {
		if (this.cpuLoad < 0) {
			this.cpuPercentage = 'N/A%';
			return;
		}

		this.cpuPercentage = `${this.cpuLoad.toFixed(1)}%`;
		this.cpuFanSpinningDuration = `${calculateAnimationDurationFromPercentage(this.cpuLoad)}s`;
		this.cpuPercentageBarWidth = `${this.cpuLoad}%`;
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
						barWidth=${this.cpuPercentageBarWidth}
						barBackgroundColor=${this.cpuPercentageBarColor}
						progressText=${this.cpuPercentage}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
					<percentage-monitor-bar
						progressText=${this.cpuTemperature}
						style="width: 100%;"
					>
					</percentage-monitor-bar>
				</div>
			</div>
		`;
	}
}
