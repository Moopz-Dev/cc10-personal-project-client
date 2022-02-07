import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { updateTracking } from "../../apis/admin";
import { ToastContext } from "../../contexts/ToastContext";

function OrderActions({ item, handleStatusChange }) {
	const [tracking, setTracking] = useState("");
	const [status, setStatus] = useState("");
	const { setMessage } = useContext(ToastContext);

	useEffect(() => {
		setStatus(item.status);
	}, [item]);

	const handleSubmitTracking = () => {
		updateTracking(item.id, tracking).then(res =>
			setMessage("Tracking info updated")
		);
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
				{(status === "UNPROCESSED " || status === "DISPATCHED") && (
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
		</>
	);
}

export default OrderActions;
