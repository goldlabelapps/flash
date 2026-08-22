export type TraceMCProps = {
  movie: string;
  active?: boolean;
};

export function TraceMC({ movie, active = true }: TraceMCProps) {
  if (!active) {
    return null;
  }

  return (
    <div
      aria-label="TraceMC"
      style={{
        position: 'absolute',
        left: 8,
        top: 8,
        background: 'rgba(0, 0, 0, 0.65)',
        color: '#fff',
        fontSize: 11,
        padding: '4px 6px',
        borderRadius: 4,
        pointerEvents: 'none',
      }}
    >
      movie: {movie}
    </div>
  );
}

export default TraceMC;
