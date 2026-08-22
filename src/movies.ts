import logoMovie from './movies/logo';
import pingpongMovie from './movies/pingpong';

export type MovieFactory = typeof pingpongMovie | typeof logoMovie;

const movieRegistry = {
  pingpong: pingpongMovie,
  logo: logoMovie,
} as const satisfies Record<string, MovieFactory>;

export function getMovie(movieName: string): MovieFactory | undefined {
  return movieRegistry[movieName as keyof typeof movieRegistry];
}

export const movies = movieRegistry;
