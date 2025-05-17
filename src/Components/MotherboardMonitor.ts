import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('motherboard-monitor')
export class MotherboardMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@state() mbManufacturer = '...';
	@state() mbModel = '...';
	@state() mbBios = '...';

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		const mb = await window.sow.mb.getMotherboardName();
		this.mbBios = await window.sow.mb.getMotherboardBiosVersion();
		this.mbManufacturer = mb.manufacturer;
		this.mbModel = mb.model;
	}

	render() {
		return html` <div
			id="motherboard-container"
			class="grid-container"
		>
			<div
				id="motherboard-icon"
				class="background-icon grid-item"
			></div>
			<div class="grid-item">
				<div>[MotherBoard]</div>
				<div
					id="motherboard-manufacturer"
					class="text-ellipsis"
				>
					${this.mbManufacturer}
				</div>
				<div
					id="motherboard-model"
					class="text-ellipsis"
				>
					${this.mbModel}
				</div>
				<div
					id="motherboard-bios"
					class="text-ellipsis"
				>
					${this.mbBios}
				</div>
			</div>
		</div>`;
	}
}

