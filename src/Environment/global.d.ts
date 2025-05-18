declare global {
	interface Window {
		sow: {
			cpu: {
				getCpuName: () => Promise<string>;
				getCpuLoad: () => Promise<number>;
				getCpuTemperature: () => string;
			};
			gpu: {
				getGpuName: () => Promise<string>;
				getGpuMemoryLoad: () => Promise<number>;
				getGpuTotalMemory: () => Promise<number>;
				getGpuLoadTemperature: () => Promise<number>;
			};
			mb: {
				getMotherboardName: () => Promise<{ manufacturer: string; model: string }>;
				getMotherboardBiosVersion: () => Promise<string>;
			};
			ram: {
				getMemoryLoad: () => Promise<number>;
				getTotalMemory: () => Promise<number>;
				getMemoryBanksLayout: () => Promise<string>;
			};
			getOsInfo: () => Promise<{ distro: string; arch: string }>;
			minimize: () => void;
		};
	}
}

export {};
