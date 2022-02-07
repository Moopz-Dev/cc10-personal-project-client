import React, { useState, useContext, useEffect } from "react";
import { getAllProduct } from "../apis/product";
import { LoadingContext } from "../contexts/LoadingContext";
// import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
// import LoadingCard from "../components/cards/LoadingCard";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";

function Home() {
	const [products, setProducts] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		getAllProduct("createdAt", false, 3)
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
		<>
			<Jumbotron
				text={[
					"Unleash the WEREWOLF Within !!!",
					"Thanks to www.advice.co.th for all product pictures",
					"The Hunt Begins !",
				]}
			/>
			<div className=" bg-secondary text-white  w-100 p-4  mx-auto my-4  ">
				<h4 className="text-center h-100 my-1 ">New Arrivals</h4>
			</div>
			<NewArrivals />
			<div className=" bg-secondary text-white  w-100 p-4  mx-auto my-4 ">
				<h4 className="text-center h-100 my-1 ">Best Sellers</h4>
			</div>
			<BestSellers />
			<div className=" bg-secondary text-white  w-100 p-4  mx-auto my-4 ">
				<h4 className="text-center h-100 my-1 ">Categories</h4>
			</div>
			<CategoryList />
		</>
	);
}

export default Home;
