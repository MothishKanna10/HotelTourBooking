import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HotelList from './pages/HotelList';  // Listing hotels
import HotelForm from './pages/HotelForm';  // Create/edit hotel
import TourList from './pages/TourList';    // Listing tours
import TourForm from './pages/TourForm';    // Create/edit tour

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hotels" element={<HotelList />} />  {/* Hotel listing */}
        <Route path="/hotels/new" element={<HotelForm />} />  {/* Create new hotel */}
        <Route path="/hotels/edit/:id" element={<HotelForm />} />  {/* Edit existing hotel */}
        <Route path="/tours" element={<TourList />} />  {/* Tour listing */}
        <Route path="/tours/new" element={<TourForm />} />  {/* Create new tour */}
        <Route path="/tours/edit/:id" element={<TourForm />} />  {/* Edit existing tour */}
      </Routes>
    </Router>
  );
}

export default App;
