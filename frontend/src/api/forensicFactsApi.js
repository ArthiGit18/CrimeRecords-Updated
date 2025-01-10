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


export const fetchForensicById = async (_id) => {
    try {
        const response = await axiosInstance.get(`/forensicfacts/${_id}`); // Make a GET request to fetch by ID
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching search entry by ID:', error);
        throw error;
    }
};
