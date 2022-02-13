import React from "react";
import { useContext } from "react";
import Resizer from "react-image-file-resizer";
import axios from "../../config/axios";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useState } from "react";
import { updateOrderPayment } from "../../apis/user";

function SlipUpload({ order, loadOrders }) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const [uploadedSlip, setUploadedSlip] = useState(order.paymentSlip);
	const fileUploadAndResize = e => {
		setLoading(true);

		const file = e.target.files[0];
		setUploadedSlip(e.target.files[0]);
		Resizer.imageFileResizer(file, 1024, 1024, "WEBP", 100, 0, uri => {
			axios
				.post("/uploadimages", { image: uri })
				.then(res => {
					// console.log("resData ", res);
					setUploadedSlip(res.data.imageUrl);
					updateOrderPayment(order.id, res.data.imageUrl);
					loadOrders();
					setLoading(false);
				})

				.catch(err => {
					setError(err.message);
					setLoading(false);
				});
		});
	};
	const handleImageRemove = imageUrl => {
		setLoading(true);
		axios
			.post("/removeimages", { imageUrl })
			.then(res => {
				updateOrderPayment(order.id, null);
				setLoading(false);
				loadOrders();
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	};

	return (
		<>
			{/* {JSON.stringify(order.id)} */}
			<div className="row">
				{uploadedSlip && (
					<div className=" d-inline col my-2 position-relative ">
						<img
							src={order.paymentSlip}
							className="img-thumbnail"
							alt="your payment slip will show here"
						/>
						<span
							className="position-absolute top-5 start-95 translate-middle badge rounded-pill bg-danger"
							role="button"
							onClick={() => handleImageRemove(order.paymentSlip)}>
							x
						</span>
					</div>
				)}
			</div>
			<div className="row px-5">
				{uploadedSlip !== null || (
					<label role="button" className="btn btn-primary ">
						Upload PAYMENT SLIP
						<input
							type="file"
							hidden
							accept="images/*"
							onChange={fileUploadAndResize}
						/>
					</label>
				)}
			</div>
		</>
	);
}

export default SlipUpload;
