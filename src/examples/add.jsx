import React, { useState } from 'react';
import { render } from '../renderers/hostConfig';
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

const apple = PIXI.Texture.from(appleImg);
const boy = PIXI.Texture.from(boyImg);

function App() {
    const [characters, setCharacters] = useState([
        {
            char: boy,
            width: 200,
            height: 170,
        },
    ]);

    const handleClick = () => {
        setCharacters((prev) => {
            const lastItemX = prev[prev.length - 1].x;
            return [
                ...prev,
                {
                    char: boy,
                    width: 200,
                    height: 170,
                    x: lastItemX ? lastItemX + 100 : 100,
                    y: 0,
                },
            ];
        });
    };

    return (
        <>
            {characters.map(({ char, width, height, x, y }, i) => (
                <sprite key={i} texture={char} width={width} height={height} x={x} y={y} />
            ))}
            <sprite texture={apple} width={100} height={75} x={700} y={50} buttonMode onClick={handleClick} />
        </>
    );
}
