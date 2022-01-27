import React from "react";
import Typewriter from "typewriter-effect";

function Jumbotron({ text }) {
	return (
		<div className=" h-100 p-5 text-white bg-dark text-center">
			<div className="container-fluid py-5">
				<h1 className="display-5 fw-bold">
					<Typewriter
						options={{
							strings: text,
							autoStart: true,
							loop: true,
						}}
					/>
				</h1>
			</div>
		</div>
	);
}

export default Jumbotron;
