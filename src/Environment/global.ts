declare global {
	interface Window {
		sow: {
			cpu: {
				setCpuName: (cpuNameElement: HTMLElement) => Promise<void>;
				setCpuLoad: (
					cpuCircleIcon: HTMLElement,
					cpuPercentageElement: HTMLElement,
					cpuPercentageBarElement: HTMLElement
				) => Promise<void>;
				setCpuTemperature: (
					cpuTemperatureElement: HTMLElement,
					cpuTemperatureBarElement: HTMLElement
				) => Promise<void>;
			};
			gpu: {
				setGpuName: (gpuNameElement: HTMLElement) => Promise<void>;
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
			setMotherBoardInfo: (
				mbManufacturerElement: HTMLElement,
				mbModelElement: HTMLElement
			) => Promise<void>;
			setOsInfo: (osDistroElement: HTMLElement, osArchElement: HTMLElement) => Promise<void>;
			minimize: () => void;
			forceFocus: () => void;
		};
	}
}

export {};
