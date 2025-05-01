import { Systeminformation } from 'systeminformation';

declare global {
	interface Window {
		sysinfo: {
			getCPU: () => Promise<Systeminformation.CurrentLoadData>;
			getGPU: () => Promise<Systeminformation.GraphicsData>;
		};
	}
}

export {};
