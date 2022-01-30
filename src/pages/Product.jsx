import React, { useState, useEffect, useContext } from "react";
import {
	getOneProduct,
	getOneProductRating,
	rateProduct,
	getRelatedProducts,
} from "../apis/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { ToastContext } from "../contexts/ToastContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { AuthContext } from "../contexts/AuthContext";
import ProductCard from "../components/cards/ProductCard";

const initialState = {
	title: "",
	description: "",
	price: "",
	category: "",
	SubCategory: { name: "", Category: { name: "" } },
	subCategoryId: "",
	quantity: "",
	images: [],
	brand: "",
	color: "",
};
function Product() {
	const [product, setProduct] = useState(initialState);
	const [userRating, setUserRating] = useState(0);
	const [related, setRelated] = useState({});
	const { slug } = useParams();
	const { user } = useContext(AuthContext);
	useEffect(() => {
		loadProduct();
		loadUserRating();
	}, [user]);

	const { setMessage } = useContext(ToastContext);
	const { setError } = useContext(ErrorContext);

	const changeRating = (newRating, name) => {
		setUserRating(newRating);
	};

	const submitRating = () => {
		rateProduct(slug, userRating)
			.then(res => setMessage("Thank you for your review."))
			.catch(err => {
				console.log("...");
				setError(err.response.data);
			});
		// loadProduct();
	};
	const loadProduct = () => {
		getOneProduct(slug).then(res => setProduct(res.data));
		getRelatedProducts(slug).then(res => setRelated(res.data));
	};

	const loadUserRating = () => {
		if (user) {
			getOneProductRating(slug).then(res => {
				setUserRating(res.data.rating);
			});
		}
	};

	return (
		<div className="container-fluid">
			<div className="row pt-4">
				<SingleProduct
					product={product}
					changeRating={changeRating}
					userRating={userRating}
					submitRating={submitRating}
				/>
			</div>
			<div className="row p-5">
				<div className="col text-center py-2">
					<hr />
					<h4>Related Products</h4>
					<hr />
				</div>
			</div>
			<div className="row pb-5">
				{related && related.length ? (
					related.map(item => (
						<div className="col-md-4" key={item.id}>
							<ProductCard product={item} />
						</div>
					))
				) : (
					<div className="text-center col">"No products found"</div>
				)}
			</div>
		</div>
	);
}

export default Product;
