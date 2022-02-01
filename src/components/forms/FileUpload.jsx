import React from "react";
import { useContext } from "react";
import Resizer from "react-image-file-resizer";
import axios from "../../config/axios";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ErrorContext } from "../../contexts/ErrorContext";

function FileUpload({ values, setValues }) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const fileUploadAndResize = e => {
		setLoading(true);
		const files = e.target.files;
		const allUploadedFiles = values.images;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(files[i], 1024, 1024, "WEBP", 100, 0, uri => {
					axios
						.post("/uploadimages", { image: uri })
						.then(res => {
							// console.log("resData ", res);
							allUploadedFiles.push(res.data);
							setValues({ ...values, images: allUploadedFiles });
						})
						.catch(err => setError(err.message));
				});
			}
		}
		setLoading(false);
	};
	const handleImageRemove = imageUrl => {
		setLoading(true);
		axios
			.post("/removeimages", { imageUrl })
			.then(res => {
				setLoading(false);
				const { images } = values;
				let filtered = images.filter(item => {
					return item.imageUrl !== imageUrl;
				});
				// console.log("resData ", res);

				setValues({ ...values, images: filtered });
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	};

	return (
		<>
			<div className="row">
				{values.images &&
					values.images.map(item => (
						<div
							className=" d-inline col-md-3 my-2 position-relative "
							key={item.url}>
							<img
								src={item.imageUrl}
								className="img-thumbnail"
								alt={item.imageUrl}
							/>
							<span
								className="position-absolute top-5 start-95 translate-middle badge rounded-pill bg-danger"
								role="button"
								onClick={() => handleImageRemove(item.imageUrl)}>
								x
							</span>
						</div>
					))}
			</div>
			<div className="row">
				<label role="button" className="btn btn-primary col-md-4 ">
					Choose Image File(s)
					<input
						type="file"
						multiple
						hidden
						accept="images/*"
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</>
	);
}

export default FileUpload;
