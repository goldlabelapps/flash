import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Flash, type FlashHandle } from '../Flash';

describe('Flash animation', () => {
  it('runs a pingpong movie and animates the target element', async () => {
    render(<Flash movie="pingpong" width={300} height={250} color="black" loop={false} />);

    const ball = screen.getByLabelText('Pingpongball');

    await waitFor(() => {
      expect(ball.style.transform).not.toBe('');
    }, { timeout: 2000 });
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
});
