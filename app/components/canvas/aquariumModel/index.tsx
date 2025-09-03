import CenterPillarTank from './centerPillarTank';
import Floor from './Floor';
import OuterRingTank from './outerRingTank';
import WallsGeneral from './WallsGeneral';
import WaterGeneral from './WaterGeneral';
import WaterSurface from './WaterSurface';
import CenterTankFishes from '../Fishes/CenterTankFishes';
import CrocTankFishes from '../Fishes/CrocTankFishes';
import BiggestTank from '../Fishes/BiggestTank/BiggestTank';
import JellyTankFishes from '../Fishes/JellyTank/';
import JellyTank from './jellyTank';
import Materials from '../Materials';

const Aquarium = () => {
  const materialsMap = Materials();
  return (
    <>
      {/* <OuterRingTank /> */}
      <CenterPillarTank materialsMap={materialsMap} />
      <CenterTankFishes />
      <CrocTankFishes />
      <BiggestTank />
      <JellyTank materialsMap={materialsMap} />
      <JellyTankFishes />
      <WallsGeneral />
      <WaterSurface />
      <Floor materialsMap={materialsMap} />
      {/* <WaterGeneral /> */}
    </>
  );
};

export default Aquarium;
