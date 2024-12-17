import axiosInstance from './axiosInstance'; // Assuming you have an axios instance set up

// Fetch search results based on the query
export const fetchSearchResults = async (query) => {
    try {
        const response = await axiosInstance.get('/search', { params: { q: query } });
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};

export const fetchSearchById = async (id) => {
    try {
        const response = await axiosInstance.get(`/search/${id}`); // Make a GET request to fetch by ID
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching search entry by ID:', error);
        throw error;
    }
};
