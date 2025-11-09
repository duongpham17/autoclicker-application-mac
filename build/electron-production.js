const path = require('path');
const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const { checkAccessibilityAccess, askForAccessibilityAccess}= require('node-mac-permissions');
const sudo = require('sudo-prompt');
const isAdmin = require('is-admin');

function start(){
  function createWindow() {
    const win = new BrowserWindow({
      width: 600,
      height: 600,
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

    // Load the production React build
    win.loadFile(path.join(app.getAppPath(), 'build', 'index.html'));
    // Check for autoupdates
    autoUpdater.checkForUpdatesAndNotify();
  }

  // Create window when Electron is ready
  app.whenReady().then(() => {
    createWindow();

    //MAC PERMISSIONS
    if(process.platform === "darwin"){
      setTimeout(() => {
        try {
          const hasAccess = checkAccessibilityAccess();
          if (!hasAccess) {
            const granted = askForAccessibilityAccess();
            if (!granted) console.log('Accessibility access required for full functionality.');
          }
        } catch (err) {
          console.error('Error checking macOS accessibility permissions:', err);
        }
      }, 2000);
    };

    // WIN PERMISSIONS
    if (process.platform === "win32") {
      setTimeout(() => {
        isAdmin().then(admin => {
          if (!admin) {
            dialog.showMessageBox({
              type: 'warning',
              buttons: ['Run as Administrator', 'Cancel'],
              defaultId: 0,
              title: 'Administrator Permission Needed',
              message: 'Some features (like mouse/keyboard control) require Administrator privileges. Restart as Administrator?'
            }).then(result => {
              if (result.response === 0) {
                const options = { name: 'AutoClicker' };
                const exePath = process.execPath;
                const command = `"${exePath}"`;
                sudo.exec(command, options, err => {
                  if (err) console.error('Failed to restart as admin:', err);
                  app.quit();
                });
              }
            });
          }
        });
      }, 2000);
    }

  });

  autoUpdater.on('update-available', () => {
    console.log('Update available - downloading...');
  });
  autoUpdater.on('update-not-available', () => {
    console.log('App is up to date.');
  });
  autoUpdater.on('error', (err) => {
    console.error('Error while updating:', err);
  });
  autoUpdater.on('update-downloaded', () => {
    const choice = dialog.showMessageBoxSync({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Update Ready',
      message: 'A new version has been downloaded. Restart now to install?',
    });
    if (choice === 0) autoUpdater.quitAndInstall();
  });

  // Quit when all windows are closed (except macOS)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  // Re-create window on macOS when app icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

module.exports = {start}