import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import {
	createCategory,
	getAllCategory,
	deleteCategory,
} from "../../../apis/category";

function CategoryCreate() {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = () => {
		getAllCategory().then(res => setCategories(res.data));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await createCategory(name);
			setLoading(false);
			setName("");
			setMessage(res.data.name + " category has been created.");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h4>Create Category</h4>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								className="form-control"
								value={name}
								onChange={e => setName(e.target.value)}
								autoFocus
								required
							/>
							<button className="btn btn-outlined-primary">Save</button>
						</div>
					</form>
					<hr />
					{JSON.stringify(categories)}
				</div>
			</div>
		</div>
	);
}

export default CategoryCreate;
