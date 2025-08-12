import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { ipcEvents } from './Utils/events.js';
import { loadSettings, saveSettings, UserSettingsData } from './System/settings.js';

const preloadPath = join(__dirname, 'preload.js');
const userSettings = loadSettings();

const createWindow = () => {
	const win = new BrowserWindow({
		width: userSettings.windowSize.width,
		height: userSettings.windowSize.height,
		minWidth: 380,
		minHeight: 200,
		frame: false, // widget style
		transparent: true,
		hasShadow: true,
		roundedCorners: true,
		alwaysOnTop: true,
		webPreferences: {
			preload: preloadPath,
			nodeIntegration: true,
			backgroundThrottling: false,
		},
	});

	// Automatically opens dev tools if not packaged
	if (!app.isPackaged) {
		win.webContents.openDevTools();
	}

	// Saves new window settings size when window is resized
	win.on('resized', () => {
		const windowBounds = win.getBounds();
		userSettings.windowSize.width = windowBounds.width;
		userSettings.windowSize.height = windowBounds.height;
		saveSettings(userSettings);
	});

	win.loadFile(join(__dirname, 'index.html'));
};

// Registers to the minimize event. Will minimize the window when the event is triggered.
ipcMain.on(ipcEvents.minimize, () => {
	const win = BrowserWindow.getFocusedWindow();
	if (win) {
		win.minimize();
	}
});

// Registers to the close event. Will close the window when the event is triggered.
ipcMain.on(ipcEvents.close, () => {
	const win = BrowserWindow.getFocusedWindow();
	if (win) {
		win.close();
	}
});

// Registers to load settings event. Returns user settings. Used "handle" for async
ipcMain.handle(ipcEvents.loadUserSettings, (): UserSettingsData => loadSettings());

// Registers to save settings event. Saves new user settings. Used "handle" for async
ipcMain.handle(ipcEvents.saveUserSettings, (_, args: Partial<UserSettingsData>) => {
	saveSettings({ ...userSettings, ...args });
});

app.whenReady().then(createWindow);
