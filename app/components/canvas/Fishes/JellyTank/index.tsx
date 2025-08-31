import JellyFish from './JellyFish';
import Squid from './Squid';

const JellyTankFishes = () => {
  return (
    <group>
      /*********************** */
      <JellyFish
        height={1.2}
        rotationY={0}
        swimSpeed={1.0}
        wiggleAmount={0.1}
      />
      <JellyFish
        height={1.2 * 0.7}
        rotationY={90}
        swimSpeed={0.8}
        wiggleAmount={0.15}
      />
      <JellyFish
        height={1.2 * 1.5}
        rotationY={180}
        swimSpeed={1.2}
        wiggleAmount={0.08 * 20}
      />
      <JellyFish
        height={1.2 * 0.4}
        rotationY={270}
        swimSpeed={1.5}
        wiggleAmount={0.12 * 20}
      />
      /********************* */ /*********************** */
      <JellyFish
        height={1.2 * 0.8}
        rotationY={10}
        swimSpeed={1.1}
        wiggleAmount={0.1}
      />
      <JellyFish
        height={1.2 * 0.7}
        rotationY={80}
        swimSpeed={0.8 * 0.8}
        wiggleAmount={0.15}
      />
      <JellyFish
        height={1.2 * 1.5}
        rotationY={170}
        swimSpeed={1.2 * 0.8}
        wiggleAmount={0.08 * 20}
      />
      <JellyFish
        height={1.2 * 0.4}
        rotationY={260}
        swimSpeed={1.0}
        wiggleAmount={0.12 * 20}
      />
      /********************* */
      <Squid height={0.6} rotationY={-10} swimSpeed={1.0} wiggleAmount={0.1} />
      <Squid height={0.6} rotationY={100} swimSpeed={1.0} wiggleAmount={0.1} />
      <Squid height={0.6} rotationY={190} swimSpeed={1.0} wiggleAmount={0.1} />
      <Squid height={0.6} rotationY={280} swimSpeed={1.0} wiggleAmount={0.1} />
    </group>
  );
};

export default JellyTankFishes;
