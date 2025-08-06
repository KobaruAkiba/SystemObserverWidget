import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentEvents } from '../Utils/events';

import './InfoTooltip';

@customElement('window-controls')
export class WindowControls extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Boolean }) isSettingsPanelOpen: boolean = false;
	@property({ attribute: false }) settingsPanelClick?: () => void;
	@property({ type: Number }) updateTicks: Number = 3;

	private handleMinimizeClick = window.sow.minimize;

	private handleSettingsPanelClick() {
		this.settingsPanelClick?.();
	}

	private onTicksInput(event: Event) {
		let newValue = parseInt((event?.target as HTMLInputElement).value, 10);

		if (!Number.isNaN(newValue)) {
			newValue = Math.min(10, Math.max(1, newValue));
			this.updateTicks = newValue;
			this.dispatchEvent(
				new CustomEvent(componentEvents.ticks_changed, {
					detail: { value: this.updateTicks },
					bubbles: true, // allows bubble up to parent
					composed: true, // allows event crossing shadow dom
				})
			);
		} else {
			this.updateTicks = 3; // reset to default ticks if failing converting
		}
	}

	render() {
		return html`<div class="window-controls">
			<div class="widget-move-bar"></div>
			<span class="window-buttons">
				<button
					class="window-button"
					@click=${this.handleMinimizeClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="window-button-icon"
						viewBox="0 -960 960 960"
					>
						<path d="M240-120v-80h480v80H240Z" />
					</svg>
				</button>
				<button
					id="minimize-button"
					class="window-button"
					@click=${this.handleSettingsPanelClick}
				>
					${this.isSettingsPanelOpen === true
						? html`<svg
								xmlns="http://www.w3.org/2000/svg"
								class="window-button-icon"
								viewBox="0 -960 960 960"
							>
								<path
									d="M300-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z"
								/>
							</svg>`
						: html`<svg
								xmlns="http://www.w3.org/2000/svg"
								class="window-button-icon"
								viewBox="0 -960 960 960"
							>
								<path
									d="M460-320v-320L300-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z"
								/>
							</svg> `}
				</button>
			</span>
			${this.isSettingsPanelOpen === true
				? html` <div class="window-side-bar">
						<div class="margin-b-16">Settings</div>
						<div class="side-bar-ticks side-sub-setting">
							<info-tooltip
								text="Number of seconds between detections"
								position="bottom"
							>
								<div>🕑 Ticks</div>
							</info-tooltip>
							<div>
								<input
									class="techy-input"
									type="number"
									min="1"
									max="10"
									.value=${String(this.updateTicks)}
									@input=${this.onTicksInput}
								/>
							</div>
						</div>
					</div>`
				: html``}
		</div>`;
	}
}
