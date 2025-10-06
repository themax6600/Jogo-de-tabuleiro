const resut = document.getElementById('resut');
const jogs = document.getElementById('jogs');
const board = document.getElementById('board');
const card = document.getElementById('cards');
const title = document.getElementById('title');
const respost = document.getElementById('resposta');
let perguntas = [];


fetch('./assets/perguntas.json')
    .then(response => response.json())
    .then(data => {
        perguntas = data;
        sortearPergunta();
    });

const numCells1Linha = 20;

function sortearPergunta() {
    const questaoIndex = Math.floor(Math.random() * perguntas.length);
    const questao = perguntas[questaoIndex];
    title.textContent = questao.titulo;
    respost.innerHTML = '';

    questao.respostas.forEach((resposta, index) => {
        const botao = document.createElement('button');
        botao.textContent = resposta;
        botao.classList.add("alternativa");
        botao.value = index;

        botao.addEventListener('click', () => {
            verificarResposta(index, questao.correta);
        });

        respost.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, indiceCorreto) {
    if (indiceEscolhido === indiceCorreto) {

        const jogador = jogadores[jogadorAtual];
        jogador.posicao += resultadoDado;

        if (jogador.posicao >= 20) {
            jogador.posicao = 20;
            atualizarPosicoes();
            alert(`${jogador.nome} venceu! 🎉`);
            return;
        }

        atualizarPosicoes();
        jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    } else {
        jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    }

    card.classList.add('visually-hidden');
}

document.getElementById('dado').addEventListener('click', () => {
    if (jogadores.length === 0) {
        alert('não há jogador suficiente não viu');
        return;
    }
    resultadoDado = Math.floor(Math.random() * 6) + 1;
    resut.textContent = resultadoDado;
    card.classList.remove('visually-hidden');
    sortearPergunta();
});

document.querySelectorAll('li').forEach(function (linha) {
    linha.addEventListener('click', function () {
        const qtd = parseInt(linha.value);
        jogs.textContent = qtd;
        criarJogadores(qtd);
    });
});

let jogadores = [];
let jogadorAtual = 0;

function criarJogadores(qtd) {
    jogadores = [];
    const cores = ['red', 'blue', 'green', 'orange'];
    const inputContainer = document.getElementById('input-nomes');
    inputContainer.innerHTML = '';

    for (let i = 0; i < qtd; i++) {
        const label = document.createElement('label');
        label.textContent = `Nome do Jogador ${i + 1}: `;

        const input = document.createElement('input');
        if (i === 0) input.classList.add("jogador1");
        if (i === 1) input.classList.add("jogador2");
        if (i === 2) input.classList.add("jogador3");
        if (i === 3) input.classList.add("jogador4");
        input.type = 'text';
        input.id = `jogador-nome-${i}`;
        input.name = 'nome';
        input.placeholder = `Jogador ${i + 1}`;

        label.appendChild(input);
        inputContainer.appendChild(label);
    }

const inputContainer1 = document.getElementById('input-idades');

for (let i = 0; i < qtd; i++) {
        const label1 = document.createElement('label');
        label1.textContent = `Idade do jogador ${i + 1}: `;

        const input1 = document.createElement('input');
        if (i === 0) input1.classList.add("idade1");
        if (i === 1) input1.classList.add("idade2");
        if (i === 2) input1.classList.add("idade3");
        if (i === 3) input1.classList.add("idade4");
        input1.type = 'text';
        input1.id = `jogador-idade-${i}`;
        input1.name = 'idade';
        input1.placeholder = `Idade ${i + 1}`;

        label1.appendChild(input1);
        inputContainer1.appendChild(label1);
    }

    const botaoIniciar = document.getElementById("btnComecar");
    botaoIniciar.addEventListener('click', () => {
        jogadores = [];

        for (let i = 0; i < qtd; i++) {
            const nomeInput = document.getElementById(`jogador-nome-${i}`);
            const nome = nomeInput.value.trim() || `Jogador ${i + 1}`;

            jogadores.push({
                nome: nome,
                cor: cores[i],
                posicao: 0,
                peca: criarPeca(cores[i], nome)
            });
        }

        atualizarPosicoes();
    });

}


function criarPeca(cor) {
    const peca = document.createElement("div");
    peca.classList.add("peca");
    peca.style.backgroundColor = cor;
    return peca;
}

function atualizarPosicoes() {
    document.querySelectorAll(".peca").forEach(peca => peca.remove());

    jogadores.forEach(jogador => {
        const casa = document.querySelector(`[data-cell='${jogador.posicao}']`);
        if (casa) {
            casa.appendChild(jogador.peca);
        }
    });
}

function createBoard() {
    board.innerHTML = "";

    const topRow = document.createElement("div");
    topRow.classList.add("rowM");
    for (let i = 0; i <= 9; i++) {
        topRow.appendChild(createCell(i));
    }

    const middleRow = document.createElement("div");
    middleRow.classList.add("rowM", "middle-row");
    middleRow.appendChild(createCell(10));

    const bottomRow = document.createElement("div");
    bottomRow.classList.add("rowM");
    for (let i = 20; i >= 11; i--) {
        bottomRow.appendChild(createCell(i));
    }

    board.appendChild(topRow);
    board.appendChild(middleRow);
    board.appendChild(bottomRow);
}

function createCell(i) {
    const casa = document.createElement("div");
    casa.classList.add("casa");

    if (i === 0) casa.classList.add("casa1");
    if (i === 9) casa.classList.add("casa10");
    if (i === 11) casa.classList.add("casa12");
    if (i === 20) casa.classList.add("casaFinal");

    casa.setAttribute("data-cell", i);
    casa.setAttribute("id", "posisao");

    const cellNumber = document.createElement("div");
    cellNumber.classList.add("cell-number");
    cellNumber.textContent = i + 1;

    if (i === 20) {
        cellNumber.textContent = '';
    }

    casa.appendChild(cellNumber);
    return casa;
}
createCell();
createBoard();