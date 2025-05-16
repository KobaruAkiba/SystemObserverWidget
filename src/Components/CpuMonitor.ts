import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './SystemStats';
import './MonitorSpinningIcon';

@customElement('cpu-monitor')
export class CpuMonitor extends LitElement {
	@query(`#cpu-usage-container`) cpuUsageContainer!: HTMLDivElement;
	@query('#cpu-usage-circle') cpuCircle!: HTMLDivElement;
	@query('#cpu-usage-name') cpuName!: HTMLElement;
	@query('#cpu-numbers-percentage') cpuPercentage!: HTMLElement;
	@query('#cpu-usage-percentage-bar') cpuPercentageBar!: HTMLElement;
	@query('#cpu-numbers-temperature') cpuTemperature!: HTMLElement;
	@query('#cpu-usage-temperature-bar') cpuTemperatureBar!: HTMLElement;

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		await window.sow.cpu.setCpuName(this.cpuName);
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
				></monitor-spinning-icon>
				<div
					id="cpu-usage-info"
					class="grid-item"
				>
					<div>[CPU]</div>
					<div
						id="cpu-usage-name"
						class="text-ellipsis"
					>
						...
					</div>
					<div class="filling-bar-container">
						[
						<span class="filling-bar-wrapper">
							<span
								id="cpu-usage-percentage-bar"
								class="filling-bar"
							>
								<span class="filling-line-trashold trashold-40"></span>
								<span class="filling-line-trashold trashold-75"></span>
								<span class="filling-line-trashold trashold-90"></span>
							</span>
						</span>
						<span
							id="cpu-numbers-percentage"
							class="filling-bar-usage-number"
							>...%</span
						>
						]
					</div>
					<div class="filling-bar-container">
						[
						<span class="filling-bar-wrapper">
							<span
								id="cpu-usage-temperature-bar"
								class="filling-bar"
							>
								<span class="filling-line-trashold trashold-40"></span>
								<span class="filling-line-trashold trashold-75"></span>
								<span class="filling-line-trashold trashold-90"></span>
							</span>
						</span>
						<span
							id="cpu-numbers-temperature"
							class="filling-bar-usage-number"
							>...°C</span
						>
						]
					</div>
				</div>
			</div>
		`;
	}
}

