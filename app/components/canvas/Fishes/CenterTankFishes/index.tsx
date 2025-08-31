import Betta from './Betta';
// import SelFish from "./SelFish";

const CenterTankFishes = () => {
  //log file loaded
  console.log('CenterTankFishes loaded');
  return (
    <group>
      <Betta
        height={1.2}
        rotationY={0}
        swimSpeed={1.0 * 20}
        wiggleAmount={0.1 * 20}
      />
      <Betta
        height={1.2 * 0.7}
        rotationY={90}
        swimSpeed={0.8 * 20}
        wiggleAmount={0.15 * 20}
      />
      <Betta
        height={1.2 * 1.5}
        rotationY={180}
        swimSpeed={1.2 * 20}
        wiggleAmount={0.08 * 20}
      />
      <Betta
        height={1.2 * 0.4}
        rotationY={270}
        swimSpeed={1.5 * 20}
        wiggleAmount={0.12 * 20}
      />
    </group>
  );
};

export default CenterTankFishes;
