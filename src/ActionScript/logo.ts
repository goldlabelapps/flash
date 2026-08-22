import { gsap } from 'gsap';
import type { LogoActionScriptOptions } from '../types';

export type { LogoActionScriptOptions } from '../types';

export default function logo({
  target,
  loop = false,
  onComplete,
}: LogoActionScriptOptions) {
  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    onComplete,
  });

  gsap.set(target, {
    autoAlpha: 0,
    y: 12,
    scale: 0.9,
  });

  tl.to(target, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: 'power2.out',
  });

  return tl;
}
