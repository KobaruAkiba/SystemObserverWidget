import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './InfoTooltip';

@customElement('window-controls')
export class WindowControls extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	@property({ type: Boolean }) isSettingsPanelOpen: boolean = false;
	@property({ attribute: false }) settingsPanelClick?: () => void;

	private handleMinimizeClick = window.sow.minimize;

	private handleSettingsPanelClick() {
		this.settingsPanelClick?.();
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
						<div class="side-bar-ticks">
							<info-tooltip
								text="Number of seconds between detections"
								position="bottom"
							>
								<div>Ticks</div>
							</info-tooltip>
							<div>3 s</div>
						</div>
					</div>`
				: html``}
		</div>`;
	}
}
