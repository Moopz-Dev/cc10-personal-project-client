import { useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, updateOrder } from "../../apis/admin";
import { useEffect } from "react";
import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import Order from "../../components/order/Order";

function AdminDashboard() {
	const { setMessage } = useContext(ToastContext);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = () => {
		getOrders().then(res => setOrders(res.data));
	};

	const handleStatusChange = (id, status) => {
		if (window.confirm("Confirm status update")) {
			console.log(id);
			console.log(status);
			updateOrder(id, status).then(res => {
				setMessage("Order Status Updated");
				loadOrders();
			});
		}
	};

	return (
		<div className=" mt-5 container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className=" p-4 col-md-10">
					<h4>Admin Dashboard</h4>
					{orders && (
						<Order orders={orders} handleStatusChange={handleStatusChange} />
					)}
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
