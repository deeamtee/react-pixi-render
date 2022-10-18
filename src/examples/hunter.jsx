import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Stage from '../components/Stage';
import Sprite from '../components/Sprite';
import boy from '../resources/boy.png';
import arrow from '../resources/arrow.png';
import apple from '../resources/apple.png';
import tree1 from '../resources/tree1.png';
import tree2 from '../resources/tree2.png';
import trava from '../resources/trava.png';
import { useTick } from '../utils/hooks';
import { randomInteger } from '../utils/helpers';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <div style={{ cursor: 'none' }}>
        <Stage options={{ backgroundColor: 0x24bd80 }}>
            <PixiApp />
        </Stage>
    </div>
);

function PixiApp() {
    const [y, setY] = useState(0);
    const [applePosition, setApplePosition] = useState({ x: 700, y: 250 });
    const [arrowPosition, setArrowPosition] = useState({ x: 30, y: y });
    const [appleVisible, setAppleVisible] = useState(true);
    const [counter, setCounter] = useState(0);
    const backgroundSize = 100;

    const getIntersaction = useCallback((positionA, positionB, size) => {
        const { x: xA, y: yA } = positionA;
        const { x: xB, y: yB } = positionB;

        return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
    }, []);

    const randomForest = useMemo(() => {
        const background = [];
        for (let i = 0; i < 25; i++) {
            const number = randomInteger(1, 2);
            const treePosition = { x: randomInteger(20, 800), y: randomInteger(20, 600) };
            background.push({ x: treePosition.x, y: treePosition.y, number });
        }
        return background;
    }, []);

    const background = useMemo(() => {
        const size = backgroundSize;
        const background = [];
        for (let i = 0; i < 800 / size; i++) {
            for (let j = 0; j < 600 / size; j++) {
                background.push({ x: size * i, y: size * j });
            }
        }
        return background;
    }, []);

    useEffect(() => {
        const isIntersaction = getIntersaction(arrowPosition, applePosition, 25);
        if (isIntersaction && appleVisible) {
            setAppleVisible(false);
            setCounter((prev) => prev + 1);
        }
    }, [arrowPosition, applePosition]);

    useEffect(() => {
        setInterval(() => {
            const y = randomInteger(0, 550);
            setApplePosition({ x: 700, y });
            setAppleVisible(true);
        }, 2000);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleMouseMove = useCallback((event) => {
        const y = event.data.global.y - 25;
        if (y > 0 && y < 580) {
            setY(y);
        } else if (y < 0) {
            setY(0);
        } else {
            setY(580);
        }
    }, []);

    const handleClick = useCallback((event) => {
        if (event.target.width === 800) {
            setArrowPosition({ x: 30, y: event.offsetY - 25 });
        }
    }, []);

    const arrowTicker = (delta) => {
        setArrowPosition((prev) => ({ x: prev.x + 10 * delta, y: prev.y }));
    };

    useTick(arrowTicker);

    return (
        <>
            {background.map(({ x, y }, i) => (
                <Sprite key={i} img={trava} width={backgroundSize} height={backgroundSize} x={x} y={y} />
            ))}
            {randomForest.map((tree, i) => {
                if (tree.number === 1) {
                    return <Sprite key={i} img={tree1} width={100} height={100} x={tree.x} y={tree.y} />;
                } else {
                    return <Sprite key={i} img={tree2} width={100} height={100} x={tree.x} y={tree.y} />;
                }
            })}
            <text text={counter} style={{ fontSize: 48, fill: 0xffffff }} x={750} y={0} />
            {appleVisible && <Sprite img={apple} width={75} height={50} x={applePosition.x} y={applePosition.y} />}
            <Sprite img={arrow} width={70} height={40} x={arrowPosition.x} y={arrowPosition.y} />
            <Sprite img={boy} width={150} height={120} x={30} y={y} anchor={0.37} onMouseMove={handleMouseMove} />
        </>
    );
}
