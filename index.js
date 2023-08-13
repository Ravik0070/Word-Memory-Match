var data = ["a", "b", "a", "b", "d", "d", "e", "e", "f", "f", "g", "g"];
const board = document.getElementById("gameBoard");
var blocks = [];
var flippedBlocks = [];
var time = document.getElementById("time");
var score = document.getElementById("score");
var popup = document.getElementById("popup");

var scoreNum;
var totalScore;

function shuffleArray() {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
}

const create = () => {
  shuffleArray();
  scoreNum = 0;
  for (let i = 0; i < data.length; i++) {
    const block = document.createElement("div");
    block.innerText = data[i];
    block.classList.add("block");
    block.addEventListener("click", flipItem);
    board.appendChild(block);
  }
  blocks = document.querySelectorAll(".block");
  totalScore = blocks.length / 2;
  score.innerText = scoreNum + "/" + totalScore;
};

const flipItem = (event) => {
  let clickedBlock = event.target;
  if (clickedBlock.classList.contains("flipped")) {
    return;
  } else {
    if (clickedBlock.classList) flippedBlocks.push(clickedBlock.innerText);
    if (flippedBlocks.length > 1) {
      compareBlocks();
    }
    clickedBlock.classList.toggle("flipped");
    if (flippedBlocks.length === 2) {
      setTimeout(() => {
        blocks.forEach((ele) => {
          ele.classList.remove("flipped");
        });
        flippedBlocks = [];
      }, 400);
    }
  }
};

const compareBlocks = () => {
  if (flippedBlocks[0] === flippedBlocks[1]) {
    scoreNum += 1;
    blocks.forEach((ele) => {
      if (ele.innerText == flippedBlocks[0]) {
        setTimeout(() => {
          ele.removeEventListener("click", flipItem);
          ele.style.backgroundColor = "red";
          ele.style.color = "red";
          ele.style.visibility = "hidden";
          score.innerText = scoreNum + "/" + totalScore;
          flippedBlocks = [];
        }, 700);
      }
    });
    setTimeout(() => {
      showPopup();
    }, 700);
  }
};

const showPopup = () => {
  if (scoreNum == totalScore) {
    //popup
    let title = document.createElement("h1");
    title.innerText = "You Won!";
    let info = document.createElement("p");
    info.innerText = `Your score is ${scoreNum}/${totalScore}`;
    let btn = document.createElement("button");
    btn.addEventListener("click", () => {
      location.reload();
    });
    btn.innerText = "Play again";
    popup.appendChild(title);
    popup.appendChild(info);
    popup.appendChild(btn);
    popup.style.display = "flex";
  }
};

create();
