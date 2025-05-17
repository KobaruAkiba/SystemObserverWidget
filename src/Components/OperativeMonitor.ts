import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('operative-monitor')
export class OperativeMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	render() {
		return html` <div
			id="os-container"
			class="grid-container"
		>
			<div
				id="os-icon"
				class="background-icon grid-item"
			></div>
			<div class="grid-item">
				<div>[OS]</div>
				<div
					id="os-distro"
					class="text-ellipsis"
				>
					...
				</div>
				<div
					id="os-arch"
					class="text-ellipsis"
				>
					...
				</div>
			</div>
		</div>`;
	}
}

