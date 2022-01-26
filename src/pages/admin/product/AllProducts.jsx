import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getSomeProduct } from "../../../apis/product";
import { useState } from "react";
import { useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { useEffect } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";

function AllProducts() {
	const [products, setProducts] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);
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
								<AdminProductCard product={item} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllProducts;
