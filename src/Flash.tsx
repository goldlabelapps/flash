import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Stage } from './Stage';
import { Pingpongball } from './movieclips/Pingpongball';
import pingpongMovie from './movies/pingpong';

export type FlashProps = {
  movie: string;
  width?: number;
  height?: number;
  color?: string;
  loop?: boolean;
};

export function Flash({
  movie,
  width = 300,
  height = 250,
  color = 'black',
  loop = false,
}: FlashProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || movie !== 'pingpong') {
      return;
    }

    const tl = pingpongMovie({
      target,
      loop,
    });

    return () => {
      tl.kill();
      gsap.set(target, { clearProps: 'all' });
    };
  }, [movie, loop]);

  return (
    <Stage width={width} height={height} color={color}>
      <div
        data-flash-movie={movie}
        data-flash-loop={String(loop)}
        aria-label={`Flash movie: ${movie}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
        }}
      >
        {movie === 'pingpong' ? (
          <div ref={targetRef} style={{ position: 'absolute', left: '50%', top: '50%' }}>
            <Pingpongball />
          </div>
        ) : null}
      </div>
    </Stage>
  );
}

export default Flash;
