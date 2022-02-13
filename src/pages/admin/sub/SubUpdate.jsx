import React, { useState, useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";

import { getAllCategory } from "../../../apis/category";
import { getOneSubCategory, updateSubCategory } from "../../../apis/sub";
import CategoryForm from "../../../components/forms/CategoryForm";

function SubUpdate() {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);

	const [category, setCategory] = useState("");

	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);

	const navigate = useNavigate();

	let { slug } = useParams();

	useEffect(() => {
		loadCategory();
		loadSub();
	}, []);

	const loadCategory = () => {
		getAllCategory().then(res => setCategories(res.data));
	};

	const loadSub = () => {
		getOneSubCategory(slug).then(res => {
			setName(res.data.name);
			setCategory(res.data.categoryId);
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await updateSubCategory(slug, name, category);
			setLoading(false);
			setName("");
			setMessage(res.data.name + " subcategory has been updated.");
			navigate("/admin/sub");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
			console.log(err.response.data.message);
		}
	};

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h4>Update Subcategory</h4>

					<div className="form-group">
						<label>Parent Category</label>
						<select
							name="category"
							className="form-select"
							onChange={e => setCategory(e.target.value)}>
							<option value="">Please Select Category</option>
							{categories.length > 0 &&
								categories.map(item => (
									<option
										key={item.id}
										value={item.id}
										selected={item.id === category}>
										{item.name}
									</option>
								))}
						</select>
					</div>
					<br />
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<hr />
				</div>
			</div>
		</div>
	);
}

export default SubUpdate;
