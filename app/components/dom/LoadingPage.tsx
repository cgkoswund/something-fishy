import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

const LoadingPage = () => {
  const { progress, loaded, total } = useProgress();
  const [percentage, setPercentage] = useState(0);

  // Calculate percentage smoothly
  useEffect(() => {
    const targetPercentage = Math.min(Math.floor((loaded / total) * 100), 100);

    // Animate the percentage for smoother transitions
    if (percentage < targetPercentage) {
      const timer = setTimeout(() => {
        setPercentage((prev) => Math.min(prev + 1, targetPercentage));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [percentage, loaded, total]);

  // SVG circle properties - 30% smaller
  const size = 210; // Reduced from 300 (30% smaller)
  const strokeWidth = 8; // Doubled from 4 to 8
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <>
      {percentage < 100 ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            backgroundColor: 'rgb(30, 30, 30)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '50px',
            }}
          >
            {/* Loading circle container */}
            <div
              style={{
                position: 'relative',
                width: `${size}px`,
                height: `${size}px`,
              }}
            >
              {/* SVG for circular progress */}
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
              >
                {/* Background circle - more faint */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.15)" // Reduced from 0.51 to 0.15
                  strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#3498db"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Content inside the circle */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <h1 style={{ margin: 0, fontSize: '20px' }}>Loading...</h1>
                <p style={{ margin: '8px 0 0 0', fontSize: '18px' }}>
                  {percentage}%
                </p>
              </div>
            </div>

            {/* Instructions container - bolder and italic */}
            <div
              style={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                padding: '15px 25px',
                borderRadius: '4px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700, // Changed from 500 to 700 for bolder text
                fontStyle: 'italic', // Added italic style
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                Controls:
              </div>
              <div>W,A,S,D - Move</div>
              <div>Mouse - Look</div>
              <div>Shift - Run</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoadingPage;
