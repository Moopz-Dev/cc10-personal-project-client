import { useEffect, useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../apis/stripe";
import { ErrorContext } from "../contexts/ErrorContext";
import { Link } from "react-router-dom";
import { BsCheck, BsCashCoin } from "react-icons/bs";
import Placeholder from "../images/ProductPlaceholder.jpg";

function StripeCheckout() {
	const { setError } = useContext(ErrorContext);
	const [clientSecret, setClientSecret] = useState("");
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [disabled, setDisabled] = useState(true);

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		createPaymentIntent()
			.then(res => {
				setClientSecret(res.data.clientSecret);
			})
			.catch(err => console.log(err));
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value,
				},
			},
		});
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			console.log(JSON.stringify(payload, null, 4));
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};

	const handleChange = async e => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	const cartStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};

	return (
		<>
			{/* {!succeeded && (
				<div>
					{coupon && totalAfterDiscount !== undefined ? (
						<p className="alert alert-success">
							{" "}
							{`total after discount: $ ${totalAfterDiscount}`}{" "}
						</p>
					) : (
						<p className="alert alert-danger"> No coupon applied </p>
					)}
				</div>
			)} */}

			<div className=" row p-2 m-5 bg-light border-top border-bottom ">
				<div className="col-md-6">
					<BsCashCoin className="text-info" /> <br /> Total: $ (Order Total)
				</div>
				<div className="col-md-6">
					<BsCheck className="text-info" /> <br /> Total Payable: $
					(payable/100).toFixed(2)
				</div>
			</div>

			<form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
				<CardElement
					id="card-element"
					options={cartStyle}
					onChange={handleChange}
				/>
				<button
					className="stripe-button"
					disabled={processing || disabled || succeeded}>
					<span id="button-text">
						{processing ? <div className="spinner" id="spinner"></div> : "Pay"}
					</span>
				</button>
				<p className={succeeded ? "result-message" : "result-message hidden"}>
					Payment Successful.
					<Link to="user/history"> See it in your purchase history.</Link>
				</p>
			</form>
		</>
	);
}

export default StripeCheckout;
