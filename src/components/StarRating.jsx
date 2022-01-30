import React from "react";
import StarRatings from "react-star-ratings";

function StarRating({ ratings, name }) {
	const count = ratings && ratings.length;
	const sum =
		ratings &&
		ratings.reduce(
			(acc, item) => {
				return +acc + item.rating;
			},
			[0]
		);

	return (
		<div className=" text-center pt-1 pb-3">
			{ratings && count ? (
				<span>
					<StarRatings
						name={name}
						isSelectable={true}
						starDimension="20px"
						starSpacing="2px"
						starRatedColor="red"
						rating={sum / count}
					/>{" "}
					({count})
				</span>
			) : (
				<span className="text-secondary">No rating yet</span>
			)}
		</div>
	);
}

export default StarRating;
