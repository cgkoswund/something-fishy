export const PLAYER_HEIGHT = 0.6;
export const PLAYER_WIDTH = 0.8;
export const PLAYER_DEPTH = 0.1;
export const ROTATION_SPEED = (0.5 * Math.PI) / 180;
export const CAMERA_FOLLOW_DISTANCE = 0.5;
export const CAMERA_VERTICAL_OFFSET = 0.0;

export const JELLY_TANK_RADIUS = 20;

export const configGeneral = {
  meshPhysicalMaterial: false,
  transmissionSampler: false,
  backside: false,
  samples: 4,
  resolution: 512,
  transmission: 1,
  roughness: 0.01,
  thickness: 3.5,
  ior: 3 + 0.000001,
  chromaticAberration: 0.01,
  anisotropy: 0.0,
  distortion: 0.1,
  distortionScale: 0.3,
  temporalDistortion: 0.9,

  attenuationDistance: 50,
  attenuationColor: '#ddffff',
  color: '#b9bfd1',
  environmentMapIntensity: 0.03,

  transmissionBleeding: 0.01,
  envMapIntensity: 0,
  reflectivity: 0.05,
};

export const centerTankConfig = {
  ...configGeneral,
  ior: 1.33333633,
  transmission: 1,
  attenuationDistance: 5.5,
  thickness: 2,
  attenuationColor: '#eef8ff',
  color: '#99afb1',
  distortion: 0.2,
  distortionScale: 3,
  resolution: 1024,
};

export const jellyTankConfig = {
  ...configGeneral,
  ior: 1.75,
  attenuationColor: '#eef8ff',
  color: '#99afb1',
  attenuationDistance: 1.5,
  distortion: 0.2,
  distortionScale: 3,
  thickness: 6,
};

export const crocTankConfig = {
  ...configGeneral,
  ior: 1.7,
  attenuationColor: '#d0d8df',
  color: '#aabfc1',
  attenuationDistance: 3,
  distortion: 0.1,
  distortionScale: 3 * 2,
  temporalDistortion: 0.5,
  chromaticAberration: 0.001,
  thickness: 6,
};

export const sharkTankConfig = {
  ...configGeneral,
  ior: 1.33333,
  attenuationColor: '#66aacc',
  // color: '#99afb1',
  color: '#fdfdfd',
  attenuationDistance: 20.5,
  transmissionSampler: true,
  resolution: 128,

  distortion: 0.00000000000000000001,
  distortionScale: 10000000000000,
  temporalDistortion: 0.0,
  thickness: 20,
  transmissionBleeding: 0.01,
  //fade color to black
};
