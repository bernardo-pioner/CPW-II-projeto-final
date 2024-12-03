const quizData = [
    {
        question: "1. Qual é a capital do Brasil?",
        answers: {
            a: "Rio de Janeiro",
            b: "Brasília",
            c: "São Paulo"
        },
        correct: "b"
    },
    {
        question: "2. Em que ano o homem pisou na Lua pela primeira vez?",
        answers: {
            a: "1967",
            b: "1969",
            c: "1955"
        },
        correct: "b"
    },
    {
        question: "3. Qual linguagem é usada para criar estilos em páginas web?",
        answers: {
            a: "HTML",
            b: "JavaScript",
            c: "CSS"
        },
        correct: "c"
    },
    {
        question: "4. Quantos continentes existem no mundo?",
        answers: {
            a: "5",
            b: "6",
            c: "7"
        },
        correct: "c"
    },
    {
        question: "5. Quem pintou a Mona Lisa?",
        answers: {
            a: "Pablo Picasso",
            b: "Leonardo da Vinci",
            c: "Vincent Van Gogh"
        },
        correct: "b"
    },
    {
        question: "6. Qual é o maior planeta do sistema solar?",
        answers: {
            a: "Terra",
            b: "Júpiter",
            c: "Saturno"
        },
        correct: "b"
    },
    {
        question: "7. Em qual país o \"sushi\" é um prato tradicional?",
        answers: {
            a: "Japão",
            b: "China",
            c: "Coreia do Sul"
        },
        correct: "a"
    },
    {
        question: "8. Quem é considerado o \"pai da informática\"?",
        answers: {
            a: "Alan Turing",
            b: "Bill Gates",
            c: "Steve Jobs"
        },
        correct: "a"
    },
];

let currentQuestionIndex = 0; // Índice da pergunta atual
let userAnswers = []; // Array para armazenar as respostas do usuário

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

// Função para mostrar os resultados finais
function showResults() {
    let score = 0;
    
    quizData.forEach((currentQuestion, questionNumber) => {
        const userAnswer = userAnswers[questionNumber];
        if (userAnswer === currentQuestion.correct) {
            score++;
        }
    });

    document.getElementById("results").innerHTML = `Você acertou ${score} de ${quizData.length} perguntas!`;
    document.getElementById("quiz-navigation").style.display = 'none'; // Esconde a navegação
    const nextButton = document.getElementById("next");
    nextButton.textContent = "Refazer Quiz"; // Alterar o texto do botão
    nextButton.removeEventListener("click", goToNextQuestion);
    nextButton.addEventListener("click", resetQuiz); // Refazer quiz
}

// Função para ir para a próxima pergunta
function goToNextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);

    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value; // Armazena a resposta do usuário
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            buildQuiz();
        } else {
            showResults(); // Exibe os resultados se todas as perguntas foram respondidas
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
    document.getElementById("quiz-navigation").style.display = 'flex'; // Mostra a navegação
    buildQuiz();
}

document.getElementById("next").addEventListener("click", goToNextQuestion);
document.getElementById("prev").addEventListener("click", goToPreviousQuestion);

// Inicializa o quiz ao carregar
buildQuiz();
