const perguntas = {
    basico: [
        { pergunta: "Quem foi o primeiro rei de Israel?", opcoes: ["Saul", "Davi", "Salomão", "Ezequias"], respostaCorreta: 0 },
        { pergunta: "Quantos discípulos Jesus teve?", opcoes: ["10", "11", "12", "13"], respostaCorreta: 2 },
        { pergunta: "Qual era o nome do pai de Abraão?", opcoes: ["Terá", "Naor", "Pelegue", "Ló"], respostaCorreta: 0 },
        { pergunta: "Qual é o primeiro livro da Bíblia?", opcoes: ["Êxodo", "Levítico", "Gênesis", "Números"], respostaCorreta: 2 },
        { pergunta: "Quantos dias Deus levou para criar o mundo?", opcoes: ["5", "6", "7", "8"], respostaCorreta: 1 },
        { pergunta: "Quem construiu a arca para salvar os animais do dilúvio?", opcoes: ["Noé", "Moisés", "Abraão", "José"], respostaCorreta: 0 },
        { pergunta: "Qual era o nome do jardim onde Adão e Eva viviam?", opcoes: ["Éden", "Jardim das Oliveiras", "Jardim de Deus", "Paraíso"], respostaCorreta: 0 },
        { pergunta: "Quem foi lançado na cova dos leões?", opcoes: ["Davi", "Daniel", "Elias", "Ezequiel"], respostaCorreta: 1 },
        { pergunta: "Quem era o irmão de Moisés?", opcoes: ["Arão", "Josué", "Calebe", "Eli"], respostaCorreta: 0 },
        { pergunta: "Qual era a profissão de Pedro antes de seguir Jesus?", opcoes: ["Pescador", "Carpinteiro", "Pastor", "Agricultor"], respostaCorreta: 0 }
    ],
    intermediario: [
        { pergunta: "Qual foi o primeiro milagre de Jesus?", opcoes: ["Andar sobre as águas", "Curar um cego", "Transformar água em vinho", "Multiplicar pães e peixes"], respostaCorreta: 2 },
        { pergunta: "Qual é o menor livro da Bíblia?", opcoes: ["Judas", "Obadias", "Filemom", "2 João"], respostaCorreta: 3 },
        { pergunta: "Qual apóstolo era conhecido como 'o amado'?", opcoes: ["Pedro", "João", "Tiago", "Paulo"], respostaCorreta: 1 },
        { pergunta: "Qual é o último livro da Bíblia?", opcoes: ["Atos", "Apocalipse", "Judas", "1 João"], respostaCorreta: 1 },
        { pergunta: "Quantas pragas atingiram o Egito?", opcoes: ["7", "9", "10", "12"], respostaCorreta: 2 },
        { pergunta: "Quem escreveu a maioria das cartas no Novo Testamento?", opcoes: ["Pedro", "João", "Lucas", "Paulo"], respostaCorreta: 3 },
        { pergunta: "Qual discípulo traiu Jesus?", opcoes: ["Pedro", "Judas Iscariotes", "João", "Tiago"], respostaCorreta: 1 },
        { pergunta: "Quem era conhecido como o 'amigo de Deus'?", opcoes: ["Davi", "Abraão", "Elias", "Moisés"], respostaCorreta: 1 },
        { pergunta: "Onde Jesus foi crucificado?", opcoes: ["Getsemani", "Calvário", "Betânia", "Sinai"], respostaCorreta: 1 },
        { pergunta: "Qual é o primeiro mandamento?", opcoes: ["Amar a Deus sobre todas as coisas", "Não matarás", "Não terás outros deuses", "Honrarás teu pai e tua mãe"], respostaCorreta: 2 }
    ],
    avancado: [
        { pergunta: "Quantos capítulos existem no livro de Salmos?", opcoes: ["150", "100", "120", "200"], respostaCorreta: 0 },
        { pergunta: "Qual rei foi conhecido por sua grande sabedoria?", opcoes: ["Saul", "Davi", "Salomão", "Ezequias"], respostaCorreta: 2 },
        { pergunta: "Qual profeta foi arrebatado ao céu em um redemoinho?", opcoes: ["Elias", "Eliseu", "Isaías", "Ezequiel"], respostaCorreta: 0 },
        { pergunta: "Quem foi o último juiz de Israel?", opcoes: ["Sansão", "Samuel", "Débora", "Gideão"], respostaCorreta: 1 },
        { pergunta: "Qual livro é conhecido como 'Cântico dos Cânticos'?", opcoes: ["Provérbios", "Eclesiastes", "Cantares", "Salmos"], respostaCorreta: 2 },
        { pergunta: "Quem interpretou o sonho do faraó no Egito?", opcoes: ["José", "Moisés", "Daniel", "Abraão"], respostaCorreta: 0 },
        { pergunta: "Quem viu a sarça ardente?", opcoes: ["Noé", "Abraão", "Moisés", "Jacó"], respostaCorreta: 2 },
        { pergunta: "Quem foi conhecido como 'o chorão' entre os profetas?", opcoes: ["Isaías", "Jeremias", "Ezequiel", "Amós"], respostaCorreta: 1 },
        { pergunta: "Quem foi o pai de João Batista?", opcoes: ["Zacarias", "Simeão", "Caifás", "José"], respostaCorreta: 0 },
        { pergunta: "Qual discípulo foi martirizado primeiro?", opcoes: ["Tiago", "Pedro", "João", "Estevão"], respostaCorreta: 3 }
    ]
};

let perguntasSorteadas = [];
let nomeUsuario = "";
let emailUsuario = "";
let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
    const nomeInput = document.getElementById("nome").value;
    const emailInput = document.getElementById("email").value;
    const nivelSelecionado = document.getElementById("nivel").value; // Obter o valor do select

    if (!nomeInput || !emailInput || !nivelSelecionado) {
        alert("Por favor, preencha todos os campos antes de iniciar o quiz!");
        return;
    }

    nomeUsuario = nomeInput;
    emailUsuario = emailInput;

    sortearPerguntas(nivelSelecionado);
    document.getElementById("formulario").style.display = "none";
    document.getElementById("quiz").style.display = "block";
}

function sortearPerguntas(nivelSelecionado) {
    const todasPerguntas = perguntas[nivelSelecionado];
    perguntasSorteadas = [];

    while (perguntasSorteadas.length < 5) {
        let perguntaAleatoria = todasPerguntas[Math.floor(Math.random() * todasPerguntas.length)];
        if (!perguntasSorteadas.includes(perguntaAleatoria)) {
            perguntasSorteadas.push(perguntaAleatoria);
        }
    }
    perguntaAtual = 0;
    pontuacao = 0;
    exibirPergunta();
}

function exibirPergunta() {
    if (perguntaAtual < perguntasSorteadas.length) {
        const pergunta = perguntasSorteadas[perguntaAtual];
        const perguntaElement = document.getElementById("pergunta");
        const opcoesElement = document.getElementById("opcoes");

        perguntaElement.textContent = pergunta.pergunta;
        opcoesElement.innerHTML = "";

        pergunta.opcoes.forEach((opcao, index) => {
            const btn = document.createElement("button");
            btn.textContent = opcao;
            btn.onclick = () => verificarResposta(index);
            opcoesElement.appendChild(btn);
        });
    } else {
        finalizarQuiz();
    }
}

function verificarResposta(respostaEscolhida) {
    if (respostaEscolhida === perguntasSorteadas[perguntaAtual].respostaCorreta) {
        pontuacao += 2; // Cada resposta correta vale 2 pontos
    }
    perguntaAtual++;
    exibirPergunta();
}

function finalizarQuiz() {
    document.getElementById("pontuacao").textContent = pontuacao; // Atualizar o <span> com a pontuação.
    document.getElementById("resultado").style.display = "block";
    salvarPontuacao();
}

function salvarPontuacao() {
    fetch("/salvar_pontuacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nomeUsuario,
            email: emailUsuario,
            pontuacao: pontuacao
        })
    })
        .then(response => {
            if (!response.ok) { // Verifique se a resposta do servidor não é um erro (status 200-299)
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.json(); // Analise a resposta como JSON (opcional, mas recomendado)
        })
        .then(data => { // Lidar com a resposta JSON do servidor (opcional)
            console.log('Resposta do servidor:', data);
            window.location.href = "/ranking"; // Redirecionar para /ranking
        })
        .catch(error => {
            console.error("Erro ao salvar pontuação:", error);
            alert("Ocorreu um erro ao salvar sua pontuação. Por favor, tente novamente.");
        });
}