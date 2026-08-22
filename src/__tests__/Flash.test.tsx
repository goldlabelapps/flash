import { render, screen, waitFor } from '@testing-library/react';
import { act, StrictMode } from 'react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Flash, type FlashHandle } from '../Flash';
import { getActionScript } from '../ActionScript';

describe('Flash', () => {
  it('preserves centered movie positioning in Strict Mode', () => {
    render(
      <StrictMode>
        <Flash movie="pingpong" />
      </StrictMode>,
    );

    const target = screen.getByLabelText('Pingpongball').parentElement;

    expect(target?.style.left).toBe('50%');
    expect(target?.style.top).toBe('50%');
  });

  it('fills its parent dimensions when width and height are omitted', () => {
    render(<Flash movie="pingpong" />);

    const stage = screen.getByLabelText('Flash stage');

    expect(stage.style.width).toBe('100%');
    expect(stage.style.height).toBe('100%');
  });

  it('runs a pingpong movie and animates the target element', async () => {
    render(<Flash movie="pingpong" width={300} height={250} color="black" loop={false} />);

    const ball = screen.getByLabelText('Pingpongball');

    await waitFor(() => {
      expect(ball.style.transform).not.toBe('');
    }, { timeout: 2000 });
  });

  it('looks up ActionScript through a registry instead of a giant switch statement', () => {
    expect(getActionScript('pingpong')).toBeDefined();
    expect(getActionScript('unknown-movie')).toBeUndefined();
  });

  it('exposes playback controls via ref', () => {
    const ref = createRef<FlashHandle>();

    render(<Flash ref={ref} movie="pingpong" width={300} height={250} color="black" loop={false} autoPlay={false} />);

    expect(ref.current).toBeDefined();
    expect(ref.current?.play).toBeTypeOf('function');
    expect(ref.current?.pause).toBeTypeOf('function');
    expect(ref.current?.restart).toBeTypeOf('function');

    act(() => {
      ref.current?.play();
    });

    expect(screen.getByLabelText('Pingpongball')).toBeTruthy();
  });

  it('renders optional debug trace information for the active movie', () => {
    render(
      <Flash movie="pingpong" width={300} height={250} color="black" loop debug />,
    );

    expect(screen.getByText('movie: pingpong')).toBeTruthy();
  });
});
