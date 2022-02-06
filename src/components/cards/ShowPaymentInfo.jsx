import React from "react";

function ShowPaymentInfo({ order }) {
	const { discount, OrderItems, id, status } = order;
	const getTotal = () => {
		const newTotal = OrderItems.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		return newTotal;
	};

	return (
		<div className="row text-start">
			<p className=" col-md-2">
				<span>ID No.: {id}</span>
			</p>

			<p className="col-md-3">
				Discount: {discount > 0 ? discount + " %" : "not applied"}
			</p>
			<p className=" col-md-3 d-flex justify-content-between">
				<span>
					{discount > 0 ? (
						<p>
							<span>
								Total :{" "}
								<span className="text-decoration-line-through text-danger">
									$ {getTotal()}
								</span>
								<b>
									{`--->`} $ {(getTotal() * (100 - discount)) / 100}
								</b>
							</span>
						</p>
					) : (
						<p>
							Total : <b>$ {getTotal()}</b>
						</p>
					)}
				</span>
			</p>
			<p className=" col-md-4  ">
				<span className="badge bg-primary text-white">STATUS: {status}</span>
				{status === "UNPAID" && (
					<span>
						<button className="ms-4 btn btn-primary btn-sm">Pay now</button>
						<button className="ms-2 btn btn-danger btn-sm">Cancel</button>
					</span>
				)}
			</p>
		</div>
	);
}

export default ShowPaymentInfo;
