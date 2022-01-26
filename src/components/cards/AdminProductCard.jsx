import React from "react";

function AdminProductCard({ product }) {
	const { title, description, ProductImages: images } = product;
	return (
		<div className="card">
			<img
				src={images && images.length ? images[0].imageUrl : ""}
				className="card-img-top"
				alt={title}
				style={{ height: "150px", objectFit: "cover" }}
			/>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{product.description}</p>
				{/* <a href="/" className="btn btn-primary">
					Go somewhere
				</a> */}
			</div>
		</div>
	);
}

export default AdminProductCard;
