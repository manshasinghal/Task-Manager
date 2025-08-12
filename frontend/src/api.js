import axios from 'axios';

// Ensure we default to 4000 (backend) not 5000 (AirPlay service on macOS)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
// Debug log (remove later if desired)
// eslint-disable-next-line no-console
console.log('API base URL:', API_BASE_URL);

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`
});