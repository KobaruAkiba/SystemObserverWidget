import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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

	@state() cpuLoad: number = 0;
	@state() gpuLoad: number = 0;
	@state() gpuTemperature: number = 0;
	@state() ramLoad: number = 0;

	private handleClick = () => window.sow.minimize();
	private updateStates = () => {
		const { cpu, gpu, ram } = window.sow;
		cpu.getCpuLoad().then((response) => (this.cpuLoad = response));
		gpu.getGpuMemoryLoad().then((response) => (this.gpuLoad = response));
		gpu.getGpuLoadTemperature().then((response) => (this.gpuTemperature = response));
		ram.getMemoryLoad().then((response) => (this.ramLoad = response));
	};

	protected async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
		setInterval(this.updateStates, 3000);
	}

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
				<cpu-monitor cpuLoad=${this.cpuLoad}></cpu-monitor>
				<gpu-monitor
					gpuLoad=${this.gpuLoad}
					gpuTemperature=${this.gpuTemperature}
				>
				</gpu-monitor>
				<ram-monitor memoryLoad=${this.ramLoad}></ram-monitor>
				<motherboard-monitor></motherboard-monitor>
				<operative-monitor></operative-monitor>
			</div>
		</div>`;
	}
}
