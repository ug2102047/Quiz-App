const questions = [ 
    {
        question: "What is the capital of Bangladesh?",
        options: [
            { text: "Dhaka", isCorrect: true },
            { text: "Chittagong", isCorrect: false },
            { text: "Khulna", isCorrect: false },
            { text: "Sylhet", isCorrect: false }
        ]
    },
    { 
        question: "What is the largest planet in our solar system?",
        options: [
            { text: "Earth", isCorrect: false },    
            { text: "Jupiter", isCorrect: true },
            { text: "Saturn", isCorrect: false },
            { text: "Mars", isCorrect: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        options: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "NaCl", isCorrect: false }
        ]
    },
    {
        question: "Who is the author of 'To Kill a Mockingbird'?",
        options: [
            { text: "Harper Lee", isCorrect: true },
            { text: "J.K. Rowling", isCorrect: false },
            { text: "Ernest Hemingway", isCorrect: false },
            { text: "F. Scott Fitzgerald", isCorrect: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const optionsElement = document.querySelector(".options");
const nextButton = document.getElementById("next");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        optionsElement.appendChild(button);
        button.dataset.correct = option.isCorrect;
        button.addEventListener("click", selectOption);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}
function selectOption(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        const correctBtn = Array.from(optionsElement.children).find(btn => btn.dataset.correct === "true");
        if (correctBtn) correctBtn.classList.add("correct");
    }
    // disable all option buttons after selection
    Array.from(optionsElement.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} / ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.onclick = () => startQuiz();
}


startQuiz();

