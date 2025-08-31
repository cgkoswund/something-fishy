import CenterPillarTank from './centerPillarTank';
import Floor from './Floor';
import OuterRingTank from './outerRingTank';
import WallsGeneral from './WallsGeneral';
import WaterGeneral from './WaterGeneral';
import WaterSurface from './WaterSurface';
import { Suspense } from 'react';

const Aquarium = () => {
  return (
    <>
      {/* <OuterRingTank /> */}
      {/* <CenterPillarTank /> */}
      <WallsGeneral />
      <WaterSurface />
      <Floor />
      {/* <WaterGeneral /> */}
    </>
  );
};

export default Aquarium;
