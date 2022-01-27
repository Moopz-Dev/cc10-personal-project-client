import React from "react";
import { PAGINATION_LIMIT } from "../config/env";

function Pagination({ page, setPage, productNumber }) {
	const pages = [];
	for (let i = 0; i < productNumber / PAGINATION_LIMIT; i++) {
		pages.push(i + 1);
	}
	return (
		<ul className="pagination justify-content-center gap-2">
			<li className={"page-item " + (page === 1 ? "disabled" : null)}>
				<a
					className="page-link"
					href="/"
					aria-label="Previous"
					onClick={e => {
						e.preventDefault();
						setPage(prev => prev - 1);
					}}>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			{pages &&
				pages.map(item => (
					<li className={"page-item " + (page === item ? "disabled" : null)}>
						<a
							className="page-link"
							href="/"
							onClick={e => {
								e.preventDefault();
								setPage(item);
							}}>
							{item}
						</a>
					</li>
				))}
			<li
				className={"page-item " + (page === pages.length ? "disabled" : null)}>
				<a
					className="page-link"
					href="/"
					aria-label="Next"
					onClick={e => {
						e.preventDefault();
						setPage(prev => prev + 1);
					}}>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	);
}

export default Pagination;
