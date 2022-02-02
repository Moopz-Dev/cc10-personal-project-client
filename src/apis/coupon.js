import axios from "../config/axios";

export const getCoupon = async () => {
	return await axios.get("/coupon");
};

export const createCoupon = async coupon => {
	return await axios.post("/coupon", coupon);
};

export const deleteCoupon = async id => {
	return await axios.delete("/coupon/" + id);
};
