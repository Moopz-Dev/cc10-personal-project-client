import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { Link } from "react-router-dom";
import { BsPen, BsTrash } from "react-icons/bs";
import { getAllCategory, getCategorySub } from "../../../apis/category";
import {
	createProduct,
	getAllProduct,
	deleteProduct,
} from "../../../apis/product";
// import CategoryForm from "../../../components/nav/forms/CategoryForm";
// import LocalSearch from "../../../components/nav/forms/LocalSearch";
import ProductCreateForm from "../../../components/nav/forms/ProductCreateForm";

const initialState = {
	title: "",
	description: "",
	price: "",
	categories: [],
	category: "",
	subs: [],
	sub: "",
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

function ProductCreate() {
	const [values, setValues] = useState(initialState);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setMessage } = useContext(ToastContext);

	useEffect(() => {
		loadCategory();
		if (values.category) {
			getCategorySub(values.category)
				.then(res => {
					setValues({ ...values, subs: res.data });
				})
				.catch(err => setError(err));
		}
	}, [values.category]);

	const loadCategory = () => {
		setLoading(true);
		getAllCategory().then(res =>
			setValues({ ...values, categories: res.data })
		);
		setLoading(false);
	};

	const handleSubmit = e => {
		setLoading(true);
		e.preventDefault();
		createProduct(values)
			.then(res => {
				setMessage("Product has been created.");
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
		console.log("...");
		setValues({ ...values, category: e.target.value });
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h4>Product Create</h4>
					<hr />
					<ProductCreateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						values={values}
					/>
					{JSON.stringify(values)}
				</div>
			</div>
		</div>
	);
}

export default ProductCreate;
