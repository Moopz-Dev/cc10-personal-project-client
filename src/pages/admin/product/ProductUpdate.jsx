import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { useNavigate, useParams } from "react-router-dom";
import {
	getOneCategory,
	getAllCategory,
	getCategorySub,
} from "../../../apis/category";
import { updateProduct, getOneProduct } from "../../../apis/product";

import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
	title: "",
	description: "",
	price: "",
	category: "",
	subCategoryId: "",
	quantity: "",
	images: [],
	brands: [
		"ACER",
		"APPLE",
		"ASUS",
		"DELL",
		"GIGABYTE",
		"LG",
		"MICROSOFT",
		"PHILIPS",
		"SAMSUNG",
	],
	brand: "",
	colors: [
		"BLACK",
		"BROWN",
		"SILVER",
		"GOLD",
		"WHITE",
		"GREY",
		"BLUE",
		"GREEN",
	],
	color: "",
};

function ProductUpdate() {
	const [values, setValues] = useState(initialState);
	const [categories, setCategories] = useState({});
	const [subs, setSubs] = useState({});
	const { slug } = useParams();
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setMessage } = useContext(ToastContext);

	useEffect(() => {
		loadProduct();
	}, []);

	useEffect(() => {
		loadCategory();
	}, []);

	useEffect(() => {
		if (values.category) {
			loadSubs();
		}
	}, [values.category]);

	const loadProduct = () => {
		getOneProduct(slug).then(res =>
			setValues({
				...values,
				...res.data,
				category: res.data.SubCategory.categoryId,
				subCategoryId: res.data.SubCategory.id,
				images: res.data.ProductImages,
			})
		);
	};

	const loadCategory = async () => {
		try {
			const categories = await getAllCategory();
			setCategories(categories.data);
			if (values.category) {
			}
		} catch (error) {
			setError(error);
		}
	};

	const loadSubs = async () => {
		try {
			const subs = await getCategorySub(values.category);
			setSubs(subs.data);
		} catch (error) {
			setError(error);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		updateProduct(slug, values)
			.then(res => {
				setMessage("Product has been Updated.");
				window.location.reload();
			})

			.catch(err => setError(err.response.data.message));
		setLoading(false);
	};

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = e => {
		e.preventDefault();
		setValues({ ...values, category: e.target.value, subCategoryId: "" });
	};
	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h4>Product Update</h4>
					<div className="p-3">
						<FileUpload values={values} setValues={setValues} />
					</div>

					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						values={values}
						categories={categories}
						subs={subs}
					/>

					{/* {JSON.stringify(values)} */}
					<hr />
				</div>
			</div>
		</div>
	);
}

export default ProductUpdate;
