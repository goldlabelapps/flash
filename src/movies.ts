import pingpongMovie from './movies/pingpong';

export type MovieFactory = typeof pingpongMovie;

const movieRegistry = {
  pingpong: pingpongMovie,
} as const satisfies Record<string, MovieFactory>;

export function getMovie(movieName: string): MovieFactory | undefined {
  return movieRegistry[movieName as keyof typeof movieRegistry];
}

export const movies = movieRegistry;
