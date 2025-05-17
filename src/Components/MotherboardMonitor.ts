import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('motherboard-monitor')
export class MotherboardMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
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
					...
				</div>
				<div
					id="motherboard-model"
					class="text-ellipsis"
				>
					...
				</div>
				<div
					id="motherboard-bios"
					class="text-ellipsis"
				>
					...
				</div>
			</div>
		</div>`;
	}
}

