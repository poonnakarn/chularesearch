// Modules
const { autoUpdater } = require('electron-updater')
const { dialog, BrowserWindow, ipcMain } = require('electron')

// Enable logging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Disable auto downloading
autoUpdater.autoDownload = false

// Check for update
exports.check = () => {
  // Start update check
  autoUpdater.checkForUpdates()

  // Listen for update found
  autoUpdater.on('update-available', () => {

    // Track download percent
    let downloadProgress = 0

    // Prompt user
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'เวอร์ชันใหม่ของ Chula Research ออกแล้ว อัพเดทเลย?',
      buttons: ['Update', 'No']
    }, (buttonIndex) => {

      // If not update button -> return
      if (buttonIndex !== 0) return

      // Else start download & show download progress
      autoUpdater.downloadUpdate()

      // Progress window
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

      // Load content HTML progress window
      progressWin.loadURL(`file://{__dirname}/renderer/progress.html`)

      // on close
      progressWin.on('closed', () => {
        progressWin = null
      })

      // Listen for progress request
      ipcMain.on('download-progress-request', (e) => {
        e.returnValue = downloadProgress
      })

      // Track download progress
      autoUpdater.on('download-progress', (d) => {
        downloadProgress = d.percent
      })

      // Listen for download complete
      autoUpdater.on('update-downloaded', () => {
        // close progress window
        if (progressWin) progressWin.close()

        // Prompt user to quit and install update
        dialog.showMessageBox({
          type: 'info',
          title: 'Update Ready',
          message: 'ดาวน์โหลดเวอร์ชันใหม่สำเร็จแล้ว ออกจากโปรแกรมเพื่อติดตั้ง?',
          buttons: ['Yes', 'Later']
        }, (buttonIndex) => {

          // if yes selected
          if (buttonIndex === 0) autoUpdater.quitAndInstall()
        })
      })
    })
  })
}