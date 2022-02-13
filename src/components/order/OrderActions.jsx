import React, { useRef } from "react";
import { Modal } from "bootstrap";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { updateTracking } from "../../apis/admin";
import { ToastContext } from "../../contexts/ToastContext";

function OrderActions({ item, handleStatusChange }) {
	const [tracking, setTracking] = useState("");
	const [status, setStatus] = useState("");
	const { setMessage } = useContext(ToastContext);
	const [modal, setModal] = useState(null);
	const modalEl = useRef();

	useEffect(() => {
		setStatus(item.status);
	}, [item]);

	const handleSubmitTracking = () => {
		updateTracking(item.id, tracking).then(res =>
			setMessage("Tracking info updated")
		);
	};
	const togglePaymentModal = () => {
		const modalObject = new Modal(modalEl.current);
		setModal(modalObject);
		modalObject.show();
	};

	return (
		<>
			<div className="row pb-3">
				<div className="col-md-1 my-auto">Order Status:</div>
				<div className="col-md-8">
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

				{status === "UNPAID" && (
					<div className="col-md-3">
						<button
							className="btn btn-block btn-danger"
							// onClick={() => handleCancel(id)}
						>
							Cancel
						</button>
					</div>
				)}
				{status === "UNPROCESSED" && (
					<>
						<div className="col">
							<button
								className="btn btn-block btn-info btn-sm"
								onClick={togglePaymentModal}>
								VIEW SLIP
							</button>
						</div>
						<div className="col">
							<button
								className="btn btn-block btn-danger btn-sm"
								// onClick={() => handleCancel(id)}
							>
								Cancel
							</button>
						</div>
					</>
				)}
				{status === "DISPATCHED" && (
					<>
						<div className="col-md-2">
							<input
								className="form-control"
								type="text"
								value={tracking}
								onChange={e => setTracking(e.target.value)}
								placeholder="Tracking No."
							/>
						</div>
						<button
							className=" col-md-1 btn btn-primary"
							onClick={handleSubmitTracking}>
							SUBMIT
						</button>
					</>
				)}
			</div>
			<div className="modal" ref={modalEl}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title text-center">
								View Customer's Payment Slip
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start">
							<div className="container">
								<img
									className="img-fluid"
									src={item.paymentSlip}
									alt="payment slip"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OrderActions;
