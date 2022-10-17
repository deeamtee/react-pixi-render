/** Пример ренедера в PIXI */
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Stage from '../components/Stage';
import Sprite from '../components/Sprite';
import { useTick } from '../utils/hooks';
import boy from '../resources/boy.png';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <Stage options={{ backgroundColor: 0x292c33 }}>
        <PixiApp />
    </Stage>
);

function PixiApp() {
    const [x, setX] = useState(0);
    const [rotation, setRotation] = useState(0);
    useTick((delta) => {
        setRotation((rotation) => rotation - 0.03 * delta);
    });
    const handleMouseMove = (event) => {
        const x = Math.floor(event.data.global.x);
        setX(x);
    };

    return (
        <Sprite img={boy} width={180} height={150} x={x} y={250} rotation={rotation} onMouseMove={handleMouseMove} />
    );
}
