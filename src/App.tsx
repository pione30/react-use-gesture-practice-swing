import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSpring, animated } from "@react-spring/web";
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

  const [flip, setFlip] = useState(false);
  const springProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 400,
    config: {
      tension: 130,
    },
    onRest: () => setFlip(!flip),
  });

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
        <animated.div style={springProps}>I will fade in</animated.div>
      </header>
    </div>
  );
}

export default App;
