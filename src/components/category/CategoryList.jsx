import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../apis/category";
import { LoadingContext } from "../../contexts/LoadingContext";

function CategoryList() {
	const [categories, setCategories] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);
	useEffect(() => {
		setLoading(true);
		getAllCategory().then(res => {
			setCategories(res.data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="container">
			<div className="row">
				{loading ||
					categories.map(item => (
						<div
							key={item.id}
							className="col btn btn-outlined-primary btn-lg btn-block m-3">
							<Link
								className="text-decoration-none"
								to={"/category/" + item.slug}>
								{item.name}
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}

export default CategoryList;
