console.log("Welcome to Tic Tac Toe");
// Variables for music
let music = new Audio("asset/bg-music.mp3");
let audioTurn = new Audio("asset/ting.mp3");
let gameover = new Audio("asset/game-over.mp3");
let gameWin = new Audio("asset/win.mp3");

// Bg music
music.play();

// Initially we set X for user's turn
let turn = "X";

let isgameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      gameWin.play();
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "250px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

let isDraw = () => {
  let boxText = document.querySelectorAll(".boxtext");
  let filledBoxes = Array.from(boxText).every((box) => box.innerText !== "");
  if (filledBoxes && !isgameover) {
    document.querySelector(".info").innerText = "It's a Draw!";
    isgameover = true;

    // ✅ Disable further clicks
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((box) => {
      box.style.pointerEvents = "none";
    });

    // ✅ Play game over sound
    gameover.play();
  }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      isDraw();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((box) => {
    box.style.pointerEvents = "auto";
  });
});
