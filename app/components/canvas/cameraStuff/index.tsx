import MainCamera from "./MainCamera";
import { OrbitControls } from "@react-three/drei";

const CameraStuff = () => {
    return (
        <>
        <OrbitControls />
        <MainCamera />
        </>
    )
}

export default CameraStuff