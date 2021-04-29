import React from "react";

export const Key = ({ letter, name, clickable }) => {
  return (
    <button onClick={clickable} id={"button" + letter}>
      {letter}
    </button>
  );
};
