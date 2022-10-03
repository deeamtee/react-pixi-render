import React from 'react'
import { degreesToRadians, directionToDegree } from '../../utils/helpers'

function Snake({ x, y, size, direction, snail = 0 }) {
    const degree = directionToDegree(direction)
    const radians = degreesToRadians(degree)
    const snakeEyes = [
        { x: 0, y: size, radius: size / 6.25 },
        { x: 0, y: 0, radius: size / 6.25 },
    ]

    return (
        <>
            <graphics
                rotation={radians}
                x={x}
                y={y}
                fill={0x4287f5}
                drawRect={{ width: size + snail, height: size }}
                drawCircle={{ x: 0, y: size / 2, radius: size / 2 }}
            />
            <graphics x={x} y={y} drawCircle={snakeEyes} rotation={radians} />
        </>
    )
}

export default Snake
