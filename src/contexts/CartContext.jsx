import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { getCartItems } from "../apis/cart";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

function CartContextProvider({ children }) {
	const { user } = useContext(AuthContext);

	const [cart, setCart] = useState([]);
	useEffect(() => {
		loadCart();
	}, [user]);

	const loadCart = () => {
		if (user && user.role && user.role === "user") {
			getCartItems().then(res => setCart(res.data));
		}
	};

	return (
		<CartContext.Provider value={{ cart, setCart, loadCart }}>
			{children}
		</CartContext.Provider>
	);
}

export default CartContextProvider;

export { CartContext };
