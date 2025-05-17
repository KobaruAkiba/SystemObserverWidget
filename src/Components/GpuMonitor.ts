import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import './PercentageMonitorBar';

@customElement('gpu-monitor')
export class GpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	render() {
		return html` <div
			id="gpu-usage-container"
			class="grid-container"
		>
			<monitor-spinning-icon
				backgroundId="gpu-usage-icon"
				spinningId="gpu-usage-circle"
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
					...
				</div>
				<percentage-monitor-bar
					barId="gpu-usage-percentage-bar"
					progressTextId="gpu-numbers-percentage"
					progressText="...%"
					style="width:100%;"
				>
				</percentage-monitor-bar>
				<percentage-monitor-bar
					barId="gpu-usage-temperature-bar"
					progressTextId="gpu-numbers-temperature"
					progressText="...°C"
					style="width:100%;"
				>
				</percentage-monitor-bar>
			</div>
		</div>`;
	}
}

