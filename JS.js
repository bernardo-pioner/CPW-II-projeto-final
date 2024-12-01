const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

const telaInicial = document.getElementById('tela-inicial');
const telaPerguntas = document.getElementById('tela-perguntas');
const telaResultado = document.getElementById('tela-resultado');

const inputNomeUsuario = document.getElementById('nome-usuario');
const botaoIniciar = document.getElementById('btn-iniciar');
const textoPergunta = document.getElementById('texto-pergunta');
const listaOpcoes = document.getElementById('lista-opcoes');
const botaoProxima = document.getElementById('btn-proxima');
const resultadoNomeUsuario = document.getElementById('resultado-nome-usuario');
const qtdAcertos = document.getElementById('qtd-acertos');
const botaoReiniciar = document.getElementById('btn-reiniciar');

let perguntas = [];
let indicePerguntaAtual = 0;
let acertos = 0;

botaoIniciar.addEventListener('click', async () => {
    const nomeUsuario = inputNomeUsuario.value.trim();
    if (nomeUsuario === '') {
        alert('Por favor, insira seu nome!');
        return;
    }

    telaInicial.style.display = 'none';
    telaPerguntas.style.display = 'block';
    resultadoNomeUsuario.textContent = nomeUsuario;

    perguntas = await carregarPerguntas();
    exibirPergunta();
});

async function carregarPerguntas() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        return dados.results.map(pergunta => ({
            enunciado: pergunta.question,
            respostaCorreta: pergunta.correct_answer,
            opcoes: shuffle([...pergunta.incorrect_answers, pergunta.correct_answer])
        }));
    } catch (error) {
        alert('Erro ao carregar perguntas. Verifique sua conexão com a internet.');
        console.error(error);
        return [];
    }
}

function exibirPergunta() {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    textoPergunta.innerHTML = perguntaAtual.enunciado;
    listaOpcoes.innerHTML = '';

    perguntaAtual.opcoes.forEach(opcao => {
        const li = document.createElement('li');
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener('click', () => selecionarResposta(opcao));
        li.appendChild(botao);
        listaOpcoes.appendChild(li);
    });
}

function selecionarResposta(opcaoSelecionada) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    if (opcaoSelecionada === perguntaAtual.respostaCorreta) {
        acertos++;
    }

    botaoProxima.style.display = 'block';
}

botaoProxima.addEventListener('click', () => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        botaoProxima.style.display = 'none';
        exibirPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {
    telaPerguntas.style.display = 'none';
    telaResultado.style.display = 'block';
    qtdAcertos.textContent = acertos;
}

botaoReiniciar.addEventListener('click', () => {
    location.reload();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
