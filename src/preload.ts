import { contextBridge, ipcRenderer } from 'electron';
import { ipcEvents } from './Utils/events.js';
import { setCpuLoad, getCpuName, getCpuTemperature } from './Renderers/cpuRenderer.js';
import { setGpuMemoryLoad, getGpuName, setGpuTemperature } from './Renderers/gpuRenderer.js';
import { getOsInfo } from './Renderers/extraRenderers.js';
import { getMotherboardBiosVersion, getMotherboardName } from './Renderers/motherboardRenderer.js';
import { getMemoryBanksLayout, setMemoryLoad } from './Renderers/ramRenderer.js';

contextBridge.exposeInMainWorld('sow', {
	cpu: {
		getCpuName: () => getCpuName(),
		setCpuLoad: (
			cpuCircleIcon: HTMLElement,
			cpuPercentageElement: HTMLElement,
			cpuPercentageBarElement: HTMLElement
		) => setCpuLoad(cpuCircleIcon, cpuPercentageElement, cpuPercentageBarElement),
		getCpuTemperature: () => getCpuTemperature(),
	},
	gpu: {
		getGpuName: () => getGpuName(),
		setGpuMemoryLoad: (
			gpuCircleIcon: HTMLElement,
			gpuPercentageElement: HTMLElement,
			gpuPercentageBarElement: HTMLElement
		) => setGpuMemoryLoad(gpuCircleIcon, gpuPercentageElement, gpuPercentageBarElement),
		setGpuTemperature: (gpuTemperatureElement: HTMLElement, gpuTemperatureBarElement: HTMLElement) =>
			setGpuTemperature(gpuTemperatureElement, gpuTemperatureBarElement),
	},
	mb: {
		getMotherboardName: () => getMotherboardName(),
		getMotherboardBiosVersion: () => getMotherboardBiosVersion(),
	},
	ram: {
		setMemoryLoad: (ramPercentageElement: HTMLElement, ramPercentageBarElement: HTMLElement) =>
			setMemoryLoad(ramPercentageElement, ramPercentageBarElement),
		getMemoryBanksLayout: () => getMemoryBanksLayout(),
	},
	getOsInfo: () => getOsInfo(),
	minimize: () => ipcRenderer.send(ipcEvents.minimize),
});
