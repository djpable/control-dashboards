const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  ipcMain.handle('backend-show-status', async (event, { index, status }) => {
    const backendExe = path.join(__dirname, 'backend', 'ControlBackend.dll');
    const statusText = status === 'on' ? 'green' : 'red';
    const message = `Controllo ${index + 1}: LED ${statusText}`;

    return new Promise((resolve) => {
      const proc = spawn('dotnet', [backendExe, statusText, message], { windowsHide: true, shell: false });

      proc.on('close', (code) => {
        resolve({ code });
      });
      proc.on('error', (err) => {
        resolve({ error: err.message });
      });
    });
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});