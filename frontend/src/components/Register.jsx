import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	const [message, setMessage] = useState();
	const [loading, setLoading] = useState(false);
	
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, } = useForm();
	
	const onSubmit = (data) => {
		setLoading(true);
		const body = {...data};
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, { ...body })
			.then(function (response) {
				setLoading(false);
				setMessage(response?.data?.message);
				localStorage.setItem("user", JSON.stringify(response?.data?.user));
				navigate("/login");
			})
			.catch(function (error) {
				setLoading(false);
				setMessage(error?.response?.data?.message);
			})

	};
	
	return (
		<div className="bg-gradient-to-b min-h-screen lg:min-h-screen  from-zinc-800 to-zinc-900">
			<div className="flex justify-center py-10 ">
				<div className="bg-white w-96 h-auto border border-gray-200 rounded-md">
					<h1 className="text-center pt-4 text-[#0c2650] text-lg font-bold">
						Sign up
					</h1>
					{message && (
						<div className="px-11 py-4">
							<div className="font-bold p-4 text-center text-red-500">
								{message}
							</div>
						</div>
					)}

					<div className="px-8">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="text-sm">First Name</div>
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										className="w-4 h-4"
									>
										<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</span>
								<input
									type="text"
									name="first_name"
									className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-full focus:bg-white focus:text-gray-900"
									placeholder="Enter your first name"
									autoComplete="on"
									{...register("first_name", {
										required: true,
									})}
								/>
								<div>
									{errors.first_name && errors.first_name.type === "required" && (
										<span role="alert" className="text-red-600 text-[10px] italic">
											First Name is required
										</span>
									)}
								</div>
							</div>
							<div className="pt-6 text-sm">Last Name:</div>
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
										<svg
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											className="w-4 h-4">
											<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</span>
								<input
									type="text"
									name="last_name"
									className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-full focus:bg-white focus:text-gray-900"
									placeholder="Enter your last name"
									autoComplete="on"
									{...register("last_name", {
										required: true,
									})}
								/>
								<div>
									{errors.last_name && errors.last_name.type === "required" && (
										<span role="alert" className="text-red-600 text-[10px] italic">
											Last Name is required
										</span>
									)}
								</div>
							</div>
							<div className="pt-6 text-sm">Email:</div>
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
										<svg
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											className="w-4 h-4"
										>
											<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</span>
								<input
									type="email"
									name="email"
									className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-full focus:bg-white focus:text-gray-900"
									placeholder="Enter your Email Address"
									autoComplete="on"
									{...register("email", {
										required: true,
									})}
								/>
								<div>
									{errors.email && errors.email.type === "required" && (
										<span
											role="alert"
											className="text-red-600 text-[10px] italic"
										>
											Email is required
										</span>
									)}
								</div>
							</div>
							<div className="pt-6 text-sm">Password:</div>
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<button
										type="submit"
										className="p-1 focus:outline-none focus:shadow-outline"
									>
										<svg
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											className="w-4 h-4"
										>
											<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</span>
								<input
									type="password"
									name="password"
									className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-full focus:bg-white focus:text-gray-900"
									placeholder="Enter your password"
									autoComplete="on"
									{...register("password", {
										required: true,
									})}
								/>
								<div>
									{errors.password && errors.password.type === "required" && (
										<span
											role="alert"
											className="text-red-600 text-[10px] italic"
										>
											Password is required
										</span>
									)}
								</div>
							</div>

							<div className="pt-6 text-sm">Phone No:</div>
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<button
										type="submit"
										className="p-1 focus:outline-none focus:shadow-outline"
									>
										<svg
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											className="w-4 h-4"
										>
											<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</span>
								<input
									type="number"
									name="phone"
									className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-full focus:bg-white focus:text-gray-900"
									placeholder="Enter your phone number"
									autoComplete="on"
									{...register("phone", {
										required: true,
									})}
								/>
								<div>
									{errors.phone && errors.phone.type === "required" && (
										<span
											role="alert"
											className="text-red-600 text-[10px] italic"
										>
											Phone No is required
										</span>
									)}
								</div>
							</div>
							<div className="mt-10">
								<button className={`w-full ${loading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-bold py-2 px-4 rounded`} 
									disabled={loading ? true : false}>
									
									{loading ? "Loading..." : "Sign up"}

								</button>
								<div className="text-center text-sm mt-1 mb-5">
									Already have an account? <span className="text-indigo-600 font-bold"><Link to="login">Login</Link></span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
