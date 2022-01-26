import React, { useState, useContext, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getSomeProduct } from "../../../apis/product";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { deleteProduct } from "../../../apis/product";
import { ToastContext } from "../../../contexts/ToastContext";

function AllProducts() {
	const [products, setProducts] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setMessage } = useContext(ToastContext);
	useEffect(() => {
		loadAllProducts();
	}, []);
	const loadAllProducts = () => {
		setLoading(true);
		getSomeProduct(100)
			.then(res => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};
	const handleRemove = slug => {
		if (
			window.confirm(
				"Delete this product? All associated images and cart items will also be deleted."
			)
		) {
			deleteProduct(slug)
				.then(res => {
					loadAllProducts();
					setMessage("Successfully deleted.");
				})
				.catch(err => {
					setError(err.response.data.message);
				});
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<div className="row">
						{loading || <h4>All Products</h4>}
						{products.map(item => (
							<div className="col-md-4 my-2" key={item.id}>
								<AdminProductCard product={item} handleRemove={handleRemove} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllProducts;
