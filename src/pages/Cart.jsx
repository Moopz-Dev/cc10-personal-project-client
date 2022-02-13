import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { ToastContext } from "../contexts/ToastContext";

function Cart() {
	const { cart } = useContext(CartContext);
	const { setMessage } = useContext(ToastContext);
	const getTotal = () => {
		return cart.reduce((acc, item) => {
			return acc + item.Product.price * item.amount;
		}, 0);
	};
	const navigate = useNavigate();
	const handleCreateOrder = () => {
		//create order
		navigate("/user/checkout");
	};
	return (
		<div className="container-fluid mt-5 pt-2">
			<div className="row"></div>

			<div className="row">
				<div className="col-md-8 p-3">
					<h3 className="p-3 pb-2 text-center"> Shopping Cart</h3>
					<h6 className="p-3 pt-2">
						You currently have {cart.length} products in your cart.
					</h6>
					{!cart.length ? (
						<p className="p-3">
							No products in cart. <Link to="/shop"> Continue Shopping </Link>
						</p>
					) : (
						<table className="table table-hover table-light">
							<thead className="table-dark">
								<tr>
									<th scope="col">Image</th>
									<th scope="col">Title</th>
									<th scope="col">Price</th>
									<th scope="col">Brand</th>
									<th scope="col">Color</th>
									<th scope="col">Amount</th>
									<th scope="col">Remove</th>
								</tr>
							</thead>
							{cart.map(item => (
								<ProductCardInCheckout product={item} key={item.id} />
							))}
						</table>
					)}
				</div>
				<div className="col-md-4 p-3">
					<h4 className="p-3">Order Summary</h4>
					<hr />
					<div className="bg-white rounded p-1">
						<h5 className="p-4 py-2">Products</h5>
						{cart.map((item, index) => (
							<div key={index} className="p-3 py-0">
								<p>
									{item.Product.title} x {item.amount} = ${" "}
									{item.Product.price * item.amount}
								</p>
							</div>
						))}
					</div>
					<hr />
					<p className="px-4">
						Total : <b>${getTotal()}</b>
					</p>
					<hr />
					<button
						className="btn btn-block btn-sm btn-primary"
						disabled={cart.length < 1}
						onClick={handleCreateOrder}>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Cart;
