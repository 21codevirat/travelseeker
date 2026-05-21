import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../constants";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Logo stacked />
        <p>Curated destination discovery and lightweight trip planning.</p>
        <p>
          <a href={`mailto:${CONTACT_INFO.primaryEmail}`}>
            {CONTACT_INFO.primaryEmail}
          </a>{" "}
          | <a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a>
        </p>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/map">Map</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </div>
    </footer>
  );
}

export default Footer;
