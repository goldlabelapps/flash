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
    <div
      data-flash-movie={movie}
      data-flash-loop={String(loop)}
      style={{
        width,
        height,
        backgroundColor: color,
        display: 'block',
      }}
      aria-label={`Flash movie: ${movie}`}
    />
  );
}

export default Flash;
