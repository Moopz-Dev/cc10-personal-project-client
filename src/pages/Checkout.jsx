import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { emptyCartItems } from "../apis/cart";
import { applyCoupon, getUserAddress, updateUserAddress } from "../apis/user";
import { CartContext } from "../contexts/CartContext";
import { ToastContext } from "../contexts/ToastContext";
import ReactQuill from "react-quill";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
	const { cart, setCart } = useContext(CartContext);
	const [coupon, setCoupon] = useState("");
	const [discount, setDiscount] = useState(0);
	const { setMessage } = useContext(ToastContext);
	const { setError } = useContext(ErrorContext);
	const { user } = useContext(AuthContext);
	const [address, setAddress] = useState("");
	const navigate = useNavigate();

	const getTotal = () => {
		return cart.reduce((acc, item) => {
			return acc + item.Product.price * item.amount;
		}, 0);
	};
	const handleEmptyCart = () => {
		if (window.confirm("Are you sure you want to empty your cart?")) {
			emptyCartItems();
			setMessage("Your cart has been emptied.");
		}
	};

	const saveAddressToDb = () => {
		updateUserAddress(address)
			.then(res => setMessage("Your address has been saved"))
			.catch(err => console.log(err));
	};

	const loadAddress = async () => {
		getUserAddress().then(res => setAddress(res.data.address));
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
		navigate("/user/payment");
	};

	useEffect(() => {
		loadAddress();
	}, []);

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
						<button
							className="btn btn-primary mt-2"
							disabled={!address || address.length < 20}
							onClick={saveAddressToDb}>
							Save
						</button>
						<hr />
						<h4>Got Coupon?</h4>
						<br />
						<input
							type="text"
							value={coupon}
							onChange={e => setCoupon(e.target.value)}
							className="form-control"
						/>
						<button
							onClick={applyDiscountCoupon}
							disabled={coupon.length < 5}
							className="btn btn-primary mt-3">
							Apply
						</button>
					</div>

					<div className="col-md-6 p-5">
						<h4 className="p-3">Order Summary</h4>
						<hr />
						<div className="bg-white rounded p-3">
							<h5 className="p-4 py-2">Products : {cart.length}</h5>
							<hr />
							<div className="px-4">
								{cart.map(item => (
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
						</div>
						<div className="row p-auto mt-3">
							<div className="col-md-6  d-flex justify-content-center">
								<button
									className="btn btn-primary"
									disabled={!address || address.length < 20}
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
