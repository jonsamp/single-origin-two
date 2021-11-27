export type Logs = {
  [i: number]: Log;
};

export type Log = {
  timestamp: number;
  totalVolume: number;
  totalBrewTime: number;
  ratio: number;
  recipeId: string;
  grind?: number;
  temp?: number;
  rating?: number;
  tastingNote?: string;
  notes?: string;
};
