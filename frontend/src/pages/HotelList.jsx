import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosInstance.get('/api/hotels');
        setHotels(response.data);
      } catch (error) {
        alert('Failed to fetch hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>
      <Link to="/hotels/new" className="bg-blue-600 text-white p-2 rounded mb-4 inline-block">
        Add New Hotel
      </Link>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id} className="border-b p-4">
            <h2>{hotel.name}</h2>
            <p>{hotel.location}</p>
            <p>{hotel.price}</p>
            <Link to={`/hotels/edit/${hotel.id}`} className="text-blue-600">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
