import React, { useState } from 'react';
import { render } from '../renderers/hostConfigDeleteAndRestore';
import * as PIXI from 'pixi.js';
import boyImg from '../resources/boy.png';
import appleImg from '../resources/apple.png';

const canvas = document.getElementById('canvas');

const app = new PIXI.Application({
    width: 800,
    height: 600,
    view: canvas,
    backgroundColor: 0x292c33,
});

render(<App />, app.stage);

const boy = PIXI.Texture.from(boyImg);
const apple = PIXI.Texture.from(appleImg);

function App() {
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(false);
    };

    return (
        <>
            {visible && <sprite texture={apple} width={100} height={75} x={650} y={250} />}
            <sprite texture={boy} width={200} height={170} x={50} y={200} buttonMode onClick={handleClick} />
        </>
    );
}
