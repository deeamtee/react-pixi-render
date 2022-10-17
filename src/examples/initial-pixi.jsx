import React from 'react';
import { render } from '../renderers/hostConfigInitialRenderPIXI';
import * as PIXI from 'pixi.js';
import boy from '../resources/boy.png';

const canvas = document.getElementById('canvas');

const app = new PIXI.Application({
    width: 800,
    height: 600,
    view: canvas,
    backgroundColor: 0x292c33,
});

render(<App />, app.stage);

const texture = PIXI.Texture.from(boy);

function App() {
    return <sprite texture={texture} width={600} height={500} />;
}
