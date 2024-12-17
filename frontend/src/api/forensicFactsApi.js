import axiosInstance from './axiosInstance';

// Fetch all Forensic Facts content
export const fetchForensicFacts = async () => {
    try {
        const response = await axiosInstance.get('/forensicfacts');
        return response.data;
    } catch (error) {
        console.error('Error fetching Forensic Facts:', error);
        throw error;
    }
};
