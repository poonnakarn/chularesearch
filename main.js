// Modules
const { dialog, app, ipcMain, BrowserWindow } = require('electron')
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const mainWindow = require('./mainWindow')
const dataWindow = require('./dataWindow')

let downloadPercent = 0

// Updater
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
let appversion = '1.00';
// Disable auto download
autoUpdater.autoDownload = false

function sendStatusToWindow(text, ver) {
  log.info(text);
}

// listen from ipcrenderer
ipcMain.on('view-data', (e) => {
  // Create new view data window
  dataWindow()
})
// run createWindow on mainWindow module
app.on('ready', () => {
  // Create main window
  mainWindow.createWindow()

  // Check for update after x seconds
  autoUpdater.checkForUpdates();

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// Auto-update
// auto update conditions
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...', appversion);
})

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.', appversion);
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'Chula Research เวอร์ชันใหม่ออกแล้ว ต้องการดาวน์โหลดเลยไหม?',
    buttons: ['Update', 'No']
  }, (buttonIndex) => {

    // If not 'Update' button, return
    if (buttonIndex !== 0) return

    // Else start download and show download progress in new window
    autoUpdater.downloadUpdate()

    // Create progress window
    let progressWin = new BrowserWindow({
      width: 350,
      height: 35,
      useContentSize: true,
      autoHideMenuBar: true,
      maximizable: false,
      fullscreen: false,
      fullscreenable: false,
      resizable: false
    })

    // Load progress HTML
    progressWin.loadURL(`file://${__dirname}/renderer/progress.html`)

    // Handle win close
    progressWin.on('closed', () => {
      progressWin = null
    })




  })
})

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.', appversion);
})

autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err, appversion);
})

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  downloadPercent = progressObj.percent
  sendStatusToWindow(log_message, appversion);
})

autoUpdater.on('update-downloaded', (info) => {
  setTimeout(function () {
    sendStatusToWindow('Update downloaded..Restarting App in 5 seconds', appversion);
    autoUpdater.quitAndInstall();
  }, 2000)
});

// Listen for preogress request from progressWin
ipcMain.on('download-progress-request', (event) => {
  event.returnValue = downloadPercent
})