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
	@state() cpuTemperature: number = 0;
	@state() gpuLoad: number = 0;
	@state() gpuTemperature: number = 0;
	@state() ramLoad: number = 0;
	@state() isSettingsPanelOpen: boolean = false;

	private handleSettingPanelClick = () => {
		this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
	};

	private handleMinimizeClick = () => window.sow.minimize();

	private updateStates = async () => {
		// TODO: find a way to optimize not successfull calls (timeout after number of tries?)
		const { cpu, gpu, ram } = window.sow;
		await cpu.getCpuLoad().then((response) => (this.cpuLoad = response));
		await cpu.getCpuTemperature().then((response) => (this.cpuTemperature = response));
		await gpu.getGpuMemoryLoad().then((response) => (this.gpuLoad = response));
		await gpu.getGpuLoadTemperature().then((response) => (this.gpuTemperature = response));
		await ram.getMemoryLoad().then((response) => (this.ramLoad = response));
	};

	protected firstUpdated(_changedProperties: PropertyValues): void {
		setInterval(this.updateStates, 3000);
	}

	render() {
		return html`<div class="app">
			<div class="window-controls">
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
						@click=${this.handleSettingPanelClick}
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
							<div>Options</div>
							<div>_ Minimize</div>
						</div>`
					: html``}
			</div>
			<div class="content ${this.isSettingsPanelOpen ? 'with-other-settings' : ''}">
				<cpu-monitor
					cpuLoad=${this.cpuLoad}
					cpuTemperature=${this.cpuTemperature}
				></cpu-monitor>
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
