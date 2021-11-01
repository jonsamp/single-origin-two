export interface Logs {
  [i: number]: Log;
}

export interface Log {
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
}
