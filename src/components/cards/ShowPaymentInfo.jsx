import React, { useState, useRef, useContext } from "react";
import { Modal } from "bootstrap";
import Interweave from "interweave";
import SlipUpload from "../forms/SlipUpload";

function ShowPaymentInfo({
	order,
	showStatus = true,
	handleCancel,
	setOrders,
	loadOrders,
}) {
	const { discount, OrderItems, id, status, address, tracking } = order;
	const [modal, setModal] = useState(null);
	const modalEl = useRef();
	const getTotal = () => {
		const newTotal = OrderItems.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		return newTotal;
	};
	const togglePaymentModal = () => {
		const modalObject = new Modal(modalEl.current);
		setModal(modalObject);
		modalObject.show();
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
										<button
											className="ms-4 btn btn-primary btn-sm"
											onClick={togglePaymentModal}>
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
				<div className="p-2 ps-4">
					{/* {JSON.stringify(address)} */}
					<Interweave content={address} />
				</div>
			</div>
			<div className="modal" ref={modalEl}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title text-center">
								Upload your Payment Slip
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start">
							<p>
								Please transfer an amount of $$$ to one of the following bank
								account.
							</p>
							<ul>
								<li>K-BANK Account: 030-1122334</li>
								<li>S-BANK Account: 133-6622334</li>
								<li>B-BANK Account: 888-4433221</li>
							</ul>
							<p>Once completed, upload the payment slip using this form.</p>
							<br />
							<SlipUpload
								order={order}
								setOrders={setOrders}
								loadOrders={loadOrders}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ShowPaymentInfo;
