import { useProgress } from '@react-three/drei';

const LoadingPage = () => {
  const { progress } = useProgress();
  return (
    <div>
      <h1>Loading...</h1>
      <p>{progress.toFixed(2)}%</p>
    </div>
  );
};

export default LoadingPage;
