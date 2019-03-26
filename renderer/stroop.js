const TextVal = $('.stroopText')
let numAns = 0
let correctAns = 0
let stroopGuessTime = []
let minGuessTime
let maxGuessTime
let meanGuessTime
let endStroopTime
let startStroopTime
let interval

startStr = () => {
  // Show module & update UI
  $('.stroopModule').show()
  $('#showcase').hide()
  $('.navbar-nav').hide()
  TextVal.show()
  TextVal.text('')

  // reset parameter
  numAns = 0
  correctAns = 0
  stroopGuessTime = []
  minGuessTime = 0
  maxGuessTime = 0
  meanGuessTime = 0

  let countdown = 3
  interval = setInterval(() => {
    if (countdown > 0) {
      TextVal.text(countdown)
      countdown--
    } else {
      phase1()
      clearInterval(interval)
    }
  }, 1000)

}

phase1 = () => {
  const wordSequence = ['แดง', 'เหลือง', 'เขียว', 'น้ำเงิน']
  let answer
  let i = 0
  $('body').css('background', 'white')
  TextVal.css('color', 'black')
  TextVal.text(wordSequence[i])
  startStroopTime = new Date()
  $(document).keydown((e) => {
    numAns++
    stroopGuessTime.push(new Date() - startStroopTime)
    switch (e.key) {
      case 'q':
        answer = 'แดง'
        break;
      case 'w':
        answer = 'เหลือง'
        break;
      case 'e':
        answer = 'เขียว'
        break;
      case 'r':
        answer = 'น้ำเงิน'
        break;
    }
    checkAnswerPhase12(answer)
    i++
    if (i > 3) {
      phase2()
    } else {
      TextVal.text(wordSequence[i])
      startStroopTime = new Date()
    }

  })
}

phase2 = () => {
  const colSequence = ['red', 'yellow', 'green', 'blue']
  let answer
  let i = 0
  // Hide text show only color
  TextVal.hide()
  TextVal.text(colSequence[i])
  $('body').css('background', colSequence[i])
  startStroopTime = new Date()
  $(document).off('keydown').keydown((e) => {
    numAns++
    switch (e.key) {
      case 'q':
        answer = 'red'
        break;
      case 'w':
        answer = 'yellow'
        break;
      case 'e':
        answer = 'green'
        break;
      case 'r':
        answer = 'blue'
        break;
    }
    stroopGuessTime.push(new Date() - startStroopTime)
    checkAnswerPhase12(answer)
    i++
    if (i > 3) {
      phase3()
    } else {
      $('body').css('background', colSequence[i])
      TextVal.text(colSequence[i])
      startStroopTime = new Date()
    }

  })
}

phase3 = () => {
  const color = ['red', 'yellow', 'green', 'blue']
  const textCol = ['แดง', 'เหลือง', 'เขียว', 'น้ำเงิน']
  const totalColor = 4
  const totalRound = 50
  let chooseColor
  let thisRound = 0;

  // clear body color and show text
  $('body').css('background', 'black')
  TextVal.show()

  startStroopTime = new Date()
  TextVal.text(textCol[Math.floor(Math.random() * 4)])
  chooseColor = Math.floor(Math.random() * 4)
  TextVal.css('color', color[chooseColor])
  thisRound++

  $(document).off('keydown').keydown((e) => {
    numAns++
    stroopGuessTime.push(new Date() - startStroopTime)
    switch (e.key) {
      case 'q':
        answer = 'red'
        break;
      case 'w':
        answer = 'yellow'
        break;
      case 'e':
        answer = 'green'
        break;
      case 'r':
        answer = 'blue'
        break;
    }

    if (answer === color[chooseColor]) {
      correctAns++
    }

    if (thisRound < totalRound) {
      TextVal.text(textCol[Math.floor(Math.random() * 4)])
      chooseColor = Math.floor(Math.random() * 4)
      TextVal.css('color', color[chooseColor])
      startStroopTime = new Date()
      thisRound++
    } else {
      $(document).off('keydown')
      $('body').css('background', 'white')
      minGuessTime = Math.min.apply(null, stroopGuessTime)
      maxGuessTime = Math.max.apply(null, stroopGuessTime)
      meanGuessTime = stroopGuessTime.reduce((a, b) => a + b) / stroopGuessTime.length
      $('.stroopText').hide()
      $('.stroopModule').append(`<div class="alert alert-success">
      <strong>เสร็จสิ้น!</strong><br>
      Accuracy = ${getData().accuracy.toFixed(2)}<br>
      Min respond time = ${getData().minGuessTime.toFixed(2)}ms<br>
      Max respond time= ${getData().maxGuessTime.toFixed(2)}ms<br>
      Mean respond time = ${getData().meanGuessTime.toFixed(2)}ms
    </div>`)
    }

  })

}

checkAnswerPhase12 = (answer) => {
  if (answer === TextVal.text()) {
    correctAns++
  }
}

clearStr = () => {
  $('body').css('background', 'white')
  TextVal.css('color', 'black')
  TextVal.hide()
  $('.stroopModule').find('.alert').remove()
  clearInterval(interval)
}

// Get the data
getData = () => {
  return {
    accuracy: correctAns / numAns * 100,
    minGuessTime: minGuessTime,
    maxGuessTime: maxGuessTime,
    meanGuessTime: meanGuessTime
  }
}

module.exports = {
  startStr: startStr,
  clearStr: clearStr,
  getData: getData
}