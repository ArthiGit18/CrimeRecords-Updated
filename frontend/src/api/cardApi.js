import axiosInstance from './axiosInstance'; // Assuming you have axios instance set up

// Fetch all cards
export const fetchCards = async () => {
    try {
        const response = await axiosInstance.get('/cards');
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
};


export const fetchCardsById = async (_id) => {
    try {
        const response = await axiosInstance.get(`/cards/${_id}`); // Make a GET request to fetch by ID
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching search entry by ID:', error);
        throw error;
    }
};


