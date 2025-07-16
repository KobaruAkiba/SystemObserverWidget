import { contextBridge, ipcRenderer } from 'electron';
import { ipcEvents } from './Utils/events.js';
import {
	getCpuLoad,
	getCpuMaxTemperature,
	getCpuName,
	getCpuTemperature,
} from './Renderers/cpuRenderer.js';
import {
	getGpuName,
	getGpuMemoryLoad,
	getGpuLoadTemperature,
	getGpuTotalMemory,
} from './Renderers/gpuRenderer.js';
import { getOsInfo } from './Renderers/extraRenderers.js';
import { getMotherboardBiosVersion, getMotherboardName } from './Renderers/motherboardRenderer.js';
import { getMemoryBanksLayout, getMemoryLoad, getTotalMemory } from './Renderers/ramRenderer.js';

contextBridge.exposeInMainWorld('sow', {
	cpu: {
		getCpuName: () => getCpuName(),
		getCpuLoad: () => getCpuLoad(),
		getCpuTemperature: () => getCpuTemperature(),
		getCpuMaxTemperature: () => getCpuMaxTemperature(),
	},
	gpu: {
		getGpuName: () => getGpuName(),
		getGpuMemoryLoad: () => getGpuMemoryLoad(),
		getGpuTotalMemory: () => getGpuTotalMemory(),
		getGpuLoadTemperature: () => getGpuLoadTemperature(),
	},
	mb: {
		getMotherboardName: () => getMotherboardName(),
		getMotherboardBiosVersion: () => getMotherboardBiosVersion(),
	},
	ram: {
		getMemoryLoad: () => getMemoryLoad(),
		getTotalMemory: () => getTotalMemory(),
		getMemoryBanksLayout: () => getMemoryBanksLayout(),
	},
	getOsInfo: () => getOsInfo(),
	minimize: () => ipcRenderer.send(ipcEvents.minimize),
});
