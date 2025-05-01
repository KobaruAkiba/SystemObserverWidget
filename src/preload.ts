import { contextBridge } from 'electron';
import si from 'systeminformation';
import { getGpuMemoryUsage, getGpuTemperature } from './Utils/gpuInfo';
import { getCpuTemperatureWindows } from './Utils/cpuInfo';

// Exposes the sysinfo API to the renderer process
contextBridge.exposeInMainWorld('sysinfo', {
	getCoreLoad: () => si.currentLoad(),
	getCpu: () => si.cpu(),
	getCpuTemperature: () => si.cpuTemperature(),
	getCpuTemperatureWindows: () => getCpuTemperatureWindows(),
	getGpu: () => si.graphics(),
	getGpuMemory: () => getGpuMemoryUsage(),
	getGpuTemperature: () => getGpuTemperature(),
});
