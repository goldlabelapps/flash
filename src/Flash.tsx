import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { Stage } from './Stage';
import { TraceMC } from './TraceMC';
import { Logo } from './movieclips/Logo';
import { Pingpongball } from './movieclips/Pingpongball';
import { getMovie } from './movies';

export type FlashHandle = {
  play: () => void;
  pause: () => void;
  restart: () => void;
};

export type FlashProps = {
  movie: string;
  width?: number;
  height?: number;
  color?: string;
  loop?: boolean;
  autoPlay?: boolean;
  debug?: boolean;
};

export const Flash = forwardRef<FlashHandle, FlashProps>(function Flash(
  {
    movie,
    width = 300,
    height = 250,
    color = 'black',
    loop = false,
    autoPlay = true,
    debug = false,
  },
  ref,
) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const selectedMovie = getMovie(movie);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !selectedMovie) {
      return;
    }

    const tl = selectedMovie({
      target,
      loop,
    });

    timelineRef.current = tl;

    if (autoPlay) {
      tl.play();
    } else {
      tl.pause(0);
    }

    return () => {
      tl.kill();
      timelineRef.current = null;
      gsap.set(target, { clearProps: 'all' });
    };
  }, [autoPlay, loop, movie, selectedMovie]);

  useImperativeHandle(ref, () => ({
    play: () => {
      timelineRef.current?.play();
    },
    pause: () => {
      timelineRef.current?.pause();
    },
    restart: () => {
      timelineRef.current?.restart();
    },
  }));

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
        {selectedMovie ? (
          <div ref={targetRef} style={{ position: 'absolute', left: '50%', top: '50%' }}>
            {movie === 'logo' ? <Logo /> : <Pingpongball />}
          </div>
        ) : null}
        <TraceMC movie={movie} active={debug} />
      </div>
    </Stage>
  );
});

export default Flash;
