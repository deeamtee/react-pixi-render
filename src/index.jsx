import { useState } from "react";
import ReactDOM from "react-dom/client";
import img from "./resources/boy.png";
import Stage from "./components/Stage";
import Sprite from "./components/Sprite";
import { useTick } from "./utils/hooks";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Stage options={{ backgroundColor: 0x292c33 }}>
    <App />
  </Stage>
);

function App() {
  const [x, setX] = useState(0);
  const [rotation, setRotation] = useState(0);
  useTick((delta) => {
    setRotation((rotation) => rotation - 0.03 * delta);
  });
  const handleMouseMove = (event) => {
    const x = Math.floor(event.data.global.x);
    setX(x);
  };

  return (
    <Sprite
      img={img}
      width={180}
      height={150}
      x={x}
      y={250}
      rotation={rotation}
      onMouseMove={handleMouseMove}
    />
  );
}
