import React, { useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber";
import { easing } from 'maath'
import { useCursor } from '@react-three/drei';

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    //the pointer changes state on hover
    useCursor(hovered)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if (hovered) {
            //rotating the cube on hover with time ptovided by three.js clock 
            ref.current.rotation.x += delta
            // ref.current.rotation.z = 1.3 * Math.sin(state.clock.elapsedTime) 
        } else {
            easing.dampE(ref.current.rotation, [0, 0, 0], 0.25, delta)
        }

    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default function Experience() {

    return (
        <>
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </>
    )
}
