// Modules
const { BrowserWindow } = require('electron')

// Instance of BrowserWindow
exports.win

// Function to create BrowserWindow
exports.createWindow = () => {
  this.win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 500,
    minHeight: 300,
  })


  // Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  // Listen to close event
  this.win.on('closed', () => {
    this.win = null
  })
}