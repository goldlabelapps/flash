import type { CSSProperties } from 'react';
import type { StageProps } from './types';

export type { StageProps } from './types';

export function Stage({
  width = '100%',
  height = '100%',
  color = 'black',
  children,
}: StageProps) {
  const style: CSSProperties = {
    width,
    height,
    backgroundColor: color,
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={style} data-stage="true" aria-label="Flash stage">
      {children}
    </div>
  );
}

export default Stage;
