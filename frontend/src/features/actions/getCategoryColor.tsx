import styles from '../../components/card/newsPostCard.module.css';

const categoryColorMap : {[key: string]: string} = {
  sport: styles.sportColor,
  local: styles.localColor,
  economy: styles.economyColor,
  entertainment: styles.entertainmentColor,
  weather: styles.weatherColor,
  worldwide: styles.worldwideColor,
};
export function getCategoryColor(category: string): string {    
  return categoryColorMap[category];
}       