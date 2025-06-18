import Link from "next/link";
import styles from "./Navbar.module.css";
import { categories } from "@/features/CategoriesNavbar";
import { getCategoryColor } from "@/features/actions/getCategoryColor";
import { LogoutButton } from "../Button/LogoutButton";

export const Navbar = () => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {categories.map((category) => (
          <li
            key={category.slug}
            className={`${styles.navItem} ${getCategoryColor(category.slug)}`}
          >
            <Link href={`/${category.slug}`}>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <LogoutButton/>
    </nav>
  );
}
