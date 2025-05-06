// ! This file should be a bloated one: importing modules from other files will not work or will require to change compile options only for this file
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

// Function to calculate the animation duration based on the percentage of load
const calculateAnimationDuration = (percentage: number) =>
	Math.max(0.2, 1 - (percentage / 100) * (1 - 0.2));

// Function to calculate the color based on the percentage of load
const calculateUsageColor = (percentage: number): string => {
	if (percentage < 40) {
		return 'green';
	} else if (percentage < 75) {
		return 'yellow';
	} else if (percentage < 90) {
		return 'orange';
	} else {
		return 'red';
	}
};

/**
 * Gets the cpu name and sets it to the cpuName element.
 */
const setCpuName = async () =>
	await window.sysinfo
		.getCpu()
		.then((cpuData) => {
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
			cpuCircle.style.animationDuration = `${calculateAnimationDuration(cpuData.currentLoad)}s`;
			cpuPercentage.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
			cpuPercentageBar.style.width = `${cpuData.currentLoad}%`;
			cpuPercentageBar.style.backgroundColor = calculateUsageColor(cpuData.currentLoad);
		})
		.catch((error) => console.error('Error fetching current load data:', error));

/**
 * Sets the cpu temperature to the cpuTemperature element.
 */
const setCpuTemperature = () => {
	// TODO: implementare il recupero della temperatura della CPU
	cpuTemperature.textContent = 'N/A °C';
	cpuTemperatureBar.style.width = '0%';
};

/**
 * Gets the gpu name and sets it to the gpuName element.
 */
const setGpuName = async () =>
	await window.sysinfo
		.getGpu()
		.then((gpuData) => {
			gpuName.textContent = gpuData.controllers[0].model;
		})
		.catch((error) => console.error('Error fetching GPU data:', error));

/**
 * Sets the gpu load to the gpuPercentage element and sets the animation duration of the gpuCircle element.
 */
const setGpuMemoryLoad = async () =>
	await window.sysinfo
		.getGpuMemory()
		.then((gpuMemoryData) => {
			if (!gpuMemoryData) {
				gpuPercentage.textContent = 'N/A';
				gpuPercentageBar.style.width = '0%';
				return;
			}

			const percentage = (gpuMemoryData.used / gpuMemoryData.total) * 100;
			gpuCircle.style.animationDuration = `${calculateAnimationDuration(percentage)}s`;
			gpuPercentage.textContent = `${percentage.toFixed(1)}%`;
			gpuPercentageBar.style.width = `${percentage}%`;
			gpuPercentageBar.style.backgroundColor = calculateUsageColor(percentage);
		})
		.catch((error) => console.error('Error fetching GPU memory data:', error));

/**
 * Sets the gpu temperature to the gpuTemperature element.
 */
const setGpuTemperature = async () =>
	await window.sysinfo
		.getGpuTemperature()
		.then((tempData) => {
			if (!tempData) {
				gpuTemperature.textContent = 'N/A';
				gpuTemperatureBar.style.width = `0%`;
				return;
			}

			const temperaturePercentage = (tempData / 82) * 100; // Assuming 82°C is the max temperature
			gpuTemperature.textContent = `${tempData}°C`;
			gpuTemperatureBar.style.width = `${temperaturePercentage}%`;
			gpuTemperatureBar.style.backgroundColor = calculateUsageColor(temperaturePercentage);
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
