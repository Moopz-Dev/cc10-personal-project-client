import React, { useState, useContext, useEffect } from "react";
import { getAllProduct, getProductNumber } from "../../apis/product";
import { LoadingContext } from "../../contexts/LoadingContext";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import Pagination from "../Pagination";

function BestSellers() {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [productNumber, setProductNumber] = useState(0);
	const { loading, setLoading } = useContext(LoadingContext);
	useEffect(() => {
		loadAllProducts();
	}, [page]);
	useEffect(() => {
		getProductNumber().then(res => setProductNumber(res.data.total));
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		getAllProduct("sold", false, page)
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
		<div className="container">
			{loading ? (
				<div className="row">
					<div className="col-md-4">
						<LoadingCard />
					</div>
					<div className="col-md-4">
						<LoadingCard />
					</div>
					<div className="col-md-4">
						<LoadingCard />
					</div>
				</div>
			) : (
				<div className="row">
					{products &&
						products.map(item => (
							<div key={item.id} className="col-md-4">
								<ProductCard product={item} />
							</div>
						))}
				</div>
			)}
			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-3 p-2">
					<Pagination
						page={page}
						setPage={setPage}
						productNumber={productNumber}
					/>
				</nav>
			</div>
		</div>
	);
}

export default BestSellers;
