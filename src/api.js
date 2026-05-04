import axios from "axios";

const API = axios.create({
  baseURL: "https://stylebymk-back.onrender.com/api",
});

// Existing endpoints
export const createBooking = (data) => API.post("/bookings", data);
export const createEnquiry = (data) => API.post("/enquiries", data);
export const createContact = (data) => API.post("/contact", data);

// New M-Pesa payment endpoints
export const initiateMpesaPayment = (paymentData) =>
  API.post("/payments/stkpush", paymentData);
export const checkPaymentStatus = (checkoutRequestId) =>
  API.get(`/payments/status/${checkoutRequestId}`);

export default API;
