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
	return await axios.put("/product/update/" + slug, { ...product });
};

export const deleteProduct = async slug => {
	return await axios.delete("/product/delete/" + slug);
};

export const getAllProduct = async (order, asc, page) => {
	const ascOrDesc = asc ? "ASC" : "DESC";
	return await axios.post("/products/", { order, ascOrDesc, page });
};

export const getProductNumber = async () => {
	return await axios.get("/product/total");
};

export const rateProduct = async (slug, star) => {
	return await axios.put("/product/star/" + slug, { star });
};

export const getOneProductRating = async slug => {
	return await axios.get("/star/" + slug);
};

export const getRelatedProducts = async slug => {
	return await axios.get("/related-products/" + slug);
};

export const getProductsBySearch = async args => {
	return await axios.post("/products/search", args);
};

export const getProductsByFilter = async args => {
	return await axios.post("/products/filter", args);
};

export const getProductBrands = async () => {
	return await axios.get("/brand");
};
