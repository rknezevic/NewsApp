
const categoryColorMap : {[key: string]: string} = {
  sport: 'sportColor',
  local: 'localColor',
  economy: 'economyColor',
  entertainment: 'entertainmentColor',
  weather: 'weatherColor',
  worldwide: 'worldwideColor',
};
export function getCategoryColor(category: string): string { 
  return categoryColorMap[category];
}       