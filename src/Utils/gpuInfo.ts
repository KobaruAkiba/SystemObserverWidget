import { exec } from 'child_process';
import { promisify } from 'util';

export interface IGpuMemoryUsage {
	used: number;
	total: number;
}

const execAsync = promisify(exec);

/**
 * Fallbacks to nvidia-smi to get GPU memory usage
 */
export const getGpuMemoryUsage = async (): Promise<IGpuMemoryUsage | null> => {
	try {
		const { stdout } = await execAsync(
			'nvidia-smi --query-gpu=memory.used,memory.total --format=csv,noheader,nounits'
		);

		const [usedStr, totalStr] = stdout.trim().split(', ');
		return {
			used: parseInt(usedStr),
			total: parseInt(totalStr),
		};
	} catch (err) {
		console.error('nvidia-smi failed:', err);
		return null;
	}
};

/**
 * Fallbacks to nvidia-smi to get GPU temperature
 */
export const getGpuTemperature = async (): Promise<number | null> => {
	try {
		const { stdout } = await execAsync(
			'nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits'
		);

		return parseInt(stdout.trim());
	} catch (err) {
		console.error('nvidia-smi failed:', err);
		return null;
	}
};

