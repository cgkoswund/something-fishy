import CenterPillarTank from "./centerPillarTank";
import Floor from "./Floor";
import OuterRingTank from "./outerRingTank";

const Aquarium = () => {
  return (
    <>
      <OuterRingTank />
      <CenterPillarTank />
      <Floor />
    </>
  );
};

export default Aquarium;
