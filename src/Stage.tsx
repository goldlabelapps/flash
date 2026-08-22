import type { CSSProperties, ReactNode } from 'react';

export type StageProps = {
  width?: number;
  height?: number;
  color?: string;
  children?: ReactNode;
};

export function Stage({
  width = 300,
  height = 250,
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
