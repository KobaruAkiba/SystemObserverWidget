import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './CpuMonitor';
import './GpuMonitor';
import './MotherboardMonitor';
import './OperativeMonitor';
import './RamMonitor';
import './WindowControls';

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

	private settingPanelClick = () => {
		this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
	};

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
			<window-controls
				?isSettingsPanelOpen=${this.isSettingsPanelOpen}
				.settingsPanelClick=${this.settingPanelClick}
			></window-controls>
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
