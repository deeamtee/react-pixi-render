import React, { useState } from 'react'
import { render } from '../renderers/hostConfig'
import * as PIXI from 'pixi.js'
import r2d2 from '../resources/r2d2.png'
import redbutton from '../resources/red-button.png'
import boyImg from '../resources/boy.png'

const canvas = document.getElementById('canvas')

const app = new PIXI.Application({
    width: 800,
    height: 600,
    view: canvas,
    backgroundColor: 0x292c33,
})

render(<AddChildExample />, app.stage)

const texture = PIXI.Texture.from(r2d2)
const button = PIXI.Texture.from(redbutton)
const boy = PIXI.Texture.from(boyImg)

export function AddChildExample() {
    const [characters, setCharacters] = useState([
        {
            char: texture,
            width: 75,
            height: 105,
        },
    ])

    const handleClick = () => {
        setCharacters((prev) => {
            const lastItemX = prev[prev.length - 1].x
            return [
                ...prev,
                {
                    char: boy,
                    width: 120,
                    height: 105,
                    x: lastItemX ? lastItemX + 100 : 100,
                    y: 0,
                },
            ]
        })
    }

    return (
        <>
            {characters.map(({ char, width, height, x, y }, i) => (
                <sprite key={i} texture={char} width={width} height={height} x={x} y={y} />
            ))}
            <sprite texture={button} width={75} height={75} x={725} y={525} onClick={handleClick} />
        </>
    )
}
