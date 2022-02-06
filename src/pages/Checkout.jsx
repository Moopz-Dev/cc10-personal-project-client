import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { emptyCartItems } from "../apis/cart";
import { applyCoupon, createOrder } from "../apis/user";
import { CartContext } from "../contexts/CartContext";
import { ToastContext } from "../contexts/ToastContext";
import ReactQuill from "react-quill";
// import { AuthContext } from "../contexts/AuthContext";
import { ErrorContext } from "../contexts/ErrorContext";
// import { useNavigate } from "react-router-dom";

function Checkout() {
	const { cart, setCart } = useContext(CartContext);
	const [coupon, setCoupon] = useState("");
	const [discount, setDiscount] = useState(0);
	const [total, setTotal] = useState(0);
	const [discountedTotal, setDiscountedTotal] = useState(0);
	const { setMessage } = useContext(ToastContext);
	const { setError } = useContext(ErrorContext);
	// const { user } = useContext(AuthContext);
	const [address, setAddress] = useState("");
	// const navigate = useNavigate();

	const getTotal = () => {
		const newTotal = cart.reduce((acc, item) => {
			return acc + item.Product.price * item.amount;
		}, 0);
		setTotal(newTotal);
	};

	const handleEmptyCart = () => {
		if (window.confirm("Are you sure you want to empty your cart?")) {
			emptyCartItems().then(res => setCart([]));
			setMessage("Your cart has been emptied.");
		}
	};

	const applyDiscountCoupon = () => {
		applyCoupon(coupon)
			.then(res => {
				setDiscount(res.data.discount);
				setMessage("Discount Applied");
			})
			.catch(err => {
				setError(err.response.data.message);
			});
	};

	const handlePlaceOrder = () => {
		let code = null;
		if (discountedTotal !== 0) {
			code = coupon;
		}

		createOrder(code, address)
			.then(res => {
				setMessage("Order Created");
				// navigate("/user/history");
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		getTotal();
	}, [cart]);

	useEffect(() => {
		setDiscountedTotal((total * (100 - discount)) / 100);
	}, [discount]);

	return (
		<div>
			{cart && (
				<div className="row">
					<div className="col-md-6 p-5">
						<h4>Delivery Address</h4>
						<br />
						<ReactQuill
							className=""
							theme="snow"
							value={address}
							onChange={setAddress}
						/>
						<br />
						{/* <button
							className="btn btn-primary mt-2"
							disabled={!address || address.length < 20}
							onClick={saveAddressToDb}>
							Save
						</button> */}
						<hr />
						<h4>Got Coupon?</h4>
						<br />
						<input
							type="text"
							value={coupon}
							onChange={e => setCoupon(e.target.value)}
							className="form-control"
						/>
						{discount ? (
							<button
								onClick={applyDiscountCoupon}
								disabled
								className="btn btn-success mt-3">
								Coupon Applied
							</button>
						) : (
							<button
								onClick={applyDiscountCoupon}
								disabled={coupon.length < 5 || discountedTotal}
								className="btn btn-primary mt-3">
								Apply
							</button>
						)}
					</div>
					<div className="col-md-6 p-5">
						<h4 className="p-3">Order Summary</h4>
						<hr />
						<div className="bg-white rounded p-3">
							<h5 className="p-4 py-2">Products : {cart.length}</h5>
							<hr />
							<div className="px-4">
								{cart.length > 0 &&
									cart.map(item => (
										<p key={item.id}>
											{item.Product.title}
											{`(${item.Product.color})`} x {item.amount}
											{" = "}
											{item.Product.price * item.amount}
										</p>
									))}
							</div>
						</div>
						<hr />
						<div className="p-4 ps-5 bg-white rounded">
							{discount ? (
								<p>
									<span>
										Total :{" "}
										<span className="text-decoration-line-through text-danger">
											$ {total}
										</span>
										<b>
											{`--->`} $ {discountedTotal}
										</b>
									</span>
								</p>
							) : (
								<p>
									Total : <b>$ {total}</b>
								</p>
							)}
						</div>
						<div className="row p-auto mt-3">
							<div className="col-md-6  d-flex justify-content-center">
								<button
									className="btn btn-primary"
									disabled={!address || address.length < 20 || cart.length < 1}
									onClick={handlePlaceOrder}>
									Place Order
								</button>
							</div>
							<div className="col-md-6 d-flex justify-content-center ">
								<button
									className="btn btn-danger"
									disabled={cart.length === 0}
									onClick={handleEmptyCart}>
									Empty Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Checkout;
