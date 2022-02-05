import React, { useEffect, useState } from "react";
import { getOrders } from "../../apis/user";
import UserNav from "../../components/nav/UserNav";

function History() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = () => {
		// getOrders().
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col">User History Page</div>
			</div>
		</div>
	);
}

export default History;
