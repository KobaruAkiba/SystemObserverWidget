import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('percentage-monitor-bar')
export class PercentageMonitorBar extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: String }) barId = '';
	@property({ type: String }) progressTextId = '';
	@property({ type: String }) progressText = '';

	render() {
		return html`<div class="filling-bar-container">
			[
			<span class="filling-bar-wrapper">
				<span
					id=${this.barId}
					class="filling-bar"
				>
					<span class="filling-line-trashold trashold-40"></span>
					<span class="filling-line-trashold trashold-75"></span>
					<span class="filling-line-trashold trashold-90"></span>
				</span>
			</span>
			<span
				id=${this.progressTextId}
				class="filling-bar-usage-number"
				>${this.progressText}</span
			>
			]
		</div>`;
	}
}

