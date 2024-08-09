let turno = 'gato';
const tablas = document.getElementsByClassName('tablas');
const mensajeDiv = document.getElementById('mensaje');
const mensajeW = document.getElementById('mensaje2');
let gameEnd = false;

let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Condiciones de victoria
const winC = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

// Coge los contadores desde localStorage
let contadorGato = parseInt(localStorage.getItem('contadorGato')) || 0;
let contadorRaton = parseInt(localStorage.getItem('contadorRaton')) || 0;

function actualizarContadores() {
    document.getElementById('contador-gato').textContent = contadorGato;
    document.getElementById('contador-raton').textContent = contadorRaton;
}

actualizarContadores();

function actualizar(fila, columna, valor) {
    tablero[fila][columna] = valor;
}

function manejarClick(event) {
    if (gameEnd || turno === 'ratón') return; 

    const tabla = event.target;
    const fila = parseInt(tabla.dataset.fila);
    const columna = parseInt(tabla.dataset.columna);

    if (tablero[fila][columna] === '') {
        tabla.textContent = 'x';
        actualizar(fila, columna, 'x');
        turno = 'ratón';

        if (checkWin()) {
            gameEnd = true;
            contadorGato++;
            mensajeDiv.textContent = '¡Ganó el gato!';
            localStorage.setItem('contadorGato', contadorGato);
            actualizarContadores();
        } else if (empate()) {
            mensajeDiv.textContent = '¡Empate!';
            gameEnd = true;
        } else {
            mostrarM();
            setTimeout(jugarAutomatico, 500); 
        }
    }
}
// hace que la "O" se ponga en los espacio vacios
function jugarAutomatico() {
    if (gameEnd) return;

    const vacios = [];
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] === '') vacios.push({ fila: i, columna: j });
        }
    }

    if (vacios.length === 0) return;

    const { fila, columna } = vacios[Math.floor(Math.random() * vacios.length)];
    
    const index = fila * 3 + columna;
    const tabla = tablas[index];
    
    tabla.textContent = 'o';
    actualizar(fila, columna, 'o');
    turno = 'gato';

    if (checkWin()) {
        gameEnd = true;
        contadorRaton++;
        mensajeDiv.textContent = '¡Ganó el ratón!';
        localStorage.setItem('contadorRaton', contadorRaton);
        actualizarContadores();
    } else if (empate()) {
        mensajeDiv.textContent = '¡Empate!';
        gameEnd = true;
    } else {
        mostrarM();
    }
}
// Elimina el localStorage
document.getElementById('pne').addEventListener('click', () => {
    
    localStorage.removeItem('contadorGato');
    localStorage.removeItem('contadorRaton');
    
    
    contadorGato = 0;
    contadorRaton = 0;
    actualizarContadores();

});

document.getElementById('pne2').addEventListener('click', () => {

    for (let i = 0; i < tablas.length; i++) {
        tablas[i].textContent = '';
    }
    tablero = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    turno = 'gato';
    gameEnd = false;
    mostrarM();

});


function checkWin() {
    const flatBoard = tablero.flat();
    return winC.some(condition => {
        return condition.every(index => flatBoard[index] === (turno === 'gato' ? 'o' : 'x'));
    });
}

function empate() {
    return tablero.flat().every(cell => cell !== '');
}

document.getElementById('pne').addEventListener('click', () => {
    for (let i = 0; i < tablas.length; i++) {
        tablas[i].textContent = '';
    }
    tablero = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    turno = 'gato';
    gameEnd = false;
    mostrarM();
});

function mostrarM() {
    if (turno === 'gato') {
        mensajeDiv.textContent = 'Espera tu turno, es el turno del gato.';
    } else if (turno === 'ratón') {
        mensajeDiv.textContent = 'Espera tu turno, es el turno del ratón.';
    }
}

// Añade event listeners a cada celda
for (let i = 0; i < tablas.length; i++) {
    tablas[i].addEventListener('click', manejarClick);
}

mostrarM();

