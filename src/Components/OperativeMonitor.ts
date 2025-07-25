import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { loadingStrings } from '../Utils/notAvailable';

@customElement('operative-monitor')
export class OperativeMonitor extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@state() osDistro = loadingStrings.Dots;
	@state() osArch = loadingStrings.Dots;

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		await window.sow.getOsInfo().then((response) => {
			this.osDistro = response.distro;
			this.osArch = response.arch;
		});
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
					${this.osDistro}
				</div>
				<div
					id="os-arch"
					class="text-ellipsis"
				>
					${this.osArch}
				</div>
			</div>
		</div>`;
	}
}

