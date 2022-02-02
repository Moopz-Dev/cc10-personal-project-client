import React, { useContext, useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import DatePicker from "react-datepicker";
import { BsTrash } from "react-icons/bs";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { createCoupon, deleteCoupon, getCoupon } from "../../../apis/coupon";
import { ToastContext } from "../../../contexts/ToastContext";
import { ErrorContext } from "../../../contexts/ErrorContext";
// import {} from

function CreateCoupon() {
	const [coupons, setCoupons] = useState([]);
	const [couponCode, setCouponCode] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [discount, setDiscount] = useState(0);
	const { setLoading } = useContext(LoadingContext);
	const { setMessage } = useContext(ToastContext);
	const { setError } = useContext(ErrorContext);
	useEffect(() => {
		setLoading(true);
		loadCoupons();
		setLoading(false);
	}, []);

	const loadCoupons = () => {
		getCoupon().then(res => setCoupons(res.data));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		createCoupon({ couponCode, expiryDate, discount })
			.then(res => {
				setMessage("coupon successfully created.");
				loadCoupons();
			})
			.catch(err => setError(err.message));
		setLoading(false);
	};

	const handleRemove = id => e => {
		if (window.confirm("Delete this coupon?")) {
			setLoading(true);
			console.log(id);
			deleteCoupon(id)
				.then(res => {
					setMessage("Coupon Deleted");
					loadCoupons();
				})
				.catch(err => setError("Delete attempt failed."));
			setLoading(false);
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2 p-3">
					<AdminNav />
				</div>
				<div className="col-md-10 p-4">
					<h4>Coupon</h4>
					<form onSubmit={handleSubmit}>
						<div className="form-group my-3">
							<label className="text-muted">CouponCode</label>
							<input
								type="text"
								className="form-control"
								value={couponCode}
								onChange={e => setCouponCode(e.target.value.toUpperCase())}
								autoFocus
								required
							/>
						</div>
						<div className="form-group my-3">
							<label className="text-muted">Discount %</label>
							<input
								type="number"
								min="0"
								className="form-control"
								value={discount}
								onChange={e => setDiscount(e.target.value)}
								required
							/>
						</div>
						<div className="form-group my-3">
							<label className="text-muted ">Expiry Date</label>
							<DatePicker
								className="text-center"
								selected={new Date()}
								value={expiryDate}
								placeholderText="Set Date Here"
								onChange={date => setExpiryDate(date)}
								required
							/>
						</div>
						<button className="btn btn-outline-primary">Save</button>
					</form>
					<br />
					{coupons && <h4>{coupons.length} Coupons</h4>}

					<table className="table table-bordered">
						<thead className="thead-light ">
							<tr className="text-center table-dark">
								<th scope="col"> CODE</th>
								<th scope="col"> EXPIRY DATE</th>
								<th scope="col"> DISCOUNT</th>
								<th scope="col"> ACTION</th>
							</tr>
						</thead>
						<tbody>
							{coupons.map(item => (
								<tr key={item.id} className="">
									<td>{item.couponCode}</td>
									<td>{new Date(item.expiryDate).toLocaleDateString()}</td>
									<td className="text-center">{item.discount} %</td>
									<td className="text-center">
										<BsTrash
											role="button"
											onClick={handleRemove(item.id)}
											className="text-danger "
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CreateCoupon;
