import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
function UserRoute() {
	const { user } = useContext(AuthContext);
	return (
		<Routes>
			{user ? (
				user.role === "admin" ? (
					<>
						<Route path="admin/dashboard" element={<AdminDashboard />} />
						<Route path="admin/category" element={<CategoryCreate />} />
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
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default UserRoute;
