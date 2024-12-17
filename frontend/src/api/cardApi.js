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
