import axios from "../config/axios";

export const updateUserAddress = async address => {
	return await axios.put("/user/address", { address });
};

export const getUserAddress = async address => {
	return await axios.get("/user/address");
};
