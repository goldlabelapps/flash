import type { CSSProperties, ReactNode } from 'react';
import type { gsap } from 'gsap';

export type FlashHandle = {
  play: () => void;
  pause: () => void;
  restart: () => void;
};

export type FlashProps = {
  movie: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  color?: string;
  loop?: boolean;
  autoPlay?: boolean;
  debug?: boolean;
};

export type StageProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  color?: string;
  children?: ReactNode;
};

export type LogoProps = {
  text?: string;
  color?: string;
  size?: number;
};

export type PingpongballProps = {
  size?: number;
  color?: string;
  x?: number;
  y?: number;
};

export type TraceMCProps = {
  movie: string;
  active?: boolean;
};

export type ActionScriptOptions = {
  target: HTMLElement;
  loop?: boolean;
  onComplete?: () => void;
};

export type LogoActionScriptOptions = ActionScriptOptions;
export type PingpongActionScriptOptions = ActionScriptOptions;
export type ActionScriptFactory = (options: ActionScriptOptions) => gsap.core.Timeline;