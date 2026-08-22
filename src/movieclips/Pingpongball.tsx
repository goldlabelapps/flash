export type PingpongballProps = {
  size?: number;
  color?: string;
  x?: number;
  y?: number;
};

export function Pingpongball({
  size = 28,
  color = '#ffffff',
  x = 0,
  y = 0,
}: PingpongballProps) {
  return (
    <div
      aria-label="Pingpongball"
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 12px rgba(255,255,255,0.5)',
      }}
    />
  );
}

export default Pingpongball;
