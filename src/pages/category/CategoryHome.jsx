import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCategory } from "../../apis/category";
import Jumbotron from "../../components/cards/Jumbotron";
import ProductCard from "../../components/cards/ProductCard";
import { LoadingContext } from "../../contexts/LoadingContext";

function CategoryHome() {
	const [category, setCategory] = useState([]);
	const [products, setProducts] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);
	const { slug } = useParams();

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		try {
			const res = await getOneCategory(slug);
			setCategory(res.data);
			setLoading(false);
		} catch (error) {}
	};

	const countProducts = () => {
		let result = 0;
		if (category.SubCategories) {
			result = category.SubCategories.reduce(
				(acc, item) => {
					return +acc + item.Products.length;
				},
				[0]
			);
		}
		return result;
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					{loading || (
						<>
							<div className=" bg-secondary text-white  w-100 p-4  mx-auto my-4 ">
								<h4 className="text-center h-100 my-1 ">
									{" "}
									We currently have {category && countProducts()} products in "
									{category.name}" Category
								</h4>
							</div>
							{category.SubCategories &&
								category.SubCategories.map(item => (
									<div
										key={item.id}
										className="container bg-white rounded py-2 my-3">
										<div className="row">
											<div className="col-md-12 d-flex align-items-center justify-content-between">
												<h5 className="p-4 text-primary">{item.name} </h5>
												<h6 className="text-secondary ">
													{item.Products.length} products
												</h6>
											</div>

											{item.Products &&
												item.Products.map(item => (
													<div key={item.id} className="col-md-4">
														<ProductCard product={item} />
													</div>
												))}
										</div>
									</div>
								))}
						</>
					)}
				</div>
			</div>
			<div className="row">
				{products &&
					products.map(item => (
						<div className="col-4" key={item.id}>
							<ProductCard product={item} />
						</div>
					))}
			</div>
		</div>
	);
}

export default CategoryHome;
