/**
 *
 * GlobalLoader
 *
 */
import React, { memo } from 'react';
import { Container, LinearProgress } from '@mui/material';

interface Props {}

export const GlobalLoader = memo((props: Props) => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container sx={{ height: '100vh', pt: '50vh' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Container>
  );
});
