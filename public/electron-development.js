const { app, BrowserWindow } = require('electron');
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const waitOn = require('wait-on');
const path = require('path');

function start(){

    async function createWindow() {

    await waitOn({ resources: ['http://localhost:3000'] });

    const win = new BrowserWindow({
      width: 700,
      height: 700,
      minWidth: 500,
      minHeight: 500,
      maxWidth: 1000,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      icon: path.join(__dirname, 'logo64.png'),
    });

    // Load URL depending on environment
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools({ mode: 'detach' });
  };

  // Install Redux DevTools in development
  app.whenReady().then(async () => {
    await installExtension(REDUX_DEVTOOLS);
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

};

module.exports = { start }