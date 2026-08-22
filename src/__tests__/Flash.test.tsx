import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Flash } from '../Flash';
import { getMovie } from '../movies';

describe('Flash', () => {
  it('runs a pingpong movie and animates the target element', async () => {
    render(<Flash movie="pingpong" width={300} height={250} color="black" loop={false} />);

    const ball = screen.getByLabelText('Pingpongball');

    await waitFor(() => {
      expect(ball.style.transform).not.toBe('');
    }, { timeout: 2000 });
  });

  it('looks up movies through a registry instead of a giant switch statement', () => {
    expect(getMovie('pingpong')).toBeDefined();
    expect(getMovie('unknown-movie')).toBeUndefined();
  });
});
