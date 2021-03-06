import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { REACT_APP_STRIPE_KEY } from "../config/env";
import "../stripe.css";
import StripeCheckout from "../components/StripeCheckout";

const promise = loadStripe(REACT_APP_STRIPE_KEY);

function Payment() {
	return (
		<div className="container p-5 text-center">
			<h4>Complete your Purchase</h4>
			<Elements stripe={promise}>
				<div className="col-md-8 offset-md-2">
					<StripeCheckout />
				</div>
			</Elements>
		</div>
	);
}

export default Payment;
