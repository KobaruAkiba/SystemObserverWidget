// ! This file should be a bloated one: importing modules from other files will not work or will require to change compile options only for this file
const cpuCircle = document.getElementById('cpu-usage-circle') as HTMLElement;
const cpuName = document.getElementById('cpu-usage-name') as HTMLElement;
const cpuPercentage = document.getElementById('cpu-usage-percentage') as HTMLElement;
const cpuTemperature = document.getElementById('cpu-usage-temperature') as HTMLElement;
const gpuName = document.getElementById('gpu-usage-name') as HTMLElement;
const gpuPercentage = document.getElementById('gpu-usage-percentage') as HTMLElement;
const gpuTemperature = document.getElementById('gpu-usage-temperature') as HTMLElement;

/**
 * Gets the cpu name and sets it to the cpuName element.
 */
const setCpuName = async () =>
	await window.sysinfo
		.getCpu()
		.then((cpuData) => {
			console.log('cpu data:', cpuData);
			cpuName.textContent = cpuData.manufacturer + ' ' + cpuData.brand;
		})
		.catch((error) => console.error('Error fetching CPU data:', error));

/**
 * Sets the cpu load to the cpuPercentage element and sets the animation duration of the cpuCircle element.
 * The animation duration is calculated based on the current load of the CPU.
 */
const setCpuLoad = async () =>
	await window.sysinfo
		.getCoreLoad()
		.then((cpuData) => {
			console.log('cpu data:', cpuData);
			const animationDuration = Math.max(0.2, 1 - (cpuData.currentLoad / 100) * (1 - 0.2)); // Calcola la durata dell'animazione in base al carico della CPU
			cpuCircle.style.animationDuration = `${animationDuration}s`;
			cpuPercentage.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
		})
		.catch((error) => console.error('Error fetching current load data:', error));

/**
 * Sets the cpu temperature to the cpuTemperature element.
 */
const setCpuTemperature = () => (cpuTemperature.textContent = 'N/A °C'); // TODO: implementare il recupero della temperatura della CPU

/**
 * Gets the gpu name and sets it to the gpuName element.
 */
const setGpuName = async () =>
	await window.sysinfo
		.getGpu()
		.then((gpuData) => {
			console.log('gpu data:', gpuData);
			gpuName.textContent = gpuData.controllers[0].model;
		})
		.catch((error) => console.error('Error fetching GPU data:', error));

const setGpuMemoryLoad = async () =>
	await window.sysinfo
		.getGpuMemory()
		.then((gpuMemoryData) => {
			gpuPercentage.textContent = gpuMemoryData
				? `${((gpuMemoryData.used / gpuMemoryData.total) * 100).toFixed(1)}%`
				: 'N/A';
		})
		.catch((error) => console.error('Error fetching GPU memory data:', error));

const setGpuTemperature = async () =>
	await window.sysinfo
		.getGpuTemperature()
		.then((tempData) => {
			gpuTemperature.textContent = tempData ? `${tempData}°C` : 'N/A';
		})
		.catch((error) => console.error('Error fetching GPU temperature data:', error));

/**
 * Updates the load status of the machine.
 * This function is called every 3 seconds.
 */
const updateStats = async () => {
	await setCpuLoad();
	await setGpuMemoryLoad();
	await setGpuTemperature();
};

setCpuName();
setCpuTemperature(); // TODO: move into updateStats when implemented
setGpuName();
setInterval(updateStats, 3000); // aggiorna ogni 3 sec
