const gpuName = document.getElementById('gpu-name') as HTMLElement;
const cpuCircle = document.getElementById('cpu-usage-circle') as HTMLElement;
const cpuText = document.getElementById('cpu-percentage') as HTMLElement;

const updateStats = async () => {
	await window.sysinfo
		.getCPU()
		.then((cpuData) => {
			const animationDuration = Math.max(0.2, 1 - (cpuData.currentLoad / 100) * (1 - 0.2)); // Calcola la durata dell'animazione in base al carico della CPU
			cpuCircle.style.animationDuration = `${animationDuration}s`;
			cpuText.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
		})
		.catch((error) => console.error('Error fetching CPU data:', error));

	await window.sysinfo
		.getGPU()
		.then((gpuData) => {
			gpuName.textContent = gpuData.controllers[0]?.utilizationGpu?.toString() || 'N/A';
		})
		.catch((error) => console.error('Error fetching GPU data:', error));
};

setInterval(updateStats, 3000); // aggiorna ogni 3 sec
