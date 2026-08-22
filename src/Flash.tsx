import { Stage } from './Stage';
import { Pingpongball } from './movieclips/Pingpongball';

export type FlashProps = {
  movie: string;
  width?: number;
  height?: number;
  color?: string;
  loop?: boolean;
};

export function Flash({
  movie,
  width = 300,
  height = 250,
  color = 'black',
  loop = false,
}: FlashProps) {
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
        }}
      >
        {movie === 'pingpong' ? <Pingpongball /> : null}
      </div>
    </Stage>
  );
}

export default Flash;
