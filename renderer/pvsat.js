// Sequence of number
const num = [5, 3, 1, 4, 9, 1, 7, 2, 1, 6, 5, 1, 11, 3, 2, 6, 4, 2, 10, 3, 8, 1, 3, 4, 7, 2, 3, 1, 6, 5, 3, 11, 1, 4, 6, 8, 1, 2, 7, 6, 4, 9, 3, 0, 4, 9, 5, 2, 1, 5, 3, 2, 8, 6, 7, 1, 12, 2, 7, 4, 5]
let index
// Time variables
const timer = 2000
let guessTime
let minGuessTime
let maxGuessTime
let meanGuessTime

// Number of guesses variable
let lastNum
let sumNum
let clickedNum
let correctGuess
let totalGuess
let accuracy
let interval

startGame = () => {
  index = 0
  guessTime = []
  minGuessTime = 0
  maxGuessTime = 0
  lastNum = 0
  sumNum = 0
  correctGuess = 0
  totalGuess = 0
  accuracy = 0
  //hide showcase and show PVSAT
  $('#showcase').hide()
  $('.navbar-nav').hide()
  $('.num').hide()
  $('.pvsat').show()

  nextNumber()
  updateUI()
  // Run nextNumber every 3 seconds
  interval = setInterval(() => {
    $('.num').fadeIn()
    if (index < num.length) {
      nextNumber()
      updateUI()
    }
  }, timer)

}

// Get to the next number
nextNumber = () => {
  $('.box').text(num[index])
  startTime = new Date()
  sumNum = lastNum + num[index]
  lastNum = num[index]
  index++
}

// Update element number, accuracy
updateUI = () => {
  accuracy = correctGuess / (index - 2) * 100
  $('.dataPVSAT').text(`Element: ${index} of ${num.length}, Respond Time: min = ${minGuessTime}ms, max = ${maxGuessTime}ms, mean = ${meanGuessTime}ms, Accuracy: ${accuracy}%`)
}
// Check answer
checkAnswer = () => {
  if (clickedNum === sumNum) {
    correctGuess++
  }
  minGuessTime = Math.min.apply(null, guessTime)
  maxGuessTime = Math.max.apply(null, guessTime)
  meanGuessTime = guessTime.reduce((a, b) => a + b) / guessTime.length
}

// Get data
getData = () => {
  return {
    accuracy: accuracy,
    meanGuessTime: meanGuessTime,
    maxGuessTime: maxGuessTime,
    minGuessTime: minGuessTime
  }
}

// Event handlers for buttons
$('.num1').click(() => {
  clickedNum = 1
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num2').click(() => {
  clickedNum = 2
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num3').click(() => {
  clickedNum = 3
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num4').click(() => {
  clickedNum = 4
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num5').click(() => {
  clickedNum = 5
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num6').click(() => {
  clickedNum = 6
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num7').click(() => {
  clickedNum = 7
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num8').click(() => {
  clickedNum = 8
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num9').click(() => {
  clickedNum = 9
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num10').click(() => {
  clickedNum = 10
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num11').click(() => {
  clickedNum = 11
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num12').click(() => {
  clickedNum = 12
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num13').click(() => {
  clickedNum = 13
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})
$('.num14').click(() => {
  clickedNum = 14
  endTime = new Date()
  totalGuess++
  guessTime.push(endTime - startTime)
  checkAnswer()
})

// Reset game
clearGame = () => {
  $('#showcase').show()
  $('.navbar-nav').show()
  $('.pvsat').hide()
  clearInterval(interval)
}

// Exporting modules
module.exports = {
  startGame: startGame,
  clearGame: clearGame,
  getData: getData
}
