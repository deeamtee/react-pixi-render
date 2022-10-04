import React from 'react'
import Sprite from '../../components/Sprite'
import wall from '../../resources/wall.png'

const Scene = () => {
    const array = []
    array.length = 8
    array.fill(1)
    return array.map((_, i) => <Sprite img={wall} width={150} height={150} x={100 * i - 10} />)
}

export default Scene
