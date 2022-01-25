import React from "react";

function ProductCreateForm({
	handleSubmit,
	handleChange,
	handleCategoryChange,
	values,
	showSubs,
}) {
	const {
		title,
		description,
		price,
		categories,
		category,
		subs,
		subCategoryId,
		quantity,
		images,
		brands,
		colors,
		brand,
		color,
	} = values;
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					value={title}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					className="form-control"
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					className="form-control"
					value={price}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					value={quantity}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Color</label>
				<select name="color" className="form-select" onChange={handleChange}>
					<option>Please Select</option>
					{colors.map(item => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Brand</label>
				<select name="brand" className="form-select" onChange={handleChange}>
					<option>Please Select</option>
					{brands.map(item => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Category</label>
				<select
					name="category"
					className="form-select"
					onChange={handleCategoryChange}>
					<option value="">Please Select Category</option>
					{categories.length > 0 &&
						categories.map(item => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
				</select>
			</div>
			{category && (
				<div className="form-group">
					<label>Subcategory</label>
					<select
						name="subCategoryId"
						className="form-select"
						onChange={handleChange}>
						<option value="">Please Select Subcategory</option>
						{subs.length > 0 &&
							subs.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
					</select>
				</div>
			)}
			<button className="btn btn-outline-info">Save</button>
		</form>
	);
}

export default ProductCreateForm;
