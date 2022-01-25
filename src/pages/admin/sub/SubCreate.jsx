import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPen, BsTrash } from "react-icons/bs";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";

import { getAllCategory } from "../../../apis/category";
import {
	createSubCategory,
	getAllSubCategory,
	deleteSubCategory,
} from "../../../apis/sub";
import CategoryForm from "../../../components/nav/forms/CategoryForm";
import LocalSearch from "../../../components/nav/forms/LocalSearch";

function SubCreate() {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [subs, setSubs] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState("");

	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);

	useEffect(() => {
		loadCategory();
		loadSubs();
	}, []);

	const loadCategory = () => {
		getAllCategory().then(res => setCategories(res.data));
	};

	const loadSubs = () => {
		getAllSubCategory().then(res => setSubs(res.data));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await createSubCategory(name, category);
			setLoading(false);
			setName("");
			setMessage(res.data.name + " subcategory has been created.");
			loadSubs();
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	const handleDelete = async slug => {
		let answer = window.confirm("Confirm deleting " + slug + "?");
		setLoading(true);
		if (answer) {
			try {
				await deleteSubCategory(slug);
				setLoading(false);
				setMessage("Subcategory " + slug + " deleted.");
				loadSubs();
			} catch (err) {
				setLoading(false);
				setError(err.response.data.message);
			}
		}
	};

	const searched = keyword => item => item.name.toLowerCase().includes(keyword);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h4>Create Subcategory</h4>

					<div className="form-group">
						<label>Parent Category</label>
						<select
							name="category"
							className="form-select"
							onChange={e => setCategory(e.target.value)}>
							<option value="">Please Select Category</option>
							{categories.length > 0 &&
								categories.map(item => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
						</select>
					</div>
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					<hr />

					{subs.filter(searched(keyword)).map(item => (
						<div className="alert alert-secondary" key={item.id}>
							{item.name}

							<span
								role="button"
								onClick={() => handleDelete(item.slug)}
								className="float-end mx-2">
								<BsTrash className="text-danger" />
							</span>
							<Link to={"/admin/sub/" + item.slug}>
								<span className="float-end mx-2">
									<BsPen className="text-warning" />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SubCreate;
