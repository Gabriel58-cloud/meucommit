const input = document.getElementById("tarefaInput");
const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const msgVazia = document.getElementById("msgVazia");

let concluidas = 0;

function atualizarMensagem() {
    msgVazia.style.display = lista.children.length === 0 ? "block" : "none";
}

btnAdicionar.addEventListener("click", () => {
    if (input.value.trim() === "") {
        const aviso = document.createElement("div");
        aviso.textContent = "Digite uma tarefa!";
        document.body.appendChild(aviso);

        setTimeout(() => aviso.remove(), 2000);
        return;
    }

    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = input.value;

    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";

    btnConcluir.addEventListener("click", () => {
        const feita = texto.classList.toggle("concluida");
        concluidas += feita ? 1 : -1;
        contador.textContent = concluidas;
    });

    btnExcluir.addEventListener("click", () => {
        if (texto.classList.contains("concluida")) {
            concluidas--;
            contador.textContent = concluidas;
        }
        li.remove();
        atualizarMensagem();
    });

    li.appendChild(texto);
    li.appendChild(btnConcluir);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
    input.value = "";

    atualizarMensagem();
});

atualizarMensagem();

const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const resultado = document.getElementById("resultado");
const tipo = document.getElementById("tipoSorteio");

const btnSortear = document.getElementById("btnSortear");
const btnAuto = document.getElementById("btnAuto");
const btnParar = document.getElementById("btnParar");

let intervalo = null;

function sortear() {
    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    if (!minInput.value || !maxInput.value) {
        resultado.textContent = "Campos vazios!";
        return;
    }

    if (min >= max) {
        resultado.textContent = "Min deve ser menor que Max!";
        return;
    }

    const numero = Math.floor(Math.random() * (max - min + 1)) + min;

    switch (tipo.value) {
        case "numero":
            resultado.textContent = numero;
            break;

        case "parimpar":
            resultado.textContent = numero % 2 === 0 ? "Par" : "Ímpar";
            break;
    }
}

btnSortear.addEventListener("click", sortear);

btnAuto.addEventListener("click", () => {
    if (!intervalo) {
        intervalo = setInterval(sortear, 2500);
    }
});

btnParar.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = null;
});
