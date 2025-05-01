import { contextBridge } from 'electron';
import si from 'systeminformation';

console.log('Preload script loaded.');

contextBridge.exposeInMainWorld('sysinfo', {
	getCPU: () => si.currentLoad(),
	getGPU: () => si.graphics(),
});
