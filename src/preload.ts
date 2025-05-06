import { contextBridge } from 'electron';
import { setCpuLoad, setCpuName, setCpuTemperature } from './Renderers/cpuRenderer';
import { setGpuMemoryLoad, setGpuName, setGpuTemperature } from './Renderers/gpuRenderer';

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
});
