const minimizeButton = document.getElementById('minimize-button') as HTMLElement;

const gpuCircle = document.getElementById('gpu-usage-circle') as HTMLElement;
const gpuName = document.getElementById('gpu-usage-name') as HTMLElement;
const gpuPercentage = document.getElementById('gpu-numbers-percentage') as HTMLElement;
const gpuPercentageBar = document.getElementById('gpu-usage-percentage-bar') as HTMLElement;
const gpuTemperature = document.getElementById('gpu-numbers-temperature') as HTMLElement;
const gpuTemperatureBar = document.getElementById('gpu-usage-temperature-bar') as HTMLElement;
const mbManufacturer = document.getElementById('motherboard-manufacturer') as HTMLElement;
const mbModel = document.getElementById('motherboard-model') as HTMLElement;
const mbBios = document.getElementById('motherboard-bios') as HTMLElement;
const osDistro = document.getElementById('os-distro') as HTMLElement;
const osArch = document.getElementById('os-arch') as HTMLElement;
const ramBanks = document.getElementById('ram-banks') as HTMLElement;
const ramPercentage = document.getElementById('ram-numbers-percentage') as HTMLElement;
const ramPercentageBar = document.getElementById('ram-usage-percentage-bar') as HTMLElement;

// Destructure the system observer widget object from the window object
const { cpu, gpu, mb, ram, setOsInfo, minimize } = window.sow;

/**
 * Updates the load status of the machine.
 * This function is called every 3 seconds.
 */
const updateStats = async () => {
	// await cpu.setCpuLoad(cpuCircle, cpuPercentage, cpuPercentageBar);
	await gpu.setGpuMemoryLoad(gpuCircle, gpuPercentage, gpuPercentageBar);
	await gpu.setGpuTemperature(gpuTemperature, gpuTemperatureBar);
	await ram.setMemoryLoad(ramPercentage, ramPercentageBar);
};

// Launch the minimize event when the minimize button is clicked
minimizeButton.addEventListener('click', () => {
	minimize();
});

gpu.setGpuName(gpuName);
ram.setMemoryBanks(ramBanks);
mb.setMotherBoardName(mbManufacturer, mbModel);
mb.setMotherBoardBiosVersion(mbBios);
setOsInfo(osDistro, osArch);
setInterval(updateStats, 3000); // aggiorna ogni 3 sec
