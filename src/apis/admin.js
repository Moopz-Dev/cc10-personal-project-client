import axios from "../config/axios";

export const getOrders = async () => {
	return await axios.get("/admin/order");
};

export const updateOrder = async (id, status) => {
	return await axios.put("/admin/order/" + id, { status });
};

export const updateTracking = async (id, tracking) => {
	return await axios.put("/admin/ordertrack/" + id, { tracking });
};
