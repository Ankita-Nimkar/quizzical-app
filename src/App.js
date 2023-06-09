import React, { Component } from "react";
import Questions from "./components/Questions";
import AnsSheet from "./components/AnsSheet";
import "./style.css";
import { nanoid } from "nanoid";

function App() {
  const [qs, setQs] = React.useState([]);
  const [allQs, setAllQs] = React.useState([]);
  const [ansArr3, setAnsArr3] = React.useState([]);
  const [checkAns, setCheckAns] = React.useState(false);
  const [correctAns, setCorrectAns] = React.useState("");
  const [incorrectAns, setIncorrectAns] = React.useState("");
  const [score, setScore] = React.useState(0);

  // console.log(qs);
  // console.log("allQs:", allQs);
  let bg;
  let allSelected = false;
  let scoreArr = [];
  let randomQObj;

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setAllQs(data.results))
      .catch((err) => console.log(err));
  }, []);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function handleClick() {
    randomQObj = new Array(allQs.length).fill(0).map((el) => {
      return (el = {
        q: "",
        a: [],
        isCompleted: false,
      });
    });
    let correctAnsArr = [];
    let incorrectAnsArr = [];
    for (let i = 0; i < randomQObj.length; i++) {
      randomQObj[i].q = allQs[i].question;
      let ansArr = shuffle(
        allQs[i].incorrect_answers.concat(allQs[i].correct_answer)
      );
      correctAnsArr.push(allQs[i].correct_answer);
      allQs[i].incorrect_answers.forEach((element) => {
        incorrectAnsArr.push(element);
      });

      for (let j = 0; j < ansArr.length; j++) {
        randomQObj[i].a.push({
          id: nanoid(),
          ans: ansArr[j],
          isSelected: false,
          correct: "",
          incorrect: "",
          opac: "",
        });
      }
    }
    setCorrectAns([...correctAnsArr]);
    setIncorrectAns([...incorrectAnsArr]);
    setQs([...randomQObj]);
  }

  function changeBg(id) {
    if (!checkAns) {
      for (let i = 0; i < qs.length; i++) {
        if (!qs[i].isCompleted) {
          for (let j = 0; j < qs[i].a.length; j++) {
            if (id === qs[i].a[j].id) {
              qs[i].a[j].isSelected = true;
              qs[i].isCompleted = true;
              setAnsArr3((prevstate) => [...prevstate, qs[i].a[j].ans]);
            } else {
              qs[i].a[j].isSelected = false;
            }
          }
        }
      }
    } else {
    }

    setQs([...qs]);
  }

  function ansCheck() {
    let check = qs.every((element) => element.isCompleted === true);

    for (let i = 0; i < qs.length; i++) {
      for (let j = 0; j < qs[i].a.length; j++) {
        if (qs[i].a[j].isSelected) {
          if (correctAns.includes(qs[i].a[j].ans)) {
            qs[i].a[j].correct = true;
            qs[i].a[j].opac = false;
            scoreArr.push(qs[i].a[j].ans);
          } else if (incorrectAns.includes(qs[i].a[j].ans)) {
            qs[i].a[j].incorrect = true;
          }
        } else {
          qs[i].a[j].correct = "";
          qs[i].a[j].incorrect = "";
          qs[i].a[j].opac = true;
        }
      }
    }
    setScore(scoreArr.length);
    setQs([...qs]);
    setCheckAns(check);
  }

  function playAgain() {
    handleClick();
    setCheckAns(false);
  }
  return (
    <main>
      {qs.length > 0 ? (
        <div>
          {checkAns ? (
            <div className="quePage">
              <ul>
                <AnsSheet qs={qs} />
              </ul>
              <div className="scoreBoard">
                <p>You scored {score}/5</p>
                <button onClick={playAgain}>start again</button>
              </div>
            </div>
          ) : (
            <div className="quePage">
              <ul>
                <Questions qs={qs} changeBg={changeBg} />
              </ul>
              <button onClick={ansCheck} className="checkAns">
                check ans
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="intro-page">
          <h1 className="quizzical">Quizzical</h1>
          <h3 className="instructions">
            You can not change your ans once you clicked the option
          </h3>

          <button onClick={handleClick}>Start quiz</button>
        </div>
      )}
    </main>
  );
}
export default App;
