import React from "react";

function CategoryForm({ handleSubmit, setName, name }) {
	return (
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
				<br />
				<button className="btn btn-outlined-primary">Save</button>
			</div>
		</form>
	);
}

export default CategoryForm;
