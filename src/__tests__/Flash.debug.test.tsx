import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Flash } from '../Flash';

describe('Flash debug output', () => {
  it('renders optional debug trace information for the active movie', () => {
    render(
      <Flash movie="pingpong" width={300} height={250} color="black" loop debug />,
    );

    expect(screen.getByText('movie: pingpong')).toBeTruthy();
  });
});
