import React, { useEffect, useState } from "react";
import { getOrders } from "../../apis/user";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import UserNav from "../../components/nav/UserNav";

function History() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = () => {
		getOrders().then(res => setOrders(res.data));
	};

	const handleClickDownload = id => e => {
		e.preventDefault();
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col text-center p-4">
					<h4>
						{orders.length > 0 ? "User purchase Orders" : "no purchase orders"}
					</h4>
					{orders.map(item => (
						<div key={item.id} className="m-5 p-3 card">
							<ShowPaymentInfo order={item} />
							{/* {showOrderInTable(item)} */}
							<table className="table table-bordered ">
								<thead className="thead-light">
									<tr className="text-center">
										<th scope="col">Title</th>
										<th scope="col">Price</th>
										<th scope="col">Quantity</th>
									</tr>
								</thead>
								<tbody>
									{item.OrderItems.map(item => (
										<tr key={item.id}>
											<td>
												<b>{item.title}</b>
											</td>
											<td>$ {item.price}</td>
											<td>{item.quantity}</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* <div className="row">
								<div className="col">
									<button
										className="btn  btn-primary "
										onclick={handleClickDownload(item.id)}>
										Download Your Invoice Here
									</button>
								</div>
							</div> */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default History;
