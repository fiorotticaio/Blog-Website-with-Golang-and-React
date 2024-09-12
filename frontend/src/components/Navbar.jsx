import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
	const [userData, setUserData] = useState();
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	useEffect(() => {
		const User = localStorage.getItem("user");
		const parseUser = JSON.parse(User);
		setUserData(parseUser);
	}, []);
	return (
		<nav className="flex items-center justify-between flex-wrap bg-black font-bold p-6">

			<label className="lg:hidden cursor-pointer flex items-center px-3 py-2 border rounded text-white border-white hover:text-indigo-600 hover:border-white" htmlFor="menu-toggle">
				<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</label>
			
			<input className="hidden" type="checkbox" id="menu-toggle" />

			<div className="flex justify-between text-white w-full">
				<div className="w-full flex items-center gap-3" id="menu" >
					<img className="h-5 mr-2" src="favicon.svg"/>
					<a className="hover:text-indigo-600 transition-colors" href="/">Home</a>
					<a className="hover:text-indigo-600 transition-colors" href="/create">New Post</a>
					<a className="hover:text-indigo-600 transition-colors" href="/personal">My Posts</a>
				</div>

				<div className="flex">
					{userData ? (
						<a className="hover:text-indigo-600 transition-colors" href="#" onClick={logOut}>Logout</a>
					) : (
						<div className="flex gap-4">
							<a className="hover:text-indigo-600 transition-colors" href="/register" >Register</a>
							<a className="hover:text-indigo-600 transition-colors" href="/login">Login</a>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
