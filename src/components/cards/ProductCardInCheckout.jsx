import React from "react";
import { useContext } from "react";
import { BsXLg } from "react-icons/bs";
import {
	getCartItems,
	updateCartItems,
	deleteCartItems,
} from "../../apis/cart";
import { CartContext } from "../../contexts/CartContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import placeholder from "../../images/ProductPlaceholder.jpg";

function ProductCardInCheckout({ product }) {
	const { setCart } = useContext(CartContext);
	const { setError } = useContext(ErrorContext);
	const handleQuantityChange = e => {
		if (e.target.value < 1) {
			e.target.value = 1;
		}
		if (e.target.value > product.Product.quantity) {
			setError(
				"We have only " +
					product.Product.quantity +
					" of this product in stock."
			);
			e.target.value = product.Product.quantity;
		}
		updateCartItems(product.id, e.target.value)
			.then(res => getCartItems())
			.then(res => setCart(res.data));
	};
	const handleRemove = e => {
		deleteCartItems(product.id)
			.then(res => getCartItems())
			.then(res => setCart(res.data));
	};

	return (
		<tbody>
			{product && (
				<tr className="align-middle">
					<td>
						<img
							src={
								product.Product.ProductImages.length > 0
									? product.Product.ProductImages[0].imageUrl
									: placeholder
							}
							className="img-fluid"
							style={{ maxWidth: 120 }}
							alt="product"
						/>
					</td>
					<td>{product.Product.title}</td>
					<td>{product.Product.price}</td>
					<td>{product.Product.brand}</td>
					<td>{product.Product.color}</td>
					<td className="text-center">
						<input
							type="number"
							className="form-control"
							min="1"
							max={product.Product.quantity}
							value={product.amount}
							onChange={handleQuantityChange}
						/>
					</td>
					<td>
						<div
							className="mx-3 text-danger"
							role="button"
							onClick={handleRemove}>
							<BsXLg />
						</div>
					</td>
				</tr>
			)}
		</tbody>
	);
}

export default ProductCardInCheckout;
