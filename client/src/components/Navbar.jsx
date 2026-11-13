import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Alzikrayat</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        {user && <Link to="/upload">Upload</Link>}
      </div>
      <div className="nav-user">
        {user ? (
          <>
            <span>Hi {user.firstName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Please Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;