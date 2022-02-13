import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategory, updateCategory } from "../../../apis/category";
import CategoryForm from "../../../components/forms/CategoryForm";

function CategoryUpdate() {
	const [name, setName] = useState("");

	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);

	const navigate = useNavigate();

	let { slug } = useParams();

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = () => {
		getOneCategory(slug).then(res => setName(res.data.name));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await updateCategory(slug, name);
			setLoading(false);
			setName("");
			setMessage(res.data.name + " category has been updated.");
			navigate("/admin/category");
			// loadCategory();
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h4>Update Category</h4>
					{
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>
					}
					<hr />
				</div>
			</div>
		</div>
	);
}

export default CategoryUpdate;
