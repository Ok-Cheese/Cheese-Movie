export type TContentType = 'movie' | 'tv';
export type TCategory = 'popular' | 'top_rated' | 'search';
export type TPage = 'home' | 'search';

export interface IItemData {
  id: number;
  type: TContentType;
  poster: string | null;
  overview: string;
  rating: number;
  genre: number[];
  title: string;
  release: string;
  adult: boolean;
}
