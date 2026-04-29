import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createBooking = (data) => API.post('/bookings', data);
export const createEnquiry = (data) => API.post('/enquiries', data);
export const createContact = (data) => API.post('/contact', data);

export default API;