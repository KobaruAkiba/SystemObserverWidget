// * Use preload script to expose complex logic to the renderer process
// ! Avoid using import statements in the renderer process
const minimizeButton = document.getElementById('minimize-button') as HTMLElement;

const cpuCircle = document.getElementById('cpu-usage-circle') as HTMLElement;
const cpuName = document.getElementById('cpu-usage-name') as HTMLElement;
const cpuPercentage = document.getElementById('cpu-numbers-percentage') as HTMLElement;
const cpuPercentageBar = document.getElementById('cpu-usage-percentage-bar') as HTMLElement;
const cpuTemperature = document.getElementById('cpu-numbers-temperature') as HTMLElement;
const cpuTemperatureBar = document.getElementById('cpu-usage-temperature-bar') as HTMLElement;
const gpuCircle = document.getElementById('gpu-usage-circle') as HTMLElement;
const gpuName = document.getElementById('gpu-usage-name') as HTMLElement;
const gpuPercentage = document.getElementById('gpu-numbers-percentage') as HTMLElement;
const gpuPercentageBar = document.getElementById('gpu-usage-percentage-bar') as HTMLElement;
const gpuTemperature = document.getElementById('gpu-numbers-temperature') as HTMLElement;
const gpuTemperatureBar = document.getElementById('gpu-usage-temperature-bar') as HTMLElement;
const mbManufacturer = document.getElementById('motherboard-manufacturer') as HTMLElement;
const mbModel = document.getElementById('motherboard-model') as HTMLElement;
const osDistro = document.getElementById('os-distro') as HTMLElement;
const osArch = document.getElementById('os-arch') as HTMLElement;

// Destructure the sow object from the window object
const { cpu, gpu, setOsInfo, setMotherBoardInfo, minimize, forceFocus } = window.sow;

/**
 * Updates the load status of the machine.
 * This function is called every 3 seconds.
 */
const updateStats = async () => {
	await cpu.setCpuLoad(cpuCircle, cpuPercentage, cpuPercentageBar);
	await gpu.setGpuMemoryLoad(gpuCircle, gpuPercentage, gpuPercentageBar);
	await gpu.setGpuTemperature(gpuTemperature, gpuTemperatureBar);
};

// Launch the minimize event when the minimize button is clicked
minimizeButton.addEventListener('click', () => {
	minimize();
});

window.addEventListener('mousedown', () => {
	window.focus();
	forceFocus();
});

cpu.setCpuName(cpuName);
cpu.setCpuTemperature(cpuTemperature, cpuTemperatureBar); // TODO: move into updateStats when implemented
gpu.setGpuName(gpuName);
setMotherBoardInfo(mbManufacturer, mbModel);
setOsInfo(osDistro, osArch);
setInterval(updateStats, 3000); // aggiorna ogni 3 sec
