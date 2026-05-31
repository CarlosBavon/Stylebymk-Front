import axios from "axios";

const API = axios.create({ baseURL: "https://stylebymk-back.onrender.com/api" });

export const createBooking = (data) => API.post("/bookings", data);
export const createEnquiry = (data) => API.post("/enquiries", data);
export const createContact = (data) => API.post("/contact", data);
export const createContact = (data) => API.post("/testimonials", data);

export default API;
