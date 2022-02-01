import React, { useContext } from "react";
import { BsEye, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import placeholder from "../../images/ProductPlaceholder.jpg";
import { CartContext } from "../../contexts/CartContext";
import { addCartItems, getCartItems } from "../../apis/cart";

function ProductCard({ product }) {
	const {
		title,
		price,
		slug,
		id,
		ProductImages: images,
		ProductRatings: ratings,
	} = product;

	const { setCart } = useContext(CartContext);

	const handleAddToCart = async e => {
		addCartItems(id)
			.then(res => getCartItems())
			.then(res => setCart(res.data));
	};

	return (
		<>
			<StarRating name={slug} ratings={ratings} />
			<div className="card rounded">
				<img
					src={images && images.length ? images[0].imageUrl : placeholder}
					className="card-img-top  img-fluid"
					alt={title}
					style={{ height: "250px", objectFit: "cover" }}
				/>
				<div className="card-body">
					<h6 className="card-title">{`${title && title.slice(0, 30)}`}</h6>
					<p className="card-text"> $ {price}</p>
					<hr />
					<div className=" d-flex">
						<Link
							to={"/product/" + slug}
							className="btn btn-warning col-md-5 m-auto">
							<BsEye className="pe-none" />
							<div className="text-capitalize">View Product</div>
						</Link>
						<div className="vr" />
						<button
							className="btn btn-danger col-md-5 m-auto "
							role="button"
							onClick={handleAddToCart}>
							<BsCart4 className="pe-none" />
							<div className="text-capitalize pe-none">Add to Cart</div>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductCard;
