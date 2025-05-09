import { contextBridge, ipcRenderer } from 'electron';
import { setCpuLoad, setCpuName, setCpuTemperature } from './Renderers/cpuRenderer';
import { setGpuMemoryLoad, setGpuName, setGpuTemperature } from './Renderers/gpuRenderer';
import { ipcEvents } from './Utils/events';
import { setMotherBoardInfo, setOsInfo } from './Renderers/extraRenderers';

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
	setMotherBoardInfo: (mbManufacturerElement: HTMLElement, mbModelElement: HTMLElement) =>
		setMotherBoardInfo(mbManufacturerElement, mbModelElement),
	setOsInfo: (osDistroElement: HTMLElement, osArchElement: HTMLElement) =>
		setOsInfo(osDistroElement, osArchElement),
	minimize: () => ipcRenderer.send(ipcEvents.minimize),
	forceFocus: () => ipcRenderer.send(ipcEvents.forceFocus),
});
