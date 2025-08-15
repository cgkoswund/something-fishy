import { PerspectiveCamera } from "@react-three/drei";

const MainCamera = () => {
    return (
        <>
        <PerspectiveCamera position={[0, 0.8, 5]} makeDefault />
        </>
    )
}

export default MainCamera