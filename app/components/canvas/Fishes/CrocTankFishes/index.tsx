import NileCroc from './NileCroc';

const CrocTankFishes = () => {
  return (
    <group>
      <NileCroc
        height={0.7 * 3}
        xOffset={2.5}
        swimSpeed={1.0 * 1.2}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 1.1}
        xOffset={2.5}
        swimSpeed={1.0 * 0.8}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 2}
        xOffset={-2.5}
        swimSpeed={1.0}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 1.0}
        xOffset={-2.5}
        swimSpeed={1.0 * 1.3}
        wiggleAmount={0.1 * 20}
      />

      {/*<Tank 2*/}
      <group position={[0, 0, -40]}>
        <NileCroc
          height={0.7 * 3}
          xOffset={2.5}
          swimSpeed={1.0 * 1.2}
          wiggleAmount={0.1 * 20}
        />
        <NileCroc
          height={0.7 * 1.1}
          xOffset={2.5}
          swimSpeed={1.0 * 0.8}
          wiggleAmount={0.1 * 20}
        />
        <NileCroc
          height={0.7 * 2}
          xOffset={-2.5}
          swimSpeed={1.0}
          wiggleAmount={0.1 * 20}
        />
        <NileCroc
          height={0.7 * 1.0}
          xOffset={-2.5}
          swimSpeed={1.0 * 1.3}
          wiggleAmount={0.1 * 20}
        />
      </group>
    </group>
  );
};

export default CrocTankFishes;
