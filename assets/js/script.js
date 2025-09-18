const resut = document.getElementById('resut');
const jogs = document.getElementById('jogs');
const board = document.getElementById('board');
const posisao = document.getElementById('posisao');

const numCells1Linha = 20;


document.getElementById('dado').addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    resut.textContent = result;

    const jogador = jogadores[jogadorAtual];
    jogador.posicao += result;

    if (jogador.posicao >= 20) {
        jogador.posicao = 20;
        atualizarPosicoes();
        alert(`${jogador.nome} venceu! 🎉`);
        return;
    }

    atualizarPosicoes();

    jogadorAtual = (jogadorAtual + 1) % jogadores.length;
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

    for (let i = 0; i < qtd; i++) {
        jogadores.push({
            nome: `Jogador ${i + 1}`,
            cor: cores[i],
            posicao: 0,
            peca: criarPeca(cores[i])
        });
    }

    atualizarPosicoes();
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

    if(i=== 20){
        cellNumber.textContent = '';
    }

    casa.appendChild(cellNumber);
    return casa;
}
createCell();
createBoard();