import axios from "../config/axios";

export const updateUserAddress = async address => {
	return await axios.put("/user/address", { address });
};

export const getUserAddress = async () => {
	return await axios.get("/user/address");
};

export const applyCoupon = async coupon => {
	return await axios.post("user/cart/coupon", { couponCode: coupon });
};
