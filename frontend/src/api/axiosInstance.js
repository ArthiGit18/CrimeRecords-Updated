import axios from 'axios';

// Configure Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your server IP or domain, e.g., 'http://192.168.1.10:5000/api'
    timeout: 10000, // Optional timeout for requests
});

export default axiosInstance;
