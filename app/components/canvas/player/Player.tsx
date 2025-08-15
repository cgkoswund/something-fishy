const Player = () => {
    const playerHeight = 0.6;
    const playerWidth = 0.3;
    const playerDepth = 0.1;
    return (
        <>
        <group position={[0, playerHeight / 2, 0]}>
        <mesh position={[0, 0, 3]}>
            <boxGeometry args={[playerWidth, playerHeight, playerDepth]} />
            <meshStandardMaterial color="red" />
        </mesh>
        </group>
        </>
    )
}

export default Player