// my-tooltip.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('info-tooltip')
export class InfoTooltip extends LitElement {
	@property({ type: String }) text = '';
	@property({ type: String }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	@state() private visible = false;

	static styles = css`
		:host {
			position: relative;
			display: inline-block;
		}

		.tooltip {
			position: absolute;
			background: black;
			color: white;
			padding: 4px 8px;
			border-radius: 4px;
			font-size: 0.75rem;
			white-space: nowrap;
			opacity: 0;
			transform: scale(0.95);
			transition:
				opacity 0.2s ease,
				transform 0.2s ease;
			pointer-events: none;
			z-index: 10;
			white-space: pre-wrap;
		}

		.tooltip.visible {
			opacity: 1;
			transform: scale(1);
		}

		.tooltip.top {
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%) translateY(-4px);
		}

		.tooltip.bottom {
			top: 100%;
			left: 50%;
			transform: translateX(-50%) translateY(4px);
		}

		.tooltip.left {
			right: 100%;
			top: 50%;
			transform: translateY(-50%) translateX(-4px);
		}

		.tooltip.right {
			left: 100%;
			top: 50%;
			transform: translateY(-50%) translateX(4px);
		}
	`;

	render() {
		return html`
			<div
				@mouseenter=${() => (this.visible = true)}
				@mouseleave=${() => (this.visible = false)}
				@focus=${() => (this.visible = true)}
				@blur=${() => (this.visible = false)}
				tabindex="0"
			>
				<slot></slot>
				<div class="tooltip ${this.position} ${this.visible ? 'visible' : ''}">${this.text}</div>
			</div>
		`;
	}
}

