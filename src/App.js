import React, { useState, useEffect } from "react";
import { Key } from "./components/key";

function App() {
  const [letters, setLetters] = useState([
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ]);
  const [word, setWord] = useState("");
  const [line, setLines] = useState("");

  const [pickedLetters, setPickedLetters] = useState([]);
  const [guesses, setGuesses] = useState(10);

  useEffect(() => {
    setLines("_".repeat(word.length));
  }, [word]);

  useEffect(() => {
    if (line == word && line.length > 0) {
      alert("You Win");
      resetGame();
    }
  }, [pickedLetters]);

  useEffect(() => {
    if (guesses == 0) {
      document.getElementById("show").style.display = "block";
      alert("You Lose \n The Answer was " + word);
      resetGame();
    }
  }, [guesses]);

  function startGame() {
    generateWord();
    console.log(word);
  }

  function resetGame() {
    for (let i = 0; i < pickedLetters.length; i++) {
      document
        .getElementById("button" + pickedLetters[i])
        .classList.remove("buttonRight");
      document
        .getElementById("button" + pickedLetters[i])
        .classList.remove("buttonWrong");
    }
    generateWord();
    setPickedLetters([]);
    setGuesses(10);
    document.getElementById("show").style.display = "none";
  }

  function generateWord() {
    fetch("https://random-word-api.herokuapp.com/word/?swear=0")
      .then((res) => res.json())
      .then((data) => {
        let stringData = data.toString().toUpperCase();
        setWord(stringData);
        console.log(data);
      })
      .catch((error) => alert("Couldn't find data"));
  }

  function replace(word, index, replacement) {
    return (
      word.substr(0, index) +
      replacement +
      word.substr(index + replacement.length)
    );
  }

  function keyPressed(key) {
    if (pickedLetters.includes(key)) {
    } else {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          setLines((prev) => replace(prev, i, key));
          setPickedLetters(pickedLetters.concat(key));
          document.getElementById("button" + key).classList.add("buttonRight");
        } else {
          setPickedLetters(pickedLetters.concat(key));
          document.getElementById("button" + key).classList.add("buttonWrong");
          minusScore(key);
        }
      }
    }
  }

  function minusScore(key) {
    for (let i = 0; i < word.length; i++) {
      if (!word.includes(key)) {
        setGuesses(guesses - 1);
      }
    }
  }

  return (
    <>
      <div className="content-container">
        <div className="content-wrapper">
          <div className="wordContainer">
            <div className="wordWrapper">
              <div className="wordToGuess">
                <div className="guessAnswer">
                  <h1>{line}</h1>
                  <button onClick={() => startGame()}>Generate Word</button>
                </div>
                <div className="correctAnswer" id="show">
                  <h1>{word}</h1>
                </div>
              </div>
              <div className="gameInfo">
                <div className="pickedLetters">
                  <h2>Picked Letters</h2>
                  <h3>{pickedLetters}</h3>
                </div>
                <div className="guessesLeft">
                  <h2>Guesses</h2>
                  <h3>{guesses}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="keyboard">
            <div className="upper">
              {letters.map((individualKey, index) => {
                if (index <= 9)
                  return (
                    <Key
                      name="topRow"
                      letter={individualKey}
                      wordToGuess={word}
                      clickable={() => keyPressed(individualKey)}
                    ></Key>
                  );
              })}
            </div>
            <div className="middle">
              {letters.map((individualKey, index) => {
                if (index > 9 && index < 19)
                  return (
                    <Key
                      name="topRow"
                      letter={individualKey}
                      wordToGuess={word}
                      clickable={() => keyPressed(individualKey)}
                    ></Key>
                  );
              })}
            </div>
            <div className="lower">
              {letters.map((individualKey, index) => {
                if (index > 18 && index < 27)
                  return (
                    <Key
                      name="topRow"
                      letter={individualKey}
                      wordToGuess={word}
                      clickable={() => keyPressed(individualKey)}
                    ></Key>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
