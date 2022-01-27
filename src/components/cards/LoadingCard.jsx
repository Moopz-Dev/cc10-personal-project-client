import React from "react";
import placeholder from "../../images/ProductPlaceholder.jpg";

function LoadingCard() {
	return (
		<div className="card placeholder-glow" aria-hidden="true">
			<img
				src="..."
				className="card-img-top placeholder "
				alt="placeholder image"
				style={{ height: "250px", objectFit: "cover" }}
			/>
			<div className="card-body">
				<h5 className="card-title placeholder-glow">
					<span className="placeholder col-6"></span>
				</h5>
				<p className="card-text placeholder-glow">
					<span className="placeholder col-7"></span>
					<span className="placeholder col-4"></span>
					<span className="placeholder col-4"></span>
					<span className="placeholder col-6"></span>
					<span className="placeholder col-8"></span>
				</p>
				<div className="row">
					<a
						href="#"
						tabIndex="-1"
						className="btn btn-warning disabled placeholder col-5 m-auto"></a>
					<a
						href="#"
						tabIndex="-1"
						className="btn btn-danger disabled placeholder col-5 m-auto"></a>
				</div>
			</div>
		</div>
	);
}

export default LoadingCard;
