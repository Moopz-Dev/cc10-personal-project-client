import React from "react";
import { BsEye, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

import StarRating from "../StarRating";
import placeholder from "../../images/ProductPlaceholder.jpg";

function ProductCard({ product }) {
	const {
		title,
		description,
		slug,
		ProductImages: images,
		ProductRatings: ratings,
	} = product;
	return (
		<>
			<StarRating ratings={ratings} />
			<div className="card">
				<img
					src={images && images.length ? images[0].imageUrl : placeholder}
					className="card-img-top p-2"
					alt={title}
					style={{ height: "250px", objectFit: "cover" }}
				/>
				<div className="card-body">
					<h5 className="card-title">{`${title && title.slice(0, 30)}`}</h5>
					<p className="card-text">{`${
						description && description.slice(0, 40)
					}...`}</p>
					<hr />
					<div className=" d-flex">
						<Link
							to={"/product/" + slug}
							className="btn btn-warning col-md-5 m-auto">
							<BsEye />
							<div>View Product</div>
						</Link>
						<div className="vr" />
						<button
							className="btn btn-danger col-md-5 m-auto "
							// onClick={() => handleRemove(slug)}
						>
							<BsCart4 />
							<div>Add to Cart</div>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductCard;
