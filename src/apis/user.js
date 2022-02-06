import axios from "../config/axios";

// export const updateUserAddress = async address => {
// 	return await axios.put("/user/address", { address });
// };

// export const getUserAddress = async () => {
// 	return await axios.get("/user/address");
// };

export const applyCoupon = async couponCode => {
	return await axios.post("user/cart/coupon", { couponCode });
};

export const createOrder = async (couponCode = null, address) => {
	return await axios.post("user/order", { couponCode, address });
};

export const getOrders = async () => {
	return await axios.get("user/order");
};

export const cancelOrder = async id => {
	return await axios.delete("user/order/" + id);
};
