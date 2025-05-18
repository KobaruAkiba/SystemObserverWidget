import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './PercentageMonitorBar';

@customElement('ram-monitor')
export class RamMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@state() memoryBanksLayout = '...';

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		this.memoryBanksLayout = await window.sow.ram.getMemoryBanksLayout();
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

