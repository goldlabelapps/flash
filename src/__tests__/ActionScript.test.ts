import { describe, expect, it } from 'vitest';
import { getActionScript } from '../ActionScript';

describe('ActionScript registry', () => {
  it('looks up ActionScript through a registry instead of a giant switch statement', () => {
    expect(getActionScript('pingpong')).toBeDefined();
    expect(getActionScript('unknown-movie')).toBeUndefined();
  });
});
