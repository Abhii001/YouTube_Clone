import axios from "axios";

// Base URL for the YouTube API
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

// Common request options
const options = {
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY, 
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  },
  params: {
    maxResults: '50',
  },
};

/**
 * Fetches data from the YouTube API.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<Object>} - The data retrieved from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};
