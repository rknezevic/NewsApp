import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">MyApp</a>
      </div>
      <ul className="navbar-menu">
        <li>
            <Link href="/home">
            <p>Home</p>
            </Link>
        </li>
        <li>
            <Link href="/worldwide">
            <p>Worldwide</p>
            </Link>
        </li>
        <li>
            <Link href="/local">
            <p>Local</p>
            </Link>
        </li>
        <li>
            <Link href="/sport">
            <p>Sport</p>
            </Link>
        </li>
        <li>
            <Link href="/economy">
            <p>Economy</p>
            </Link>
        </li>
        <li>
            <Link href="/entertainment">
            <p>Entertainment</p>
            </Link>
        </li>
        <li>
            <Link href="/weather">
            <p>Weather</p>
            </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
