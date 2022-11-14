
const quizData = [
    {
        question:"What does HTML stand for?",
        a:"Hyperterminal Max Loader",
        b:"Hypertext Madeup Language",
        c:"Hypertext Markup Language",
        d:"Hybrid Terminal Modification Link",
        correct:"c",
    },
    {
        question:"What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
        a:"<head></head>",
        b:"<body></body>",
        c:"<title></title>",
        d:"<br></br>",
        correct:"a",
    },
    {
        question:"What property is used to specify whether or not an element should appear as if it’s on top of or above other content on the page?",
        a:"Foreground",
        b:"Float",
        c:"Jumper",
        d:"Top Level",
        correct:"b",
    },
    {
        question:"What are the CSS properties that are used to add space around sections of content?",
        a:"Break",
        b:"Spacing",
        c:"Clear",
        d:"Padding",
        correct:"d",
    },
    {
        question:"What is the object called that lets you work with both dates and time-related data?",
        a:"Dates",
        b:"Clock",
        c:"Watch",
        d:"Time",
        correct:"a",
    },
    {
        question:"How do functions break up?",
        a:"They leave the webpage.",
        b:"They regret their choices.",
        c:"They work things out.",
        d:"They stop calling each other!",
        correct:"d",
    },
    {
        question:"What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
        a:"Function",
        b:"Loop",
        c:"Clone",
        d:"Boolean",
        correct:"b",
    },
    {
        question:"What is the element used (and hidden) in code that explains things and makes the content more readable?",
        a:"Quotations",
        b:"Hidden Elements",
        c:"Comments",
        d:"Notes",
        correct:"c",
    },


];

const quiz=document.getElementById('quiz')
const answerEls=document.querySelectorAll('.answer')
const questionEl=document.getElementById('question')
const a_text=document.getElementById('a_text')
const b_text=document.getElementById('b_text')
const c_text=document.getElementById('c_text')
const d_text=document.getElementById('d_text')
const submitBtn=document.getElementById('submit')


let currentQuiz = 0
let score = 0

function loadQuiz(){

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEls => answerEls.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEls => {
        if(answerEls.checked) {
            answer = answerEls.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
           score++  
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>

            <button onclick="location.reload()">Reload</button>`
            
        }
    }
})