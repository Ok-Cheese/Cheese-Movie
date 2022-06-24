export type TContentType = 'movie' | 'tv';
export type TCategory = 'popular' | 'top_rated';

export interface IItemData {
  id: number;
  poster: string | null;
  overview: string;
  rating: number;
  genre: number[];
  title: string;
  release: string;
  adult: boolean;
}
