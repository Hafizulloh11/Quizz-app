let boxes = document.querySelectorAll(".box");
let answers = Array.from(document.querySelectorAll(".answer"));
let specifier = document.querySelector(".specifier");
let nextRoundBtn = document.querySelector(".next-round");

function randomActions() {
  allRandoms = new Array(3).fill(undefined);
  allRandoms[0] = Math.trunc(Math.random() * 50 + 1);
  allRandoms[1] = Math.trunc(Math.random() * 50 + 1);
  allRandoms[2] = ["+", "-", "*"].sort(() => Math.random() - 0.5)[0];
  return allRandoms;
}
let randomAnswer = randomActions();

function placementOfActions() {
  boxes[0].textContent = randomAnswer[0];
  boxes[1].textContent = randomAnswer[2];
  boxes[2].textContent = randomAnswer[1];

  let total = eval(
    `${boxes[0].textContent}${boxes[1].textContent}${boxes[2].textContent}`
  );
  return total;
}
let total = placementOfActions();

function checkWinner() {
  let wrongAnswer = [total + 1, total + 2, total - 2, total].sort(
    () => Math.random() - 0.5
  );
  answers.forEach((item, i) => {
    item.textContent = wrongAnswer[i];
    item.addEventListener("click", () => {
      if (item.textContent == total) {
        item.classList.add("winner");
        specifier.textContent = "correct answer";
        gameEnd(item);
      } else {
        item.classList.add("not-win");
        gameEnd(item);
      }
    });
  });
}
checkWinner();

function gameEnd(box) {
  if (box.classList.contains("winner") || box.classList.contains("not-win")) {
    for (let item of answers) {
      item.style.pointerEvents = "none";
    }
  }
  if (box.classList.contains("not-win")) {
    specifier.textContent = "wrong answer";
    for(let item of answers) {
        if(item.textContent == total){
            item.classList.add("winner");
        }
    }
  }
}

function newGame() {
  specifier.textContent = "";
  randomAnswer = randomActions();
  placementOfActions();
  total = placementOfActions();
  checkWinner();
  answers.forEach((item) => {
    item.classList.remove("winner", "not-win");
    item.style.pointerEvents = "all";
  });
}

nextRoundBtn.addEventListener("click", newGame);