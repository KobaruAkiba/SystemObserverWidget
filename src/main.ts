import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false, // niente barra finestra = stile widget
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true, // rischioso da usare in produzione
    },
  });

  win.loadFile(join(__dirname, "index.html"));
};

app.whenReady().then(createWindow);
