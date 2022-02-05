import axios from "../config/axios";

export const updateUserAddress = async address => {
	return await axios.put("/user/address", { address });
};

export const getUserAddress = async () => {
	return await axios.get("/user/address");
};

export const applyCoupon = async couponCode => {
	return await axios.post("user/cart/coupon", { couponCode });
};

export const createOrder = async couponCode => {
	return await axios.post("user/order", { couponCode });
};

export const getOrders = async () => {
	return await axios.get("user/order");
};
