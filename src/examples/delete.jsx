import React, { useState } from "react";
// import { render } from "./hostConfig";
import * as PIXI from "pixi.js";
import r2d2 from "./resources/r2d2.png";
import redbutton from "./resources/red-button.png";

// const canvas = document.getElementById("canvas");

// const app = new PIXI.Application({
//   width: 800,
//   height: 600,
//   view: canvas,
//   backgroundColor: 0x292c33,
// });

// render(<App />, app.stage);

const texture = PIXI.Texture.from(r2d2);
const button = PIXI.Texture.from(redbutton);

export function DeleteExample() {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      {visible && <sprite texture={texture} width={75} height={105} />}
      <sprite
        texture={button}
        width={75}
        height={75}
        x={725}
        y={525}
        onClick={handleClick}
      />
    </>
  );
}
