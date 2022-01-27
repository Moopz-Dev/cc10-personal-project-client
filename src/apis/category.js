import axios from "../config/axios";

export const getAllCategory = async () => {
	return await axios.get("/category");
};

export const getOneCategory = async slug => {
	return await axios.get("/category/" + slug);
};

export const createCategory = async category => {
	return await axios.post("/category", { name: category });
};

export const updateCategory = async (slug, category) => {
	return await axios.put("/category/" + slug, { name: category });
};

export const deleteCategory = async slug => {
	return await axios.delete("/category/" + slug);
};

export const getCategorySub = async id => {
	return await axios.get("/category/sub/" + id);
};
