import { useState, useEffect } from 'react'; 
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Tour = () => {
  const { user } = useAuth(); // Access user token from context
  const [tourData, setTourData] = useState({
    name: '',
    destination: '',
    price: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tour data from the backend
    const fetchTour = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/tours', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTourData({
          name: response.data.name,
          destination: response.data.destination,
          price: response.data.price,
          description: response.data.description,
        });
      } catch (error) {
        alert('Failed to fetch tour details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTour();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/tours', tourData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Tour details updated successfully!');
    } catch (error) {
      alert('Failed to update tour details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Tour Details</h1>
        <input
          type="text"
          placeholder="Tour Name"
          value={tourData.name}
          onChange={(e) => setTourData({ ...tourData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Destination"
          value={tourData.destination}
          onChange={(e) => setTourData({ ...tourData, destination: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={tourData.price}
          onChange={(e) => setTourData({ ...tourData, price: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={tourData.description}
          onChange={(e) => setTourData({ ...tourData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Updating...' : 'Update Tour Details'}
        </button>
      </form>
    </div>
  );
};

export default Tour;
