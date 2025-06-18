import Link from 'next/link';
import styles from './Header.module.css';
import { Navbar } from '../Navbar/Navbar';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
      </div>
      <Navbar />
    </header>
  );
}

