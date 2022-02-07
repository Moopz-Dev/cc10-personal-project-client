import React from "react";
import Interweave from "interweave";

function ShowPaymentInfo({ order, showStatus = true, handleCancel }) {
	const { discount, OrderItems, id, status, address, tracking } = order;
	const getTotal = () => {
		const newTotal = OrderItems.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		return newTotal;
	};

	const trackUrl = "https://track.thailandpost.co.th/?trackNumber=";

	return (
		<>
			<div className="container text-start">
				<p className=" col-md-2">
					<span>ID No.: {id}</span>
				</p>

				<p className="col-md-3">
					Discount: {discount > 0 ? discount + " %" : "not applied"}
				</p>
				<div className=" col-md-3 d-flex justify-content-between">
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
				</div>
				<p className=" col-md-4  ">
					{showStatus && (
						<>
							{status === "UNPAID" && (
								<>
									<span className="badge bg-primary text-white">
										STATUS: {status}
									</span>
									<span>
										<button className="ms-4 btn btn-primary btn-sm">
											Pay now
										</button>
										<button
											className="ms-2 btn btn-danger btn-sm"
											onClick={() => handleCancel(id)}>
											Cancel
										</button>
									</span>
								</>
							)}
							{status === "UNPROCESSED" && (
								<>
									<span className="badge bg-warning text-white">
										STATUS: {status}
									</span>
									<span className="ms-4">Please wait...</span>
								</>
							)}
							{status === "DISPATCHED" && (
								<>
									<span className="badge bg-success text-white">
										STATUS: {status}
									</span>
									<span>
										<a
											href={trackUrl + tracking}
											target="_blank"
											className="ms-4 btn btn-warning btn-sm">
											TRACK YOUR ORDER
										</a>
									</span>
								</>
							)}
							{status === "CANCELLED" && (
								<>
									<span className="badge bg-danger text-white">
										STATUS: {status}
									</span>
								</>
							)}
						</>
					)}
				</p>
			</div>
			<div className="text-start bg-light p-2 mb-3">
				<h6>Delivery Address:</h6>
				<p className="p-2 ps-4">
					<Interweave content={address} />
				</p>
			</div>
		</>
	);
}

export default ShowPaymentInfo;
