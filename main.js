let height = 6; // num of guesses
let width = 4; // word length

let row = 0; // attempt #
let col = 0; // current letters for attempt

let gameOver = false
let wordIndex = ['word','apps','pear','four','five','tens','ants','mops','call','moms','dads','mine',  'mint','twos','bone','golf','ball','nuts','list','farm ','game','cats ','hats','bats ','dogs','mats','fish','much','many','very','back ','left','mesh','cash','soft','loud','book','look','nine','puff','fort','corn','kale','milk','toto','used','shoe','love', 'your','edit','ages','days','they','soap','dove','fogs','halk','sand', 'name', 'huge', 'hugs', 'mist', 'muck', 'suns', 'tape', 'moon', 'duck', 'tabs', 'news', 'town', 'nots', 'snow', 'cool', 'mule', 'fuel', 'tank', 'pain', 'clip', 'pens', 'star', 'wars', 'done', 'fine', 'time', 'scar', 'drive', 'help', 'scam', 'hack', 'fuse'];
let rng = Math.round(Math.random() * wordIndex.length);
let word = wordIndex[rng].toUpperCase();

window.onload = function() {
  initialize();
}

function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Create on screen keyboard
  let keyboard = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
  ];

  for (let i = 0; i < keyboard.length; i++) {
    let curRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < curRow.length; j++) {
      let key = curRow[j];
      let keyTile = document.createElement("div");
      keyTile.innerText = key;

      if (key == "Enter") {
        keyTile.id = "Enter";
      }
      else if (key == "⌫") {
        keyTile.id = "Backspace";
      }
      else if ("A" <= key && key <= "Z") {
        keyTile.id = "Key" + key;
      }

      keyTile.addEventListener("click", processKey);

      if (key == "Enter") {
        keyTile.classList.add("enter-key-tile");
      } else {
        keyTile.classList.add("key-tile");
      }
      keyboardRow.appendChild(keyTile);
    }
    document.body.appendChild(keyboardRow);
  }

function processKey() {
  let e = {"code" : this.id};
  processInput(e);
}

  // Keyboard input
  function processInput(event) {
      if (gameOver) return null;

      // alert(event.code);
      if ("KeyA" <= event.code && event.code <= "KeyZ") {
        if (col < width) {
              let curTile = document.getElementById(row.toString() + '-' + col.toString())
              if (curTile.innerText == "") {
                curTile.innerText = event.code[3];
                col++;
              }
        }
      } else if (event.code == "Backspace") {
        if (0 < col && col <= width) {
          col--;
          let curTile = document.getElementById(row.toString() + '-' + col.toString())
          curTile.innerText = "";
        }
      } else if (event.code == "Enter") {
        update();
        row++;
        col = 0;
      }

      if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById('answer').innerText = "The word was:" + " " + word;
      }
  }

  document.addEventListener("keyup", (event) => {
    processInput(event);
  });
}

function update() {
  let correct = 0;
  let letterCount = {};

  for (let i = 0; i < word.length; i++) {
    letter = word[i];
    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
        letterCount[letter] = 1;
    }
  }

  for (let c = 0; c < width; c++) {
    let curTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = curTile.innerText;

    if (word[c] == letter) {
      curTile.classList.add("correct");

      let keyTile = document.getElementById("Key" + letter);
      keyTile.classList.remove("absent");
      keyTile.classList.remove("present");
      keyTile.classList.add("correct");
      
      correct++;
      letterCount[letter] -= 1;
      }
    }
  
    if (correct == width) {
      gameOver = true;
      alert("Congrats! You got the wordL!");
    }

for (let c = 0; c < width; c++) {
  let curTile = document.getElementById(row.toString() + '-' + c.toString());
  let letter = curTile.innerText;
  if (!curTile.classList.contains("correct")) {

  if (word.includes(letter) && letterCount[letter] > 0) {
    let keyTile = document.getElementById("Key" + letter);
    curTile.classList.add("present");
    if (!keyTile.classList.contains("correct")) {
    keyTile.classList.add("present");
    }
    letterCount[letter] -= 1;
  }

  else if !keyTile.classList.contains("correct") {
    let keyTile = document.getElementById("Key" + letter);
    keyTile.classList.add("absent");
    curTile.classList.add("absent");
  }

 }
}
}
