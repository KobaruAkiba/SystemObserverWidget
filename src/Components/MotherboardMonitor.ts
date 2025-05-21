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
		const { mb } = window.sow;
		await mb.getMotherboardName().then((response) => {
			this.mbManufacturer = response.manufacturer;
			this.mbModel = response.model;
		});
		await mb.getMotherboardBiosVersion().then((response) => (this.mbBios = response));
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

