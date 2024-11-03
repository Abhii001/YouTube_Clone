import { useEffect, useState } from "react";
import axios from "axios";

const useFetchVideos = (query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://youtube-v31.p.rapidapi.com/${query}`, {
          headers: {
            'x-rapidapi-key': 'd90c21b331msh2812c8770c24ff0p13bc88jsn657392f33ca4',
            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
          },
        });
        setData(response.data.items); // Assuming the data structure contains items
      } catch (err) {
        setError(err); // You might want to set a more user-friendly message here
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  return { data, error, loading };
};

export default useFetchVideos;
