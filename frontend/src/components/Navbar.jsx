import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();  // Access the user context

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">Hotel & Tour Booking</Link>
        </div>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mx-4">Profile</Link>
              <Link to="/hotels" className="mx-4">Hotels</Link>
              <Link to="/tours" className="mx-4">Tours</Link>
              <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-4">Login</Link>
              <Link to="/register" className="mx-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
