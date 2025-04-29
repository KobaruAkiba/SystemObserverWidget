const updateStats = async () => {
  const gpuName = document.getElementById("gpu-name");
  
  if (!window.sysinfo) {
    console.error("sysinfo is not available in the window object.");
    console.log(window);
    return;
  }

  await window.sysinfo.getCPU()
    .then((cpuData) => {
        const cpuCircle = document.getElementById('cpu-usage-circle') as HTMLElement;
        const cpuText = document.getElementById('cpu-percentage') as HTMLElement;
        // Set the border rotation based on the CPU usage percentage
        const rotationDegree = (cpuData.currentLoad / 100) * 360;
        cpuCircle.style.background = `conic-gradient(#4CAF50 ${rotationDegree}deg, #212121 ${rotationDegree}deg)`;
        // Update the CPU percentage text
        cpuText.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
      })
    .catch((error) => console.error("Error fetching CPU data:", error));

  await window.sysinfo.getGPU()
    .then((gpuData) => {
      if (gpuName) {
        gpuName.textContent = gpuData.controllers[0]?.name || "N/A";
      }})
    .catch((error) => console.error("Error fetching GPU data:", error));
};

setInterval(updateStats, 2000); // aggiorna ogni 2 sec
updateStats();
