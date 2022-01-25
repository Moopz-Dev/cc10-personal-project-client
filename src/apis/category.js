import axios from "../config/axios";

export const getAllCategory = async () => {
	return await axios.get("/api/category");
};

export const getOneCategory = async slug => {
	return await axios.get("/api/category/" + slug);
};

export const createCategory = async category => {
	return await axios.post("/api/category", { name: category });
};

export const updateCategory = async (slug, category) => {
	return await axios.put("/api/category/" + slug, { name: category });
};

export const deleteCategory = async slug => {
	return await axios.delete("/api/category/" + slug);
};

export const getCategorySub = async id => {
	return await axios.get("/api/category/sub/" + id);
};
