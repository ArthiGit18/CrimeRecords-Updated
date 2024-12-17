import axiosInstance from './axiosInstance';

// Fetch all About content
export const fetchAboutContent = async () => {
    try {
        const response = await axiosInstance.get('/about');
        return response.data;
    } catch (error) {
        console.error('Error fetching About content:', error);
        throw error;
    }
};
