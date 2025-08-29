import { N8AO, SMAA } from '@react-three/postprocessing';
import { EffectComposer } from '@react-three/postprocessing';

const PostEffects = () => {
  return (
    <>
      <EffectComposer>
        <N8AO
          // halfRes

          aoSamples={20}
          aoRadius={0.25}
          distanceFalloff={0.05}
          intensity={40}
          denoiseRadius={10}
          denoiseSamples={210}
        />

        <SMAA />
      </EffectComposer>
    </>
  );
};

export default PostEffects;
