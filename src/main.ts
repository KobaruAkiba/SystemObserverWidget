import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { ipcEvents } from './Utils/events';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 350,
		height: 200,
		minWidth: 350,
		minHeight: 200,
		frame: false, // niente barra finestra = stile widget
		transparent: true,
		hasShadow: true,
		roundedCorners: true,
		alwaysOnTop: true,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
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

app.whenReady().then(createWindow);
