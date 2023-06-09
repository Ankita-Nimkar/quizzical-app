import React, { Component } from "react";

function AnsSheet(props) {
  console.log(props);
  let bgCorrect;
  let bg;
  let bgOther;
  return props.qs.map((d) => (
    <li key={d.q} className="questions">
      <h4 className="que">{d.q}</h4>
      <ul className="ansOpts">
        {d.a.map(
          (el) => (
            (bgCorrect = el.correct ? "correct" : ""),
            (bg = el.incorrect ? "wrong" : ""),
            (bgOther = el.opac ? "opacBg" : ""),
            (
              <li
                key={el.ans}
                id={el.id}
                className={`ans ${bgCorrect} ${bg} ${bgOther}`}
              >
                {el.ans}
              </li>
            )
          )
        )}
      </ul>
      <hr />
    </li>
  ));
}
export default AnsSheet;
