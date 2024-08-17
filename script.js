const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        messageElement.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCombination();
        return;
    }

    if (board.every(cell => cell !== '')) {
        messageElement.innerText = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
};

const highlightWinningCombination = () => {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });

    if (winningCombination) {
        console.log('Winning combination:', winningCombination);
        winningCombination.forEach(index => {
            cells[index].classList.add('winner');
        });
    } else {
        console.log('No winning combination found.');
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    messageElement.innerText = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
