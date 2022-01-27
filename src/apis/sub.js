import axios from "../config/axios";

export const getAllSubCategory = async () => {
	return await axios.get("/sub");
};

export const getOneSubCategory = async slug => {
	return await axios.get("/sub/" + slug);
};

export const createSubCategory = async (name, categoryId) => {
	return await axios.post("/sub", { name, categoryId });
};

export const updateSubCategory = async (slug, name, categoryId) => {
	return await axios.put("/sub/" + slug, { name, categoryId });
};

export const deleteSubCategory = async slug => {
	return await axios.delete("/sub/" + slug);
};
