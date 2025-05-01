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

/**
 * Updates the load status of the machine
 */
const updateStats = async () => {
	await window.sysinfo
		.getCoreLoad()
		.then((cpuData) => {
			console.log('cpu data:', cpuData);
			const animationDuration = Math.max(0.2, 1 - (cpuData.currentLoad / 100) * (1 - 0.2)); // Calcola la durata dell'animazione in base al carico della CPU
			cpuCircle.style.animationDuration = `${animationDuration}s`;
			cpuPercentage.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
		})
		.catch((error) => console.error('Error fetching current load data:', error));

	await window.sysinfo
		.getCpuTemperatureWindows()
		.then((tempData) => {
			console.log('temperature data:', tempData);
			cpuTemperature.textContent = `${tempData}°C`;
		})
		.catch((error) => console.error('Error fetching CPU temperature data:', error));

	await window.sysinfo
		.getGpuMemory()
		.then((gpuMemoryData) => {
			if (gpuMemoryData) {
				gpuPercentage.textContent = `${((gpuMemoryData.used / gpuMemoryData.total) * 100).toFixed(1)}%`;
			} else {
				gpuPercentage.textContent = 'N/A';
			}
		})
		.catch((error) => console.error('Error fetching GPU memory data:', error));

	await window.sysinfo
		.getGpuTemperature()
		.then((tempData) => {
			if (tempData) {
				gpuTemperature.textContent = `${tempData}°C`;
			} else {
				gpuTemperature.textContent = 'N/A';
			}
		})
		.catch((error) => console.error('Error fetching GPU temperature data:', error));
};

setCpuName();
setGpuName();
setInterval(updateStats, 3000); // aggiorna ogni 3 sec
