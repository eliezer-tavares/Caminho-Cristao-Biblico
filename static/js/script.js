const perguntas = [
    {
        pergunta: "Quem foi o primeiro rei de Israel?",
        opcoes: ["Saul", "Davi", "Salomão", "Ezequias"],
        respostaCorreta: 0
    },
    {
        pergunta: "Quem escreveu o livro de Apocalipse?",
        opcoes: ["Pedro", "Paulo", "João", "Lucas"],
        respostaCorreta: 2
    },
    {
        pergunta: "Quantos discípulos Jesus teve?",
        opcoes: ["10", "11", "12", "13"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual é o maior mandamento na Lei?",
        opcoes: ["Amarás ao Senhor teu Deus", "Não matarás", "Honra teu pai e tua mãe", "Não cobiçarás"],
        respostaCorreta: 0
    },
    {
        pergunta: "Em que cidade Jesus nasceu?",
        opcoes: ["Nazaré", "Jerusalém", "Belém", "Cafarnaum"],
        respostaCorreta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let nomeUsuario = "";
let emailUsuario = "";

function exibirPergunta() {
    const perguntaContainer = document.getElementById("pergunta");
    const opcoesContainer = document.getElementById("opcoes");

    perguntaContainer.textContent = perguntas[perguntaAtual].pergunta;
    opcoesContainer.innerHTML = ""; // Limpa as opções anteriores

    perguntas[perguntaAtual].opcoes.forEach((opcao, index) => {
        const botaoOpcao = document.createElement("button");
        botaoOpcao.textContent = opcao;
        botaoOpcao.onclick = () => verificarResposta(index);
        opcoesContainer.appendChild(botaoOpcao);
    });
}

function verificarResposta(opcaoSelecionada) {
    if (opcaoSelecionada === perguntas[perguntaAtual].respostaCorreta) {
        pontuacao++;
    }
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        exibirPergunta();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `${pontuacao} de ${perguntas.length} questões acertadas!`;
}

function iniciarQuiz() {
    nomeUsuario = document.getElementById("nome").value;
    emailUsuario = document.getElementById("email").value;

    if (!nomeUsuario || !emailUsuario) {
        alert("Por favor, preencha seu nome e e-mail.");
        return;
    }

    document.getElementById("user-info").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    perguntaAtual = 0; // Reinicia a pergunta atual se o quiz for reiniciado
    pontuacao = 0; // Reinicia a pontuação se o quiz for reiniciado
    exibirPergunta();
}

function salvarPontuacao() {
    const form = new FormData();
    form.append('nome', nomeUsuario);
    form.append('email', emailUsuario);
    form.append('pontuacao', pontuacao);

    fetch('/salvar_resultado', { method: 'POST', body: form })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro de rede');
            }
            return response.text(); // ou response.json() se o servidor retornar JSON
        })
        .then(data => {
            console.log('Sucesso:', data);
            alert('Pontuação salva com sucesso!');
            window.location.href = "/ranking"; // Redireciona para a página de ranking
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar a pontuação.' + error);
        });
}


function resetQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    exibirPergunta();
}