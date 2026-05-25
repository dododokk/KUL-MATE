export interface SearchHistory {
  searchHistoryKey: number;
  keyword: string;
  createdAt: string;
}

export type GetSearchHistoriesResponse = SearchHistory[];
