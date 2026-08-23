import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { Flash } from '../Flash';

describe('Flash layout', () => {
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
});
