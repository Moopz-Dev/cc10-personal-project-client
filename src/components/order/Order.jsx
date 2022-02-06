import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import OrderTable from "./OrderTable";
function Order({ orders, handleStatusChange }) {
	return (
		<>
			{orders.map(item => (
				<div key={item.id} className="card p-3 row pb-5 my-3">
					<ShowPaymentInfo order={item} showStatus={false} />
					<div className="row pb-3">
						<div className="col-md-2 m-auto">Order Status:</div>
						<div className="col-md-9">
							<select
								className="form-control"
								defaultValue={item.status}
								disabled={
									item.status === "CANCELLED" || item.status === "DISPATCHED"
								}
								onChange={e => handleStatusChange(item.id, e.target.value)}>
								<option value="UNPAID">UNPAID</option>
								<option value="UNPROCESSED">UNPROCESSED</option>
								<option value="DISPATCHED">DISPATCHED</option>
								<option value="CANCELLED">CANCELLED</option>
							</select>
						</div>
						<div className="col-md-1">
							<button
								className="btn btn-primary"
								disabled={
									item.status === "CANCELLED" || item.status === "DISPATCHED"
								}>
								OK
							</button>
						</div>
					</div>
					<OrderTable order={item} />
				</div>
			))}
		</>
	);
}

export default Order;
