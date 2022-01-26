import React from "react";
import placeholder from "../../images/ProductPlaceholder.jpg";
import { BsPen, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminProductCard({ product, handleRemove }) {
	const { title, description, slug, ProductImages: images } = product;
	return (
		<div className="card">
			<img
				src={images && images.length ? images[0].imageUrl : placeholder}
				className="card-img-top"
				alt={title}
				style={{ height: "250px", objectFit: "cover" }}
			/>
			<div className="card-body">
				<h5 className="card-title">{`${title && title.slice(0, 30)}...`}</h5>
				<p className="card-text">{`${
					description && description.slice(0, 40)
				}...`}</p>
				<div className=" row mx-auto">
					<Link
						to={"/admin/product/" + slug}
						className="btn btn-outline-warning col-md-5 m-auto">
						<BsPen />
					</Link>
					<button
						className="btn btn-outline-danger col-md-5 m-auto "
						onClick={() => handleRemove(slug)}>
						<BsTrash />
					</button>
				</div>
			</div>
		</div>
	);
}

export default AdminProductCard;
