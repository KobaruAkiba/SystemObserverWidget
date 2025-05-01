import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Fallbacks to wmic to get CPU temperature on Windows
 */
export const getCpuTemperatureWindows = async (): Promise<number | null> => {
	try {
		const { stdout } = await execAsync(
			'wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature'
		);
		const temp = parseFloat(stdout.trim().split('\n')[1]);
		const celsius = (temp - 2732) / 10; // Conversione Kelvin a Celsius
		console.log(`CPU Temperature: ${celsius}°C`);
		return celsius;
	} catch (err) {
		console.error('Could not fetch CPU temperature:', err);
		return null;
	}
};

