export interface Token {
  symbol: string;
  name: string;
  icon: string;
  category: string;
}

export interface TokenSearchResult {
  tokens: Token[];
  categories: string[];
}

export interface TokenCategory {
  name: string;
  tokens: Token[];
}
