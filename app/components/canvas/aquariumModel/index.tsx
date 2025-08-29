import CenterPillarTank from './centerPillarTank';
import Floor from './Floor';
import OuterRingTank from './outerRingTank';
import WallsGeneral from './WallsGeneral';
import WaterGeneral from './WaterGeneral';
import WaterSurface from './WaterSurface';

const Aquarium = () => {
  return (
    <>
      {/* <OuterRingTank /> */}
      {/* <CenterPillarTank /> */}
      <WallsGeneral />
      <WaterSurface />
      <WaterGeneral />
      <Floor />
    </>
  );
};

export default Aquarium;
