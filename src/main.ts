import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { ipcEvents } from './Utils/events.js';

const preloadPath = join(__dirname, 'preload.js');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 380,
		height: 200,
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

app.whenReady().then(createWindow);
