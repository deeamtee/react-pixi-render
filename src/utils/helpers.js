export const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

export const directionToDegree = (direction) => {
    if (direction === 'right') return 180;
    if (direction === 'down') return 270;
    if (direction === 'left') return 360;
    if (direction === 'up') return 90;
}

export function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}