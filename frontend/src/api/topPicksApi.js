import axiosInstance from './axiosInstance';

// Fetch all Top Picks content
export const fetchTopPicks = async () => {
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching Top Picks:', error);
        throw error;
    }
};
