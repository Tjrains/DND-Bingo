const board = document.getElementById("bingo-board");
const resetBtn = document.getElementById("reset-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const bingoMessage = document.getElementById("bingo-message");

const prompts = [
  "Someone rolls a nat 1",
  "Someone rolls a nat 20",
  "The party argues for 5+ minutes",
  "An NPC gets adopted",
  "A plan immediately fails",
  "Someone forgets a rule",
  "A player says 'can I do that?'",
  "Combat takes longer than expected",
  "A joke becomes canon",
  "The DM improvises a name",
  "Someone threatens arson",
  "Loot is split unevenly",
  "A player talks to an animal",
  "An encounter gets derailed",
  "The rogue does rogue things",
  "Someone tries seduction",
  "The party ignores the obvious path",
  "A door becomes a major obstacle",
  "Someone checks for traps",
  "A spell causes chaos",
  "A backstory moment happens",
  "The bard says something unhinged",
  "Someone hoards healing items",
  "A simple quest becomes complicated",
  "The group bullies the DM",
  "A cursed item appears",
  "The cleric saves everyone",
  "The barbarian solves it violently",
  "Stealth goes badly",
  "A shopping trip takes forever",
  "Someone speaks out of character and it fits",
  "The villain monologues",
  "An NPC lies badly",
  "The party misses the clue",
  "Someone says 'one more session'"
];

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateBoard() {
  board.innerHTML = "";
  bingoMessage.textContent = "";

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