/** Пример ренедера в PIXI */
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Stage from '../components/Stage';
import Sprite from '../components/Sprite';
import apple from '../resources/apple.png';
import trava from '../resources/trava.png';
import trava2 from '../resources/trava2.png';
import { useApp, useTick } from '../utils/hooks';
import { randomInteger } from '../utils/helpers';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <Stage options={{ backgroundColor: 0x24bd80 }}>
        <PixiApp />
    </Stage>
);

function PixiApp() {
    const app = useApp();
    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const size = 25;
    const step = size;
    const count = useRef(0);
    const [counter, setCounter] = useState(0);
    const [snail, setSnail] = useState([{ x: 100, y: 500 }]);
    const [applePosition, setApplePosition] = useState({
        x: randomInteger(0, screenWidth),
        y: randomInteger(0, screenHeight),
    });
    const [direction, setDirection] = useState('right');
    const background = useMemo(() => {
        const background = [];
        for (let i = 0; i < 800 / size; i++) {
            for (let j = 0; j < 600 / size; j++) {
                const number = randomInteger(1, 2);
                background.push({ x: size * i, y: size * j, number });
            }
        }
        return background;
    }, []);

    const getIntersaction = useCallback((positionA, positionB, size) => {
        const { x: xA, y: yA } = positionA;
        const { x: xB, y: yB } = positionB;

        return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
    }, []);

    const handleKeyDown = useCallback(({ key }) => {
        if (key === 'ArrowUp') setDirection('up');
        if (key === 'ArrowDown') setDirection('down');
        if (key === 'ArrowLeft') setDirection('left');
        if (key === 'ArrowRight') setDirection('right');
    }, []);

    const ticker = useCallback(
        (time) => {
            if (++count.current < 4) {
                return;
            }
            count.current = 0;

            if (direction === 'up')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y - step * time }]);
            if (direction === 'down')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y + step * time }]);
            if (direction === 'left')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x - step * time, y: p[p.length - 1].y }]);
            if (direction === 'right')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x + step * time, y: p[p.length - 1].y }]);
        },
        [direction]
    );

    useTick(ticker);

    useEffect(() => {
        const position = snail[snail.length - 1];
        /** Перемещаем змейку в начало, если зашла вы из видимой области */
        if (position.x > screenWidth) setSnail((p) => [...p.slice(1), { x: 0, y: p[p.length - 1].y }]);
        if (position.y > screenHeight) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: 0 }]);
        if (position.x < 0) setSnail((p) => [...p.slice(1), { x: screenWidth, y: p[p.length - 1].y }]);
        if (position.y < 0) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: screenHeight }]);

        if (getIntersaction(position, applePosition, 30)) {
            const x = randomInteger(0, screenWidth - 50);
            const y = randomInteger(0, screenHeight - 50);

            setApplePosition({ x, y });
            setCounter((p) => p + 1);
            if (direction === 'up') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y - step }]);
            if (direction === 'down') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y + step }]);
            if (direction === 'left') setSnail((p) => [...p, { x: p[p.length - 1].x - step, y: p[p.length - 1].y }]);
            if (direction === 'right') setSnail((p) => [...p, { x: p[p.length - 1].x + step, y: p[p.length - 1].y }]);
        }
    }, [direction, snail, screenWidth, screenHeight]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {background.map(({ x, y, number }, i) => {
                if (number === 1) {
                    return <Sprite key={i} img={trava} x={x} y={y} width={size} height={size} />;
                } else if (number === 2) {
                    return <Sprite key={i} img={trava2} x={x} y={y} width={size} height={size} />;
                }
            })}
            <text text={counter} style={{ fontSize: 32, fill: 0xffffff }} x={38} />

            {snail.map(({ x, y }, i) => {
                return <graphics key={i} fill={0x4287f5} drawRect={{ width: size, height: size }} x={x} y={y} />;
            })}
            <Sprite img={apple} width={50} height={35} x={applePosition.x} y={applePosition.y} anchor={0.5} />
            <Sprite img={apple} width={50} height={35} x={15} y={18} anchor={0.5} />
        </>
    );
}
