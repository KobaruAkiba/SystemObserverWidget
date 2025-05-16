import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('monitor-spinning-icon')
export class MonitorSpinningIcon extends LitElement {
	@property({ type: String }) backgroundId = '';
	@property({ type: String }) spinningId = '';

	render() {
		return html` <div
			id=${this.backgroundId}
			class="background-icon grid-item"
		>
			<div
				id=${this.spinningId}
				class="circle spinning-icon"
			></div>
		</div>`;
	}
}

