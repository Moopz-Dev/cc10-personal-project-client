import React from "react";

function OrderTable({ order }) {
	return (
		<table className="table table-bordered ">
			<thead className="thead-light">
				<tr className="text-center">
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Quantity</th>
				</tr>
			</thead>
			<tbody>
				{order &&
					order.OrderItems.map(item => (
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
	);
}

export default OrderTable;
