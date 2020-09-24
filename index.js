const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which country held the 2016 Summer Olympics?',
        choice1: 'China',
        choice2: 'Unitted Kingdom',
        choice3: 'Brazil',
        choice4: 'Italy',
        answer: 3,
    },
    {
        question: 'In Pirates of the Caribbean, what was the name of Captain Jack Sparrow’s ship?',
        choice1: 'The Marauder',
        choice2: 'The Black Pearl',
        choice3: 'The Black Python',
        choice4: 'The Flying Dutchman',
        answer: 2,
    },
    {
        question: 'What is the name of Superman’s home planet?',
        choice1: 'Argon',
        choice2: 'Rann',
        choice3: 'Krypton',
        choice4: 'Qward',
        answer: 3,
    },
    {
        question: 'According to Forrest Gump, “life was like…”',
        choice1: 'A bag of lemons',
        choice2: 'A handful of roses',
        choice3: 'A lollipop',
        choice4: 'A box of chocolates',
        answer: 4,
    },
    {
        question: 'What is the rarest blood type?',
        choice1: '0',
        choice2: 'AB-Positive',
        choice3: 'B',
        choice4: 'AB-Negative',
        answer: 4,
    },
    {
        question: 'Fe is the chemical symbol for…?',
        choice1: 'Zinc',
        choice2: 'Hydrogen',
        choice3: 'Fluorine',
        choice4: 'Iron',
        answer: 4,
    },
    {
        question: 'Which is the most common drink in Europe?',
        choice1: 'Tee',
        choice2: 'Beer',
        choice3: 'Wine',
        choice4: 'Water',
        answer: 2,
    },
    {
        question: 'What is the average weight of the human brain?',
        choice1: '14 kilos',
        choice2: '14 grams',
        choice3: '4 kilos',
        choice4: '2,5 kilos',
        answer: 3,
    },
    {
        question: 'Which Olympic sport is Michael Phelps known for?',
        choice1: 'Snowboarding',
        choice2: 'Skiing',
        choice3: 'Running',
        choice4: 'Swimming',
        answer: 4,
    },
    {
        question: 'What does “FBI” stand for?',
        choice1: 'Federal Bureau Inspector',
        choice2: 'Federal Bureau of Investigation',
        choice3: 'Federal Business of Investigation',
        choice4: 'Federal Bureau of Inspection',
        answer: 2,
    },
    {
        question: 'How many keys are on a piano?',
        choice1: '86',
        choice2: '87',
        choice3: '88',
        choice4: '89',
        answer: 3,
    },
    {
        question: 'How many feet are in a mile?',
        choice1: '1,037',
        choice2: '5,288',
        choice3: '5,280',
        choice4: '6,201',
        answer: 3,
    },
    {
        question: 'How many ribs are in the human body?',
        choice1: '16',
        choice2: '24',
        choice3: '19',
        choice4: '29',
        answer: 2,
    },
    {
        question: 'How many colors in the Rainbow?',
        choice1: '3',
        choice2: '5',
        choice3: '7',
        choice4: '9',
        answer: 3,
    },
    {
        question: 'How many holes are on a standard bowling ball?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


