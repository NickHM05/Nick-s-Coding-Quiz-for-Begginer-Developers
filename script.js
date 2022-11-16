
const quizData =
    [
        {
            question: "What does HTML stand for?",
            a: "Hyperterminal Max Loader",
            b: "Hypertext Madeup Language",
            c: "Hypertext Markup Language",
            d: "Hybrid Terminal Modification Link",
            correct: "c",
            incorrect: "a, b, d",
        },
        {
            question: "What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
            a: "<head></head>",
            b: "<body></body>",
            c: "<title></title>",
            d: "<br></br>",
            correct: "a",
            incorrect: "b, c, d",
        },
        {
            question: "What property is used to specify whether or not an element should appear as if it’s on top of or above other content on the page?",
            a: "Foreground",
            b: "Float",
            c: "Jumper",
            d: "Top Level",
            correct: "b",
            incorrect: "a, c, d",
        },
        {
            question: "What are the CSS properties that are used to add space around sections of content?",
            a: "Break",
            b: "Spacing",
            c: "Clear",
            d: "Padding",
            correct: "d",
            incorrect: "a, b, c",
        },
        {
            question: "What is the object called that lets you work with both dates and time-related data?",
            a: "Dates",
            b: "Clock",
            c: "Watch",
            d: "Time",
            correct: "a",
            incorrect: "b, c, d",
        },
        {
            question: "How do functions break up?",
            a: "They leave the webpage.",
            b: "They regret their choices.",
            c: "They work things out.",
            d: "They stop calling each other!",
            correct: "d",
            incorrect: "a, b, c",
        },
        {
            question: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
            a: "Function",
            b: "Loop",
            c: "Clone",
            d: "Boolean",
            correct: "b",
            incorrect: "a, c, d",
        },
        {
            question: "What is the element used (and hidden) in code that explains things and makes the content more readable?",
            a: "Quotations",
            b: "Hidden Elements",
            c: "Comments",
            d: "Notes",
            correct: "c",
            incorrect: "a, b, d",
        },


    ];
//check line 133 on javascript to different page in case something doesnt work
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const startbutton = document.getElementById('start')
const conclusion = document.getElementById('conclusion')
const win = document.querySelector('.win')
const lose = document.querySelector('.lose')
var isWin = false;
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount;
timerCount = 100;


let currentQuiz = 0
let score = 0
let missed = 0

quiz.style.display = "none"
conclusion.style.display = "none"

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval

            conclusionshow()
        }
    }, 1000);
}

function deselectAnswers() {
    answerEls.forEach(answerEls => answerEls.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEls => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    })
    console.log("selected",answer)
    return answer
}

submitBtn.addEventListener('click', () => {
    // If the count is zero, exit function
    // if (timerCount === 0) {
    //   return;
    // }
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
            win.innerText = score
        } else {
            missed++;
            lose.innerText = missed
            timerCount -= 10
            console.log("missed",missed)
        }


        if (currentQuiz < quizData.length - 1) {
            currentQuiz++
            loadQuiz()
        } else {
            conclusionshow()
             //quiz.innerHTML = ` <h2>You answered ${score}/${quizData.length} 
             //questions correctly</h2><button onclick="location.reload()">Reload</button>`
        }
    }
})

function conclusionshow() {
    clearInterval(timer);
    quiz.style.display = "none"
    conclusion.style.display = "block"
    document.getElementById("display-score").innerText = "Your Final Score (score+time left): "+
    (score+timerCount)
    }

startbutton.addEventListener("click", function () {
    quiz.style.display = "block"
    startTimer()
    loadQuiz()
    startbutton.style.display = "none"
})

document.getElementById("save-user").addEventListener("click", function(){
    var user= {
        name:document.getElementById("user").value,
        score: (score+timerCount)
    }
    var previousScore = JSON.parse(localStorage.getItem("codequiz")) || []
    previousScore.push(user)
    localStorage.setItem("codequiz",JSON.stringify(previousScore))
})