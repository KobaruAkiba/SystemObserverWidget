import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('percentage-monitor-bar')
export class PercentageMonitorBar extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: String }) progressText = '';
	@property({ type: String }) barWidth = '';
	@property({ type: String }) barBackgroundColor = '';
	@property({ type: Boolean }) isDisabled = false;

	render() {
		return html`<div class="filling-bar-container">
			[
			<span class="filling-bar-wrapper">
				<span
					class="filling-bar ${this.isDisabled ? 'disabled-bar' : ''}"
					style="width: ${this.isDisabled ? '100%' : this.barWidth}; 
					background-color: ${this.isDisabled ? '' : this.barBackgroundColor};"
				>
					<span class="${this.isDisabled ? '' : 'filling-line-trashold trashold-40'}"></span>
					<span class="${this.isDisabled ? '' : 'filling-line-trashold trashold-75'}"></span>
					<span class="${this.isDisabled ? '' : 'filling-line-trashold trashold-90'}"></span>
				</span>
			</span>
			<span class="filling-bar-usage-number">${this.progressText}</span>
			]
		</div>`;
	}
}

