const quizData = [
    {
        question: "1. Qual é a capital do Brasil?",
        answers: { a: "Rio de Janeiro", b: "Brasília", c: "São Paulo" },
        correct: "b"
    },
    {
        question: "2. Em que ano o homem pisou na Lua pela primeira vez?",
        answers: { a: "1967", b: "1969", c: "1955" },
        correct: "b"
    },
    {
        question: "3. Qual linguagem é usada para criar estilos em páginas web?",
        answers: { a: "HTML", b: "JavaScript", c: "CSS" },
        correct: "c"
    },
    {
        question: "4. Quantos continentes existem no mundo?",
        answers: { a: "5", b: "6", c: "7" },
        correct: "c"
    },
    {
        question: "5. Quem pintou a Mona Lisa?",
        answers: { a: "Pablo Picasso", b: "Leonardo da Vinci", c: "Vincent Van Gogh" },
        correct: "b"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Função para construir e exibir a pergunta atual
function buildQuiz() {
    const quizContainer = document.getElementById("quiz");
    const currentQuestion = quizData[currentQuestionIndex];

    const answers = [];
    for (const letter in currentQuestion.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
                ${letter}: ${currentQuestion.answers[letter]}
            </label>`
        );
    }

    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join("")}</div>
    `;
}

// Função para mostrar os resultados finais com a revisão das perguntas
function showResults() {
    let score = 0;
    const reviewContainer = document.createElement("div");
    reviewContainer.id = "review";

    quizData.forEach((currentQuestion, questionNumber) => {
        const userAnswer = userAnswers[questionNumber];
        const isCorrect = userAnswer === currentQuestion.correct;
        if (isCorrect) score++;

        const reviewItem = document.createElement("div");
        reviewItem.innerHTML = `
            <p>
                <strong>${currentQuestion.question}</strong><br>
                Sua resposta: <span class="${isCorrect ? "correct" : "incorrect"}">
                    ${currentQuestion.answers[userAnswer] || "Não respondida"}
                </span><br>
                Resposta correta: <span class="correct">${currentQuestion.answers[currentQuestion.correct]}</span>
            </p>
        `;
        reviewContainer.appendChild(reviewItem);
    });

    document.getElementById("quiz").innerHTML = "";
    document.getElementById("results").innerHTML = `Você acertou ${score} de ${quizData.length} perguntas!`;
    document.getElementById("quiz").appendChild(reviewContainer);

    document.getElementById("quiz-navigation").style.display = "none";
    const nextButton = document.getElementById("next");
    nextButton.textContent = "Refazer Quiz";
    nextButton.removeEventListener("click", goToNextQuestion);
    nextButton.addEventListener("click", resetQuiz);
}

// Função para ir para a próxima pergunta
function goToNextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);

    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            buildQuiz();
        } else {
            showResults();
        }
    } else {
        alert("Por favor, selecione uma resposta!");
    }
}

// Função para voltar à pergunta anterior
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        buildQuiz();
    }
}

// Função para reiniciar o quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById("results").innerHTML = "";
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("quiz-navigation").style.display = "flex";
    buildQuiz();
}

document.getElementById("next").addEventListener("click", goToNextQuestion);
document.getElementById("prev").addEventListener("click", goToPreviousQuestion);

// Inicializa o quiz ao carregar
buildQuiz();
