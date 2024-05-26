export enum FavoritesStatus {
  ADD = 1,
  DELETE = 0
}

export type FavoritesData = {
  id: string | undefined;
  status: FavoritesStatus;
};
