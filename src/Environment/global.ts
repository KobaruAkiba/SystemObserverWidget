export {};

declare global {
  interface Window {
    sysinfo: {
      getCPU: () => Promise<{ currentLoad: number }>;
      getGPU: () => Promise<{ controllers: { name?: string }[] }>;
    };
  }
}
