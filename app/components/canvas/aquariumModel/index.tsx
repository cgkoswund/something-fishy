import CenterPillarTank from './centerPillarTank';
import Floor from './Floor';
import OuterRingTank from './outerRingTank';
import WallsGeneral from './WallsGeneral';
import WaterGeneral from './WaterGeneral';

const Aquarium = () => {
  return (
    <>
      {/* <OuterRingTank /> */}
      {/* <CenterPillarTank /> */}
      <WallsGeneral />
      <WaterGeneral />
      <Floor />
    </>
  );
};

export default Aquarium;
