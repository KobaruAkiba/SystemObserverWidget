declare global {
	interface Window {
		sow: {
			cpu: {
				getCpuName: () => Promise<string>;
				setCpuLoad: (
					cpuCircleIcon: HTMLElement,
					cpuPercentageElement: HTMLElement,
					cpuPercentageBarElement: HTMLElement
				) => Promise<void>;
				getCpuTemperature: () => Promise<string>;
			};
			gpu: {
				getGpuName: () => Promise<string>;
				setGpuMemoryLoad: (
					gpuCircleIcon: HTMLElement,
					gpuPercentageElement: HTMLElement,
					gpuPercentageBarElement: HTMLElement
				) => Promise<void>;
				setGpuTemperature: (
					gpuTemperatureElement: HTMLElement,
					gpuTemperatureBarElement: HTMLElement
				) => Promise<void>;
			};
			mb: {
				getMotherboardName: () => Promise<{ manufacturer: string; model: string }>;
				getMotherboardBiosVersion: () => Promise<string>;
			};
			ram: {
				setMemoryLoad: (
					ramPercentageElement: HTMLElement,
					ramPercentageBarElement: HTMLElement
				) => Promise<void>;
				getMemoryBanksLayout: () => Promise<string>;
			};
			getOsInfo: () => Promise<{ distro: string; arch: string }>;
			minimize: () => void;
		};
	}
}

export {};
