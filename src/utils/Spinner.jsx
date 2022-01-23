import React from "react";

export default function Spinner() {
	return (
		<div
			className="d-flex justify-content-center align-items-center offcanvas-backdrop show"
			style={{ zIndex: 1100 }}>
			<div
				className="spinner-border fs-1 text-warning"
				style={{ width: "3rem", height: "3rem" }}></div>
			<span className="text-warning ms-4">Now Loading</span>
		</div>
	);
}
