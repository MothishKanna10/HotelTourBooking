import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HotelForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    pricePerNight: '', // Updated to match backend model
    description: '',
    availableRooms: '', // Added availableRooms field
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch hotel data if editing an existing hotel
      const fetchHotel = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/api/hotels/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setHotelData(response.data);
        } catch (error) {
          alert('Failed to fetch hotel details');
        } finally {
          setLoading(false);
        }
      };
      fetchHotel();
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = id ? 'put' : 'post';
      const url = id ? `/api/hotels/${id}` : '/api/hotels';
      await axiosInstance[method](url, hotelData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Hotel details saved successfully');
      navigate('/hotels');
    } catch (error) {
      alert('Failed to save hotel details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Hotel' : 'Create Hotel'}</h1>
        <input
          type="text"
          placeholder="Hotel Name"
          value={hotelData.name}
          onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={hotelData.location}
          onChange={(e) => setHotelData({ ...hotelData, location: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price per Night"
          value={hotelData.pricePerNight} // Updated to match backend field
          onChange={(e) => setHotelData({ ...hotelData, pricePerNight: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={hotelData.description}
          onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Available Rooms"
          value={hotelData.availableRooms} // Added availableRooms field
          onChange={(e) => setHotelData({ ...hotelData, availableRooms: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Saving...' : 'Save Hotel'}
        </button>
      </form>
    </div>
  );
};

export default HotelForm;
