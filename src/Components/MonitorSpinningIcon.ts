import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('monitor-spinning-icon')
export class MonitorSpinningIcon extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: String }) backgroundId = '';
	@property({ type: String }) spinningId = '';
	@property({ type: String }) spinningDuration = '1s';

	render() {
		return html` <div
			id=${this.backgroundId}
			class="background-icon grid-item"
		>
			<div
				id=${this.spinningId}
				class="circle spinning-icon"
				style="animation-duration: ${this.spinningDuration};"
			></div>
		</div>`;
	}
}

