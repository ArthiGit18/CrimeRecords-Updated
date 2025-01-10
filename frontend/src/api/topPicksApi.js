import axiosInstance from './axiosInstance';

// Fetch all Top Picks content
export const fetchTopPicks = async () => {
    try {
        const response = await axiosInstance.get('/topPicks');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Top Picks:', error);
        throw error;
    }
};

export const fetchTopPicksById = async (id) => {
    try {
        const response = await axiosInstance.get(`/topPicks/${id}`); // Make a GET request to fetch by ID
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching search entry by ID:', error);
        throw error;
    }
};

