import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDrag, usePinch } from "react-use-gesture";

function App() {
  const [offset, setOffset] = useState<[number, number]>();

  const bindDrag = useDrag((state) => {
    setOffset(state.offset);
  });

  const bindPinch = usePinch(
    (state) => {
      setOffset(state.offset);
    },
    {
      eventOptions: {
        passive: false,
      },
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <div {...bindDrag()} className="draggable">
          <img
            src={logo}
            style={{ width: offset?.[0], height: offset?.[1] }}
            className="App-logo"
            alt="logo"
          />
        </div>
        <div {...bindPinch()} className="draggable">
          <img
            src={logo}
            style={{ width: offset?.[0], height: offset?.[1] }}
            className="App-logo"
            alt="logo"
          />
        </div>
        {offset && (
          <div>
            offset: {offset[0]}, {offset[1]}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
