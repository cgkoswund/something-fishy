import Betta from './Betta';
import PlaneFishGroup from './PlaneFishGroup';
import PlaneFishInstances from './PlaneFishInstances';
import Guppie from './Guppie';
import GoldFish from './GoldFish';

const CenterTankFishes = () => {
  //log file loaded
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
      {/* <PlaneFishGroup /> */}
      <PlaneFishInstances />
      <Guppie
        height={1.2}
        rotationY={0}
        swimSpeed={1.0 * 20 * 1.4}
        wiggleAmount={0.1 * 20}
      />
      <Guppie
        height={1.2 * 0.4}
        rotationY={90}
        swimSpeed={1.0 * 20 * 1.2}
        wiggleAmount={0.1 * 20 * 1.6}
      />
      <Guppie
        height={1.2 * 1.1}
        rotationY={180}
        swimSpeed={1.0 * 20 * 1.1}
        wiggleAmount={0.1 * 20}
      />
      <Guppie
        height={1.2 * 0.7}
        rotationY={270}
        swimSpeed={1.0 * 20 * 1.2}
        wiggleAmount={0.1 * 20}
      />
      <Guppie
        height={1.2 * 1.6}
        rotationY={70}
        swimSpeed={1.0 * 20 * 1.5}
        wiggleAmount={0.1 * 20}
      />
      <Guppie
        height={1.2 * 0.8}
        rotationY={50}
        swimSpeed={1.0 * 20 * 1.3}
        wiggleAmount={0.1 * 20}
      />
      {/************ */}
      <GoldFish
        height={1.2 * 0.8 * 0.5}
        rotationY={0}
        swimSpeed={1.0 * 4 * 0.8}
        wiggleAmount={0.1 * 20}
      />
      <GoldFish
        height={1.2 * 1 * 0.5}
        rotationY={50}
        swimSpeed={1.0 * 3 * 1.1}
        wiggleAmount={0.1 * 20}
      />
      <GoldFish
        height={1.2 * 0.6 * 0.5}
        rotationY={150}
        swimSpeed={1.0 * 3 * 1.3}
        wiggleAmount={0.1 * 20}
      />
      <GoldFish
        height={1.2 * 1.3 * 0.5}
        rotationY={250}
        swimSpeed={1.0 * 3}
        wiggleAmount={0.1 * 20}
      />
    </group>
  );
};

export default CenterTankFishes;
