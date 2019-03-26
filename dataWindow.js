// Modules
const { BrowserWindow } = require('electron')

let bgDataWin

module.exports = () => {
  // create new browserWindow
  bgDataWin = new BrowserWindow({
    width: 800,
    height: 600,
  })

  bgDataWin.loadURL(`file://${__dirname}/renderer/viewdata.html`)

}