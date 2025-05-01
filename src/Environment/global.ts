import { IGpuMemoryUsage } from 'src/Utils/gpuInfo';
import { Systeminformation } from 'systeminformation';

declare global {
	interface Window {
		sysinfo: {
			getCoreLoad: () => Promise<Systeminformation.CurrentLoadData>;
			getCpu: () => Promise<Systeminformation.CpuData>;
			getCpuTemperature: () => Promise<Systeminformation.CpuTemperatureData>;
			getCpuTemperatureWindows: () => Promise<number | null>;
			getGpu: () => Promise<Systeminformation.GraphicsData>;
			getGpuMemory: () => Promise<IGpuMemoryUsage | null>;
			getGpuTemperature: () => Promise<number | null>;
		};
	}
}

export {};
