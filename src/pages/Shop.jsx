import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsBootstrap, BsBorderAll, BsCashCoin } from "react-icons/bs";
import {
	getSomeProduct,
	getProductsByFilter,
	getProductBrands,
} from "../apis/product";
import ProductCard from "../components/cards/ProductCard";
import { LoadingContext } from "../contexts/LoadingContext";
import { SearchContext } from "../contexts/SearchContext";
import { getAllCategory } from "../apis/category";

function Shop() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);
	const { search, setSearch } = useContext(SearchContext);
	const { text } = search;
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setLoading(true);
		loadProducts();
		loadCategories();
		loadBrands();
		setLoading(false);
	}, []);

	useEffect(() => {
		const delayed = setTimeout(() => {
			if (text && text.length >= 3) {
				getProductsByFilter(search).then(res => setProducts(res.data));
			}
		}, 1000);
		return () => clearTimeout(delayed);
	}, [text]);

	const loadProducts = () => {
		if (!searchParams.get("text"))
			getSomeProduct(12).then(res => {
				setProducts(res.data);
			});
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	const loadCategories = () => {
		getAllCategory().then(res => setCategories(res.data));
	};

	const loadBrands = () => {
		getProductBrands().then(res => setBrands(res.data));
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3 p-3">
					<form className="bg-white rounded py-2" onSubmit={handleSubmit}>
						<>
							<h6 className="text-secondary m-3">Search/Filter Products</h6>
							<div className="accordion">
								<div className="accordion-item border-0">
									<h2 className="accordion-header " id="headingOne">
										<button
											className="accordion-button text-secondary py-1"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="false"
											aria-controls="collapseOne">
											<BsCashCoin className=" m-2 me-4" /> Price Range
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne">
										<div className="accordion-body">
											<div className="input-group ">
												<input
													type="number"
													className="form-control py-2"
													placeholder="Min"
												/>

												<input
													type="number"
													className="form-control"
													placeholder="Max"
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="accordion-item border-0">
									<h2 className="accordion-header" id="headingTwo">
										<button
											className="accordion-button text-secondary py-1"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo">
											<BsBorderAll className=" m-2 me-4" /> Category
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse show"
										aria-labelledby="headingTwo">
										<div className="accordion-body">
											{categories &&
												categories.map(item => (
													<div
														key={item.id}
														value={item.id}
														className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															id={item.id}
														/>
														<label
															className="form-check-label"
															htmlFor={item.id}>
															{item.name}
														</label>
													</div>
												))}
										</div>
									</div>
								</div>

								<div className="accordion-item border-0">
									<h2 className="accordion-header" id="headingFour">
										<button
											className="accordion-button text-secondary py-1"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseFour"
											aria-expanded="false"
											aria-controls="collapseFour">
											<BsBootstrap className=" m-2 me-4" /> Brand
										</button>
									</h2>
									<div
										id="collapseFour"
										className="accordion-collapse collapse show"
										aria-labelledby="headingFour">
										<div className="accordion-body">
											{brands &&
												brands.map(item => (
													<div key={item} value={item} className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															id={item}
														/>
														<label className="form-check-label" htmlFor={item}>
															{item}
														</label>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className="row justify-content-around m-1 mt-2 bg-white">
								<div className="col-md-4">
									<button className="btn btn-outline-primary btn-sm btn-block">
										SUBMIT
									</button>
								</div>

								<div className="col-md-4">
									<button
										className="btn btn-outline-danger btn-sm btn-block"
										type="reset">
										clear
									</button>
								</div>
							</div>
						</>
					</form>
				</div>

				<div className="col-md-9">
					{!loading && (
						<>
							<h4 className="text-danger">
								{text ? "Your search results :" : "Products"}
							</h4>
							{products.length < 1 && <p>No products found</p>}
							<div className="row">
								{products &&
									products.map(item => (
										<div key={item.id} className="col-md-4 mt-3">
											<ProductCard product={item} />
										</div>
									))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Shop;