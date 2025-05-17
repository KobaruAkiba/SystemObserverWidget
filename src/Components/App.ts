import { html, LitElement, PropertyValues } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import './CpuMonitor';
import './GpuMonitor';
import './MotherboardMonitor';
import './OperativeMonitor';
import './RamMonitor';

@customElement('app-component')
export class App extends LitElement {
	// Consider removing this and add component style in shadow dom
	createRenderRoot() {
		return this;
	}

	private handleClick = () => window.sow.minimize();

	render() {
		return html`<div class="app">
			<div class="window-controls">
				<div class="widget-move-bar"></div>
				<span class="window-buttons">
					<button
						id="minimize-button"
						class="window-button"
						@click=${this.handleClick}
					>
						-
					</button>
				</span>
			</div>
			<div class="content">
				<cpu-monitor></cpu-monitor>
				<gpu-monitor></gpu-monitor>
				<ram-monitor></ram-monitor>
				<motherboard-monitor></motherboard-monitor>
				<operative-monitor></operative-monitor>
			</div>
		</div>`;
	}
}
