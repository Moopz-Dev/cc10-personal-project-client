import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { ToastContext } from "../../../contexts/ToastContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { Link } from "react-router-dom";
import { BsPen, BsTrash } from "react-icons/bs";
import {
	createCategory,
	getAllCategory,
	deleteCategory,
} from "../../../apis/category";
import CategoryForm from "../../../components/nav/forms/CategoryForm";
import LocalSearch from "../../../components/nav/forms/LocalSearch";

function CategoryCreate() {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const { setMessage } = useContext(ToastContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);

	const [keyword, setKeyword] = useState("");

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
			loadCategory();
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
				await deleteCategory(slug);
				setLoading(false);
				setMessage("Category " + slug + " deleted.");
				loadCategory();
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
					<h4>Create Category</h4>
					{
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>
					}

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					<hr />

					{categories.filter(searched(keyword)).map(item => (
						<div className="alert alert-secondary" key={item.id}>
							{item.name}

							<span
								role="button"
								onClick={() => handleDelete(item.slug)}
								className="float-end mx-2">
								<BsTrash className="text-danger" />
							</span>
							<Link to={"/admin/category/" + item.slug}>
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

export default CategoryCreate;
