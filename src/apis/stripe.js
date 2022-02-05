import axios from "../config/axios";

export const createPaymentIntent = async () => {
	return axios.post("/create-payment-intent");
};
