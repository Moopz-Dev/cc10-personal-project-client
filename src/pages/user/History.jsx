import { useEffect, useState, useContext } from "react";
import { getOrders, cancelOrder } from "../../apis/user";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import UserNav from "../../components/nav/UserNav";
import OrderTable from "../../components/order/OrderTable";
import { ToastContext } from "../../contexts/ToastContext";

function History() {
	const { setMessage } = useContext(ToastContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = () => {
		getOrders().then(res => setOrders(res.data));
	};

	const handleCancel = id => {
		if (window.confirm("Cancel this order?")) {
			cancelOrder(id).then(res => {
				setMessage("Order Cancelled.");
				loadOrders();
			});
		}
	};

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col text-center p-4">
					<h4>
						{orders.length > 0 ? "Your Purchase Orders" : "no purchase orders"}
					</h4>
					{orders.map(item => (
						<div key={item.id} className="m-5 p-3 card">
							<ShowPaymentInfo
								order={item}
								setOrders={setOrders}
								handleCancel={handleCancel}
								loadOrders={loadOrders}
							/>

							<OrderTable order={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default History;
