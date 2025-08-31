import SeaTurtle from './SeaTurtle';

const BiggestTank = () => {
  //log file loaded
  console.log('BiggestTank loaded');
  return (
    <group>
      /********************* */
      <SeaTurtle
        height={1.2}
        rotationY={0}
        swimSpeed={1.0 * 2}
        wiggleAmount={0.1 * 2}
      />
      <SeaTurtle
        height={1.2 * 0.7}
        rotationY={90}
        swimSpeed={0.8 * 2}
        wiggleAmount={0.15 * 2}
      />
      <SeaTurtle
        height={1.2 * 1.5}
        rotationY={180}
        swimSpeed={1.2 * 2}
        wiggleAmount={0.08 * 2}
      />
      <SeaTurtle
        height={1.2 * 0.4}
        rotationY={270}
        swimSpeed={1.5 * 2}
        wiggleAmount={0.12 * 2}
      />
      /********************* */ /********************* */
      <SeaTurtle
        height={1.2}
        rotationY={0}
        swimSpeed={1.0 * 2.2}
        wiggleAmount={0.1 * 2.2}
      />
      <SeaTurtle
        height={1.2 * 0.7}
        rotationY={90}
        swimSpeed={0.8 * 2.2}
        wiggleAmount={0.15 * 2.2}
      />
      <SeaTurtle
        height={1.2 * 1.5}
        rotationY={180}
        swimSpeed={1.2 * 2.2}
        wiggleAmount={0.08 * 2.2}
      />
      <SeaTurtle
        height={1.2 * 0.4}
        rotationY={270}
        swimSpeed={1.5 * 2.2}
        wiggleAmount={0.12 * 2.2}
      />
      /********************* */ /********************* */
      <SeaTurtle
        height={1.4}
        rotationY={0 + 20}
        swimSpeed={1.0 * 2.6}
        wiggleAmount={0.1 * 2.4}
      />
      <SeaTurtle
        height={1.2 * 0.9}
        rotationY={90 + 20}
        swimSpeed={0.8 * 2.6 * 2}
        wiggleAmount={0.15 * 2.4}
      />
      <SeaTurtle
        height={1.2 * 1.7}
        rotationY={180 + 20}
        swimSpeed={1.2 * 2.6 * 2}
        wiggleAmount={0.08 * 2.4}
      />
      <SeaTurtle
        height={1.2 * 0.5}
        rotationY={270 + 20}
        swimSpeed={1.5 * 2.6 * 2}
        wiggleAmount={0.12 * 2.4}
      />
      /********************* */
    </group>
  );
};

export default BiggestTank;
