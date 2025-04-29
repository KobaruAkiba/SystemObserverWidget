const updateStats = async () => {
  const cpuLoad = document.getElementById("cpu-load");
  const gpuName = document.getElementById("gpu-name");
  
  if (!window.sysinfo) {
    console.error("sysinfo is not available in the window object.");
    console.log(window);
    return;
  }

  await window.sysinfo.getCPU()
    .then((cpuData) => {
      if (cpuLoad) {
        cpuLoad.textContent = cpuData.currentLoad.toFixed(1);
      }})
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
