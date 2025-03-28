import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosInstance.get('/api/tours');
        setTours(response.data);
      } catch (error) {
        alert('Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Tours</h1>
      <Link to="/tours/new" className="bg-blue-600 text-white p-2 rounded mb-4 inline-block">
        Add New Tour
      </Link>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id} className="border-b p-4">
            <h2>{tour.name}</h2>
            <p>{tour.destination}</p>
            <p>{tour.price}</p>
            <Link to={`/tours/edit/${tour.id}`} className="text-blue-600">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
