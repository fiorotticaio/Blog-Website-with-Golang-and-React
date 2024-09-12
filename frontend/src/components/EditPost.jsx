import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TiUpload } from "react-icons/ti";


const CreateBlog = () => {
	const [image, setImage] = useState();
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState();
	
	const [imageUpload, setImageUpload] = useState();

	const { id } = useParams();
	
	const navigate = useNavigate();
	const { register, handleSubmit, setValue, formState: { errors },} = useForm();

	async function fetchPostData(){
		const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${id}`, {withCredentials:true})
		setValue("title", response?.data?.data.title)
		setValue("desc", response?.data?.data.desc)
		setImage(response?.data?.data.image)
	}

	useEffect(() => {
		const User = localStorage.getItem("user");
		const parseUser = JSON.parse(User);
		setUserData(parseUser);
		fetchPostData();
		
		if (!User) {
			navigate("/login");
		}
	}, [loading]);

	const onSubmit = async (data) => {
		setLoading(true);

		const imageUrl = await uploadImage()

		const body = {
			...data,
			image: imageUrl,
			user_id: userData.id.toString(),
		};

		axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updatepost/${id}`,{...body}, {withCredentials: true})
			.then(function(response) {
				setLoading(false);
				navigate("/personal");
			})
			.catch(function(error) {
				setLoading(false);
			})
	}

	const handleImage = (e) => {
		setImageUpload(e.target.files[0]);
		
		const reader = new FileReader();
		reader.onloadend = function () {
			let image = { [e.target.name]: reader.result }
			setImage(image.image);
		};
		
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			e.target.value = null;
		}
	}

	const uploadImage = async () => {
		let formData = new FormData(); 

		formData.append("image", imageUpload);
		formData.append("name", imageUpload.name);

		const config = {
			headers: { "content-type": "multipart/form-data" },
			withCredentials: true,
		};
		
		const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/upload-image`, formData, config)
		const imageUrlUploaded = response?.data?.url
		return imageUrlUploaded
	}

	return (
		<>
			<div className="mx-auto w-[600px] p-5">
				<div className="text-center mb-16">
					<p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
						Updating your Blog
					</p>
					<h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
						Make changes to your <span className="text-indigo-600">Post</span>
					</h3>
				</div>

				<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-wrap mb-6">
						<div className="w-full md:w-full px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
								Title
							</label>
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-gray-500 focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="title"
								name="title"
								autoComplete="off"
								{...register("title", {
									required: true,
								})}
							/>
							{errors.title && errors.title.type === "required" && (
								<p className="text-red-500 text-xs italic">
									Title can't be empty
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-wrap items-center lg:items-start mb-6">
						<div className="w-full px-3">
							<label title="Send image" className="cursor-pointer">
								<input accept="image/*" className="hidden" id="banner" type="file" name="image" onChange={handleImage} visibility="hidden" />

								<div className="flex flex-col">
									<div className="pb-2">Upload Image</div>

									{image ? (
										<div className="w-48 h-48 flex justify-center items-center text-gray-500 rounded bg-gray-200 overflow-hidden">
											<img src={image ? image : "golangerror.jpg"} alt="Image uploaded" />
										</div>
									) : (
										<div className="w-48 h-48 flex justify-center items-center text-[40pt] text-gray-500 rounded bg-gray-200">
											<TiUpload />
										</div>
									)}
								</div>
							</label>
						</div>
					</div>

					<div className="flex flex-wrap mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
								Description
							</label>
							<textarea
								rows="10"
								name="desc"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								{...register("desc", {
									required: true,
								})}></textarea>

							{errors.desc && errors.desc.type === "required" && (
								<p className="text-red-500 text-xs italic">
									Please fill out this field.
								</p>
							)}
						</div>
						<div className="flex justify-between w-full px-3">
							<button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
								type="submit" disabled={loading ? true : false}>
								{loading ? "Loading..." : "Update Post"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateBlog;
