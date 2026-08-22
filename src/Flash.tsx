import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { Stage } from './Stage';
import { Logo } from './MovieClips/Logo';
import { Pingpongball } from './MovieClips/Pingpongball';
import { TraceMC } from './MovieClips/TraceMC';
import { getActionScript } from './ActionScript';
import type { FlashHandle, FlashProps } from './types';

export type { FlashHandle, FlashProps } from './types';

export const Flash = forwardRef<FlashHandle, FlashProps>(function Flash(
  {
    movie,
    width = '100%',
    height = '100%',
    color = 'black',
    loop = false,
    autoPlay = true,
    debug = false,
  },
  ref,
) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const selectedActionScript = getActionScript(movie);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !selectedActionScript) {
      return;
    }

    const tl = selectedActionScript({
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
  }, [autoPlay, loop, movie, selectedActionScript]);

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
        {selectedActionScript ? (
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
