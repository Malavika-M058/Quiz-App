const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  } 
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Current Sheets Style', correct: false }
    ]
  },
  {
    question: 'What does SQL stand for?',
    answers: [
      { text: 'Structured Query Language', correct: true },
      { text: 'Statistical Query Language', correct: false },
      { text: 'Superior Questions Lot', correct: false },
      { text: 'Standard Query Lot', correct: false }
    ]
  },
  {
    question: 'Which of the following is not CMS?',
    answers: [
      { text: 'WordPress', correct: false },
      { text: 'SAP', correct: true },
      { text: 'Drupal', correct: false },
      { text: 'Magneto', correct: false }
    ]
  },
  {
    question: 'Which of the following is not a web hosting company?',
    answers: [
      { text: 'Blue Host', correct: false },
      { text: 'Facebook', correct: true }
    ]
  },
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'HyperText Markup Language', correct: true },
      { text: 'High Text Machine Language', correct: false },
      { text: 'HyperText and links Markup Language', correct: false },
      { text: 'Standard Query Lot', correct: false }
    ]
  },
  {
    question: '<input> is-?',
    answers: [
      { text: 'an empty tag', correct: true },
      { text: 'a format tag', correct: false },
      { text: 'all of the above', correct: false },
      { text: 'none of the above', correct: false }
    ]
  },
  {
    question: 'HTML tags are enclosed in',
    answers: [
      { text: '# and #', correct: false },
      { text: '{ and }', correct: false },
      { text: '! and ?', correct: false },
      { text: '< and >', correct: true }
    ]
  },
]
