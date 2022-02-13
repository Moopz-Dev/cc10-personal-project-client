import React, { useState } from "react";

function Tab({ product }) {
	const [activeTab, setActiveTab] = useState("desc");
	const { description } = product;
	const handleClick = e => {
		setActiveTab(e.target.value);
	};
	return (
		<>
			<ul className="nav nav-tabs border-0  ">
				<li className="nav-item">
					<button
						className={
							" nav-link  " + (activeTab === "desc" && "active border-white")
						}
						role="button"
						value="desc"
						onClick={handleClick}>
						Description
					</button>
				</li>
				<li className="nav-item">
					<button
						className={
							"nav-link " + (activeTab === "more" && "active border-white")
						}
						role="button"
						value="more"
						onClick={handleClick}>
						More
					</button>
				</li>
			</ul>
			<div className="container bg-white border-0 p-3 px-5 ">
				{activeTab === "desc" && description}
				{activeTab === "more" &&
					"Call us on 090-xxx-xxxx to learn more about this product."}
			</div>
		</>
	);
}

export default Tab;
