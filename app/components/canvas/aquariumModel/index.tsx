import CenterPillarTank from './centerPillarTank';
import Floor from './Floor';
import OuterRingTank from './outerRingTank';
import WallsGeneral from './WallsGeneral';
import WaterGeneral from './WaterGeneral';
import WaterSurface from './WaterSurface';
import { Suspense } from 'react';
import CenterTankFishes from '../Fishes/CenterTankFishes';
import CrocTankFishes from '../Fishes/CrocTankFishes';
import BiggestTank from '../Fishes/BiggestTank/BiggestTank';
import JellyTankFishes from '../Fishes/JellyTank/';
import JellyTank from './jellyTank';

const Aquarium = () => {
  return (
    <>
      {/* <OuterRingTank /> */}
      {/* <CenterPillarTank /> */}
      <CenterTankFishes />
      <CrocTankFishes />
      <BiggestTank />
      <JellyTank />
      <JellyTankFishes />
      <WallsGeneral />
      <WaterSurface />
      <Floor />
      {/* <WaterGeneral /> */}
    </>
  );
};

export default Aquarium;
