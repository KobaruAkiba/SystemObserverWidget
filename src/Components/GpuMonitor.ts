import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './MonitorSpinningIcon';
import './PercentageMonitorBar';

@customElement('gpu-monitor')
export class GpuMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@state() gpuName = '...';

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		this.gpuName = await window.sow.gpu.getGpuName();
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
					${this.gpuName}
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

