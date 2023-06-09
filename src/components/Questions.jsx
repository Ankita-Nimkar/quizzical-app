import React, { Component } from "react";

function Questions(props) {
  let bg;

  return props.qs.map((d) => (
    <li key={d.q} className="questions">
      <h4 className="que">{d.q}</h4>
      <ul className="ansOpts">
        {d.a.map(
          (el) => (
            (bg = el.isSelected ? "selected" : ""),
            (
              <li
                key={el.ans}
                id={el.id}
                onClick={() => props.changeBg(el.id)}
                className={`ans ${bg}`}
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
export default Questions;
