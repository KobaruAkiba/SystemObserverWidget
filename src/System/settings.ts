import fs from 'fs';
import path from 'path';
import { app } from 'electron';

type UserSettingsData = {
	windowSize: {
		width: number;
		height: number;
	};
	refreshTicks: number;
};

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings: UserSettingsData = {
	windowSize: {
		width: 380,
		height: 200,
	},
	refreshTicks: 3,
};

const writeDefaultUserSettings = (): UserSettingsData => {
	fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
	return { ...defaultSettings };
};

const readSettingsFromDisk = (): UserSettingsData => {
	if (!fs.existsSync(settingsPath)) {
		return writeDefaultUserSettings();
	}

	try {
		const data = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
		return { ...defaultSettings, ...data };
	} catch (error) {
		return writeDefaultUserSettings();
	}
};

const saveSettings = (data: UserSettingsData) => {
	userSettingsCache = { ...userSettingsCache, ...data };
	fs.writeFile(settingsPath, JSON.stringify(data, null, 2), (err) => {
		if (err) console.error('Failed to save settings: ', err);
	});
};

const loadSettings = (): UserSettingsData => userSettingsCache;

let userSettingsCache: UserSettingsData = readSettingsFromDisk();

export { UserSettingsData, loadSettings, saveSettings };
