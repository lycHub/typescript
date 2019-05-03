export type MovieShowing = {
  name: string;
  total: number;
  movies: MovieItem[];
}

export type MovieItem = {
  id: number;
  title: string;
  rating: {
    count: number;
    max: number;
    value: number;
  };
  coverImg: string;
}