import React from "react";

import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import OrderActions from "./OrderActions";
import OrderTable from "./OrderTable";
function Order({ orders, handleStatusChange }) {
	return (
		<>
			{orders.map(item => (
				<div key={item.id} className="card p-3 row pb-5 my-3">
					<ShowPaymentInfo order={item} showStatus={false} />
					<OrderActions item={item} handleStatusChange={handleStatusChange} />

					<OrderTable order={item} />
				</div>
			))}
		</>
	);
}

export default Order;
