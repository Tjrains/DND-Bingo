const board = document.getElementById("bingo-board");
const resetBtn = document.getElementById("reset-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const bingoMessage = document.getElementById("bingo-message");

async function loadPrompts() {
  const response = await fetch("prompts.txt");
  const text = await response.text();

  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function generateBoard() {
  board.innerHTML = "";
  bingoMessage.textContent = "";

  const prompts = await loadPrompts();

  if (prompts.length < 24) {
    alert("Need at least 24 prompts in prompts.txt!");
    return;
  }

  const shuffled = shuffleArray(prompts).slice(0, 24);
  let promptIndex = 0;

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (i === 12) {
      cell.textContent = "FREE SPACE";
      cell.classList.add("free", "marked");
    } else {
      cell.textContent = shuffled[promptIndex];
      promptIndex++;

      cell.addEventListener("click", () => {
        cell.classList.toggle("marked");
        checkBingo();
      });
    }

    board.appendChild(cell);
  }

  checkBingo();
}

function resetMarks() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    if (index === 12) {
      cell.classList.add("marked", "free");
    } else {
      cell.classList.remove("marked");
    }
  });
  bingoMessage.textContent = "";
}

function checkBingo() {
  const cells = [...document.querySelectorAll(".cell")];
  const marked = cells.map(cell => cell.classList.contains("marked"));

  const winningLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  const hasBingo = winningLines.some(line => line.every(index => marked[index]));

  bingoMessage.textContent = hasBingo ? "BINGO!" : "";
}

resetBtn.addEventListener("click", resetMarks);
shuffleBtn.addEventListener("click", generateBoard);

generateBoard();
