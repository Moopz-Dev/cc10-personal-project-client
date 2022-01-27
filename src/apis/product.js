import axios from "../config/axios";

export const getSomeProduct = async count => {
	return await axios.get("/products/" + count);
};

export const getOneProduct = async slug => {
	return await axios.get("/product/" + slug);
};

export const createProduct = async product => {
	return await axios.post("/product", {
		...product,
	});
};

export const updateProduct = async (slug, product) => {
	return await axios.put("/product/" + slug, { ...product });
};

export const deleteProduct = async slug => {
	return await axios.delete("/product/" + slug);
};

export const getAllProduct = async (order, asc, page) => {
	const ascOrDesc = asc ? "ASC" : "DESC";
	return await axios.post("/products/", { order, ascOrDesc, page });
};

export const getProductNumber = async () => {
	return await axios.get("/product/total");
};
