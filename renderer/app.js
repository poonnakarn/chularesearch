// Modules
const { ipcRenderer } = require('electron')
const patients = require('./patients')
const pvsat = require('./pvsat')
const stroop = require('./stroop')

let patientId = null

// Initialize the screen
$('.pvsat').hide()
$('.stroopModule').hide()
$('#saveData').hide()

// New Patient
$('#newPatient').click(() => {
  $('#patientId').val('')
})
// Save new patient
$('#add-button').click(() => {
  patientId = $('#patientId').val()
  $('#displayPatient').text(`รหัสผู้ป่วย: ${patientId}`)
  $('#saveData').show()
})
// View Data event
$('#viewData').click(() => {
  // send asynchronous to main process via IPC
  ipcRenderer.send('view-data', 1)
})

// PVSAT
$('#startPVSAT').click(pvsat.startGame)

// PVSAT
$('#startStroop').click(stroop.startStr)

// restart
$('#home').click(() => {
  pvsat.clearGame()
  stroop.clearStr()
  pvsatData = pvsat.getData()
})

// save data
$('#saveData').click(() => {
  if (pvsat.getData().accuracy && stroop.getData().accuracy) {
    $('#saveModalBody').text('บันทึกข้อมูลเรียบร้อย')
    $('#save-button').removeClass('btn-danger')
    $('#save-button').addClass('btn-primary')
    localStorage.setItem(patientId, JSON.stringify({ 'pvsat_acc': pvsat.getData().accuracy, 'pvsat_min': pvsat.getData().minGuessTime, 'pvsat_max': pvsat.getData().maxGuessTime, 'pvsat_mean': pvsat.getData().meanGuessTime, 'stroop_acc': stroop.getData().accuracy, 'stroop_min': stroop.getData().minGuessTime, 'stroop_max': stroop.getData().maxGuessTime, 'stroop_mean': stroop.getData().meanGuessTime }))
  } else {
    $('#saveModalBody').text('บันทึกข้อมูลไม่สำเร็จ (ยังทำแบบทดสอบไม่ครบ)')
    $('#save-button').removeClass('btn-primary')
    $('#save-button').addClass('btn-danger')
  }
})
