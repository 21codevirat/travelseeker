import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Packages", path: "/search/packages" },
  { label: "Destinations", path: "/destinations" },
  { label: "Map", path: "/map" },
  { label: "Gallery", path: "/gallery" },
  { label: "Planner", path: "/planner" },
  { label: "Booking", path: "/booking" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Navbar({ currentUser, menuOpen, onLogout, setMenuOpen }) {
  function closeMenu() {
    setMenuOpen(false);
  }

  function logout() {
    onLogout();
    closeMenu();
  }

  return (
    <nav className="navbar">

  <div className="nav-logo">
    <Logo />
  </div>

  <div className="nav-links">
  {navItems.map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        isActive ? "active-link" : ""
      }
    >
      {item.label}
    </NavLink>
  ))}
</div>
  <div className="nav-auth">

  <NavLink to="/login">
    <button className="login-btn">
      Login
    </button>
  </NavLink>

  <NavLink to="/signup">
    <button className="signup-btn">
      Signup
    </button>
  </NavLink>

</div>

</nav>
  );
}

export default Navbar;
