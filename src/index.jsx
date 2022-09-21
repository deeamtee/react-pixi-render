import React from "react";
import { render } from "./hostConfig";
import * as PIXI from "pixi.js";
import sprite from "./resources/logo.svg";

const canvas = document.getElementById("canvas");

const app = new PIXI.Application({
  width: 800,
  height: 600,
  view: canvas,
  backgroundColor: 0xfdfdfd,
});

render(<App />, app.stage);

const texture = PIXI.Texture.from(sprite);

function App() {
  return <sprite texture={texture} width={225} height={165} />;
}
