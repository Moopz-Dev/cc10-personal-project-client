import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import History from "../pages/user/History";
import Password from "../pages/user/Password";
import Wishlist from "../pages/user/Wishlist";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CategoryCreate from "../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../pages/admin/category/CategoryUpdate";
import SubCreate from "../pages/admin/sub/SubCreate";
import SubUpdate from "../pages/admin/sub/SubUpdate";
import ProductCreate from "../pages/admin/product/ProductCreate";
import AllProducts from "../pages/admin/product/AllProducts";
import ProductUpdate from "../pages/admin/product/ProductUpdate";
function UserRoute() {
	const { user } = useContext(AuthContext);
	return (
		<Routes>
			{user ? (
				user.role === "admin" ? (
					<>
						<Route path="admin/dashboard" element={<AdminDashboard />} />
						<Route path="admin/category" element={<CategoryCreate />} />
						<Route path="admin/category/:slug" element={<CategoryUpdate />} />
						<Route path="admin/sub" element={<SubCreate />} />
						<Route path="admin/sub/:slug" element={<SubUpdate />} />
						<Route path="admin/product" element={<ProductCreate />} />
						<Route path="admin/products" element={<AllProducts />} />
						<Route path="admin/product/:slug" element={<ProductUpdate />} />
					</>
				) : (
					<>
						<Route path="user/history" element={<History />} />
						<Route path="user/password" element={<Password />} />
						<Route path="user/wishlist" element={<Wishlist />} />
					</>
				)
			) : (
				<>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</>
			)}
			<Route path="/" element={<Home />} />
			{/* <Route path="*" element={<Navigate to="/" />} /> */}
		</Routes>
	);
}

export default UserRoute;
