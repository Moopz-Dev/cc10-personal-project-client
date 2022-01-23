import React from "react";
import ReactDOM from "react-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ErrorContextProvider from "./contexts/ErrorContext";
import ToastContextProvider from "./contexts/ToastContext";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingContextProvider from "./contexts/LoadingContext";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorContextProvider>
				<LoadingContextProvider>
					<ToastContextProvider>
						<AuthContextProvider>
							<App />
						</AuthContextProvider>
					</ToastContextProvider>
				</LoadingContextProvider>
			</ErrorContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
