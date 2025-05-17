import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';

@customElement('cpu-monitor')
export class CpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@query(`#cpu-usage-container`) cpuUsageContainer!: HTMLDivElement;
	@query('#cpu-usage-circle') cpuCircle!: HTMLDivElement;
	@query('#cpu-usage-name') cpuNameElement!: HTMLElement;
	@query('#cpu-numbers-percentage') cpuPercentage!: HTMLElement;
	@query('#cpu-usage-percentage-bar') cpuPercentageBar!: HTMLElement;
	@query('#cpu-numbers-temperature') cpuTemperature!: HTMLElement;
	@query('#cpu-usage-temperature-bar') cpuTemperatureBar!: HTMLElement;

	@state() cpuName = '...';

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		this.cpuName = await window.sow.cpu.getCpuName();
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
						barId="cpu-usage-percentage-bar"
						progressTextId="cpu-numbers-percentage"
						progressText="...%"
						style="width:100%;"
					>
					</percentage-monitor-bar>
					<percentage-monitor-bar
						barId="cpu-usage-temperature-bar"
						progressTextId="cpu-numbers-temperature"
						progressText="...°C"
						style="width:100%;"
					>
					</percentage-monitor-bar>
				</div>
			</div>
		`;
	}
}

