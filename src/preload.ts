import { contextBridge, ipcRenderer } from 'electron';
import { ipcEvents } from './Utils/events.js';
import { setCpuLoad, setCpuName, setCpuTemperature } from './Renderers/cpuRenderer.js';
import { setGpuMemoryLoad, setGpuName, setGpuTemperature } from './Renderers/gpuRenderer.js';
import { setOsInfo } from './Renderers/extraRenderers.js';
import { setMotherBoardBiosVersion, setMotherBoardName } from './Renderers/motherboardRenderer.js';
import { setMemoryBanks, setMemoryLoad } from './Renderers/ramRenderer.js';

contextBridge.exposeInMainWorld('sow', {
	cpu: {
		setCpuName: (cpuNameElement: HTMLElement) => setCpuName(cpuNameElement),
		setCpuLoad: (
			cpuCircleIcon: HTMLElement,
			cpuPercentageElement: HTMLElement,
			cpuPercentageBarElement: HTMLElement
		) => setCpuLoad(cpuCircleIcon, cpuPercentageElement, cpuPercentageBarElement),
		setCpuTemperature: (cpuTemperatureElement: HTMLElement, cpuTemperatureBarElement: HTMLElement) =>
			setCpuTemperature(cpuTemperatureElement, cpuTemperatureBarElement),
	},
	gpu: {
		setGpuName: (gpuNameElement: HTMLElement) => setGpuName(gpuNameElement),
		setGpuMemoryLoad: (
			gpuCircleIcon: HTMLElement,
			gpuPercentageElement: HTMLElement,
			gpuPercentageBarElement: HTMLElement
		) => setGpuMemoryLoad(gpuCircleIcon, gpuPercentageElement, gpuPercentageBarElement),
		setGpuTemperature: (gpuTemperatureElement: HTMLElement, gpuTemperatureBarElement: HTMLElement) =>
			setGpuTemperature(gpuTemperatureElement, gpuTemperatureBarElement),
	},
	mb: {
		setMotherBoardName: (mbManufacturerElement: HTMLElement, mbModelElement: HTMLElement) =>
			setMotherBoardName(mbManufacturerElement, mbModelElement),
		setMotherBoardBiosVersion: (mbBiosElement: HTMLElement) =>
			setMotherBoardBiosVersion(mbBiosElement),
	},
	ram: {
		setMemoryLoad: (ramPercentageElement: HTMLElement, ramPercentageBarElement: HTMLElement) =>
			setMemoryLoad(ramPercentageElement, ramPercentageBarElement),
		setMemoryBanks: (ramBanksElement: HTMLElement) => setMemoryBanks(ramBanksElement),
	},
	setOsInfo: (osDistroElement: HTMLElement, osArchElement: HTMLElement) =>
		setOsInfo(osDistroElement, osArchElement),
	minimize: () => ipcRenderer.send(ipcEvents.minimize),
});
