import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { nameof } from '../Utils/types';
import { ComponentEvent, componentEvents } from '../Utils/events';

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

	// Renderers states
	@state() cpuLoad: number = 0;
	@state() cpuTemperature: number = 0;
	@state() gpuLoad: number = 0;
	@state() gpuTemperature: number = 0;
	@state() ramLoad: number = 0;

	// Config states
	@state() isSettingsPanelOpen: boolean = false;
	@state() renderIntervalId?: NodeJS.Timeout;
	@state() updateTicks: number = 3;

	private settingPanelClick = () => {
		this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
	};

	private onTicksChanged(event: ComponentEvent) {
		this.updateTicks = Number(event.detail.value);
	}

	private updateStates = async () => {
		// TODO: find a way to optimize not successfull calls (timeout after number of tries?)
		const { cpu, gpu, ram } = window.sow;
		await cpu.getCpuLoad().then((response) => (this.cpuLoad = response));
		await cpu.getCpuTemperature().then((response) => (this.cpuTemperature = response));
		await gpu.getGpuMemoryLoad().then((response) => (this.gpuLoad = response));
		await gpu.getGpuLoadTemperature().then((response) => (this.gpuTemperature = response));
		await ram.getMemoryLoad().then((response) => (this.ramLoad = response));
	};

	private updateInterval() {
		this.renderIntervalId = setInterval(() => this.updateStates(), this.updateTicks * 1000);
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.updateInterval();
	}

	protected willUpdate(_changedProperties: PropertyValues): void {
		if (_changedProperties.has(nameof<App>('updateTicks'))) {
			// if update ticks is updated, clear previous interval and restart with new delay
			if (!!this.renderIntervalId) {
				clearInterval(this.renderIntervalId);
				// render interval id is resetted or will be overrided before clearing!
				this.renderIntervalId = undefined;
				this.updateInterval();
			}
		}
	}

	render() {
		return html`<div class="app">
			<window-controls
				?isSettingsPanelOpen=${this.isSettingsPanelOpen}
				.settingsPanelClick=${this.settingPanelClick}
				updateTicks=${this.updateTicks}
				@ticks-changed=${this.onTicksChanged}
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
