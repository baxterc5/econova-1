import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/ecoswap', label: 'Ecoswap' },
  { href: '/planet', label: 'Planet' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav-bar-container">
      {/* Logo on the left */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo.svg" alt="EcoNova Logo" />
        </Link>
      </div>

      {/* Nav links on the right */}
      <Nav as="ul" className="nav-bar justify-content-end">
        {navItems.map((item) => (
          <Nav.Item as="li" key={item.href}>
            <Link
              to={item.href}
              className={`custom-link ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </nav>
  );
}