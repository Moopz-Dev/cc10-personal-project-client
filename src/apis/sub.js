import axios from "../config/axios";

export const getAllSubCategory = async () => {
	return await axios.get("/api/sub");
};

export const getOneSubCategory = async slug => {
	return await axios.get("/api/sub/" + slug);
};

export const createSubCategory = async (name, categoryId) => {
	return await axios.post("/api/sub", { name, categoryId });
};

export const updateSubCategory = async (slug, name, categoryId) => {
	return await axios.put("/api/sub/" + slug, { name, categoryId });
};

export const deleteSubCategory = async slug => {
	return await axios.delete("/api/sub/" + slug);
};
