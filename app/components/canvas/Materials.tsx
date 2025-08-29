import { useTexture } from '@react-three/drei';

const Materials = ({ material }: { material: string }) => {
  // concrete
  const concreteDiffuse = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Albedo8_512.png'
  );
  const concreteNormal = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Normal8_512.png'
  );
  const concreteRoughness = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Rough8_512.png'
  );

  //stone
  const stoneDiffuse = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Albedo8_1K.png'
  );
  const stoneNormal = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Normal8_1K.png'
  );
  const stoneRoughness = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Rough8_1K.png'
  );
  const stoneAO = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_AO8_1K.png'
  );

  //gravel
  const gravelDiffuse = useTexture('/tex/Gravel01/Gravel01_Diffuse8_1K.png');
  const gravelNormal = useTexture('/tex/Gravel01/Gravel01_Normal8_512.png');
  const gravelRoughness = useTexture('/tex/Gravel01/Gravel01_Rough8_512.png');
  const gravelAO = useTexture('/tex/Gravel01/Gravel01_AO8_512.png');

  //rubble
  const rubbleDiffuse = useTexture('/tex/Rubble01/Rubble01_Albedo8_512.png');
  const rubbleNormal = useTexture('/tex/Rubble01/Rubble01_Normal8_512.png');
  const rubbleRoughness = useTexture('/tex/Rubble01/Rubble01_Rough8_512.png');
  const rubbleAO = useTexture('/tex/Rubble01/Rubble01_AO8_512.png');

  //ceiling
  const ceilingDiffuse = useTexture('/tex/sidewalk/Sidewalk02_Albedo8_1K.png');
  const ceilingNormal = useTexture('/tex/sidewalk/Sidewalk02_Normal8_1K.png');
  const ceilingRoughness = useTexture('/tex/sidewalk/Sidewalk02_Rough8_1K.png');
  const ceilingAO = useTexture('/tex/sidewalk/Sidewalk02_AO8_1K.png');

  //floor
  const floorDiffuse = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Albedo8_2K.png'
  );
  const floorNormal = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Normal8_1K.png'
  );
  const floorRoughness = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Rough8_1K.png'
  );
  const floorAO = useTexture('/tex/WoodPlanks02/WoodPlanks02_AO8_1K.png');

  const materialsMap = {
    concrete: <meshStandardMaterial color="rgb(60,75,100)" />,
    stone: <meshStandardMaterial color="rgb(60,75,100)" />,
    gravel: <meshStandardMaterial color="rgb(60,75,100)" />,
    rubble: <meshStandardMaterial color="rgb(60,75,100)" />,
    ceiling: <meshStandardMaterial color="rgb(60,75,100)" />,
    floor: <meshStandardMaterial color="rgb(60,75,100)" />,
  };
  return <></>;
};
