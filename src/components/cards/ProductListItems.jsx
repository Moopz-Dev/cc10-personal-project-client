import React from "react";
import { Link } from "react-router-dom";

function ProductListItems({ product }) {
	const { price, category, SubCategory, color, brand, quantity, sold } =
		product;
	return (
		<div>
			<ul className="list-group">
				<li className="list-group-item border-0 d-flex">
					<span>Price</span> <span className="ms-auto"> $ {price}</span>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Category</span>
					<Link
						to={`/category/${SubCategory.Category.slug}`}
						className="ms-auto">
						{SubCategory.Category.name}
					</Link>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Subcategory</span>
					<Link to={`/sub/${SubCategory.slug}`} className="ms-auto">
						{SubCategory.name}
					</Link>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Color</span> <span className="ms-auto"> {color}</span>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Brand</span> <span className="ms-auto"> {brand}</span>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Available</span> <span className="ms-auto"> {quantity}</span>
				</li>
				<li className="list-group-item border-0 d-flex">
					<span>Sold</span> <span className="ms-auto"> {sold}</span>
				</li>
			</ul>
		</div>
	);
}

export default ProductListItems;
