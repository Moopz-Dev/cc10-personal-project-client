import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Search() {
	const { search, setSearch } = useContext(SearchContext);
	const { text } = search;
	const navigate = useNavigate();
	const handleSubmit = e => {
		e.preventDefault();
		navigate("/shop/?text=" + text);
	};
	const handleChange = e => {
		let newText = e.target.value;
		setSearch(prev => ({ ...prev, text: newText }));
	};
	return (
		<form className="d-flex my-2 my-lg-0" onSubmit={handleSubmit}>
			<input
				type="search"
				value={text}
				className="form-control me-3 "
				placeholder="Search"
				onChange={handleChange}
			/>
			<BsSearch onClick={handleSubmit} className="m-auto" role="button" />
		</form>
	);
}

export default Search;
