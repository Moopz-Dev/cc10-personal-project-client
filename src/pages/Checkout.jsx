import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { emptyCartItems } from "../apis/cart";
import { getUserAddress, updateUserAddress } from "../apis/user";
import { CartContext } from "../contexts/CartContext";
import { ToastContext } from "../contexts/ToastContext";
import ReactQuill from "react-quill";
import { AuthContext } from "../contexts/AuthContext";

function Checkout() {
	const { cart, setCart } = useContext(CartContext);
	const { setMessage } = useContext(ToastContext);
	const { user } = useContext(AuthContext);
	const [address, setAddress] = useState("aaaa");

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
						coupon input and apply button
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
						<p className="p-4 ps-5 bg-white rounded">
							Total : <b>$ {getTotal()}</b>
						</p>
						<div className="row p-auto">
							<div className="col-md-6  d-flex justify-content-center">
								<button
									className="btn btn-primary"
									disabled={!address || address.length < 20}>
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
