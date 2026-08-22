import { gsap } from 'gsap';

export type PingpongMovieOptions = {
  target: HTMLElement;
  loop?: boolean;
  onComplete?: () => void;
};

export default function pingpong({
  target,
  loop = false,
  onComplete,
}: PingpongMovieOptions) {
  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    onComplete,
  });

  gsap.set(target, {
    x: -80,
    y: 0,
    scale: 1,
    opacity: 1,
  });

  tl.to(target, {
    x: 80,
    duration: 0.9,
    ease: 'power2.inOut',
  })
    .to(target, {
      x: -80,
      duration: 0.9,
      ease: 'power2.inOut',
    });

  return tl;
}
