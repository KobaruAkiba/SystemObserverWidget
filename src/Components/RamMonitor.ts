import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './PercentageMonitorBar';

@customElement('ram-monitor')
export class RamMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
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
					...
				</div>
				<percentage-monitor-bar
					barId="ram-usage-percentage-bar"
					progressTextId="ram-numbers-percentage"
					progressText="...%"
					style="width:100%;"
				>
				</percentage-monitor-bar>
			</div>
		</div>`;
	}
}

