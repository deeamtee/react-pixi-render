/** Пример ренедера в PIXI */
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import Stage from '../components/Stage'
import Sprite from '../components/Sprite'
import Snake from './components/Snake'
import Scene from './components/Scene'
import apple from '../resources/apple.png'
import wall from '../resources/wall.png'
import { useApp, useTick } from '../utils/hooks'
import { useCallback } from 'react'
import { randomInteger } from '../utils/helpers'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <Stage options={{ backgroundColor: 0x24bd80 }}>
        <PixiApp />
    </Stage>
)

const getIntersaction = (positionA, positionB, size) => {
    const { x: xA, y: yA } = positionA
    const { x: xB, y: yB } = positionB

    return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size
}

function PixiApp() {
    const app = useApp()
    const screenWidth = app.screen.width
    const screenHeight = app.screen.height
    const snakeSize = useRef(25)
    const snakeSpeed = useRef(3)
    const [position, setPosition] = useState({ x: 100, y: 100 })
    const [counter, setCounter] = useState(0)
    const [snail, setSnail] = useState([1])
    const [applePosition, setApplePosition] = useState({
        x: randomInteger(0, screenWidth),
        y: randomInteger(0, screenHeight),
    })
    const [direction, setDirection] = useState('right')

    const handleKeyDown = useCallback(({ key }) => {
        if (key === 'ArrowUp') setDirection('up')
        if (key === 'ArrowDown') setDirection('down')
        if (key === 'ArrowLeft') setDirection('left')
        if (key === 'ArrowRight') setDirection('right')
    }, [])

    const ticker = useCallback(
        (time) => {
            const speed = time * snakeSpeed.current
            /** Направление движения */
            if (direction === 'up') setPosition(({ x, y }) => ({ x, y: y - speed }))
            if (direction === 'down') setPosition(({ x, y }) => ({ x, y: y + speed }))
            if (direction === 'left') setPosition(({ x, y }) => ({ x: x - speed, y }))
            if (direction === 'right') setPosition(({ x, y }) => ({ x: x + speed, y }))
        },
        [direction]
    )

    useTick(ticker)

    useEffect(() => {
        /** Перемещаем змейку в начало, если зашла вы из видимой области */
        if (position.x > screenWidth) setPosition(({ y }) => ({ x: 0, y }))
        if (position.y > screenHeight) setPosition(({ x }) => ({ x, y: 0 }))
        if (position.x < 0) setPosition(({ y }) => ({ x: screenWidth, y }))
        if (position.y < 0) setPosition(({ x }) => ({ x, y: screenHeight }))

        if (getIntersaction(position, applePosition, 30)) {
            const x = randomInteger(0, screenWidth - 50)
            const y = randomInteger(0, screenHeight - 50)

            setApplePosition({ x, y })
            setCounter((p) => p + 1)
            // setSnail((p) => p + 10)
        }
    }, [position])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <>
            <text text={counter} style={{ fontSize: 32, fill: 0xffffff }} x={38} />
            <Snake
                x={position.x}
                y={position.y}
                size={snakeSize.current}
                direction={direction}
                snail={snail}
            />
            <Sprite
                img={apple}
                width={50}
                height={35}
                x={applePosition.x}
                y={applePosition.y}
                anchor={0.5}
            />
            <Sprite img={apple} width={50} height={35} x={15} y={18} anchor={0.5} />
        </>
    )
}
