export type MovieIns = {
  name: string;
  total: number;
  movies: Item[];
}

export type Item = {
  id: number;
  title: string;
  rating: number;
  cover: string;
}

export type Rating = {
  value: number;
}