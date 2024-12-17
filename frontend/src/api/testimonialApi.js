import axiosInstance from './axiosInstance';

// Fetch all testimonials
export const fetchTestimonials = async () => {
    try {
        const response = await axiosInstance.get('/testimonials');
        return response.data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
};
