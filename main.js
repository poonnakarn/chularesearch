// Modules
const { app, ipcMain } = require('electron')
const mainWindow = require('./mainWindow')
const dataWindow = require('./dataWindow')
const updater = require('./updater')

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
  setTimeout(updater.check, 2000)
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