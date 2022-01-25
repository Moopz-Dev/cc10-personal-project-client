import axios from "../config/axios";

export const getAllProduct = async () => {
	return await axios.get("/api/product");
};

export const getOneProduct = async slug => {
	return await axios.get("/api/product/" + slug);
};

export const createProduct = async product => {
	return await axios.post("/api/product", {
		...product,
	});
};

export const updateProduct = async (slug, product) => {
	return await axios.put("/api/product/" + slug, { name: product });
};

export const deleteProduct = async slug => {
	return await axios.delete("/api/product/" + slug);
};
