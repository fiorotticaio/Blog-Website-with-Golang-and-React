import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const [userData, setUserData] = useState();
	const [blogData, setBlogData] = useState();

	async function fetchPosts(){
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allpost`, {withCredentials: true})
			.then(function(response){
				setBlogData(response?.data?.data)
			}).catch(function(error) {
				console.log(error)
			})
	}
	
	useEffect(() => {
		const User = localStorage.getItem("user");
		const parseUser = JSON.parse(User);
		setUserData(parseUser);

		fetchPosts()
	}, []);

	return (
		<>
			<div className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center">
				<div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

				<main className="px-4 sm:px-6 lg:px-8 z-10">
					<div className="text-center">
						<h2 className="text-4xl tracking-tight leading-10 font-medium sm:text-5xl text-white sm:leading-none md:text-6xl">
							<span className="text-indigo-600 font-bold">
								Hi {userData?.first_name} {userData?.last_name},
							</span>{" "}
							welcome!
						</h2>
						<p className="mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
							lorem cupidatat commodo.
						</p>
						<div className="mt-5 sm:mt-8 sm:flex justify-center">
							<div className="rounded-md shadow">
								<a href="/create"
									className="w-full flex items-center justify-center border border-transparent text-base leading-6 font-regular rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:px-10">
									Create Post
								</a>
							</div>
							<div className="mt-3 sm:mt-0 sm:ml-3">
								<a href="/personal"
									className="w-full flex items-center justify-center border border-transparent text-base leading-6 font-regular rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:px-10">
									View My Post
								</a>
							</div>
						</div>
					</div>
				</main>
			</div>

			{blogData?.map((blog) => (
				<div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
					<article class="overflow-hidden rounded-lg shadow-lg">
						<a href={`/detail/${blog.id}`}>
							<img
								alt="Imagem do Post"
								class="block h-72 w-full"
								src={blog?.image}
							/>
						</a>

						<header class="flex items-center justify-between leading-tight p-2 md:p-4">
							<h1 class="text-lg">
								<a class="no-underline hover:underline text-black" href={`/detail/${blog.id}`}>
									{blog.title}
								</a>
							</h1>
							<p class="text-grey-darker text-sm">
								text <i class="fa fa-heart"></i>
							</p>
						</header>

						<footer class="flex items-center justify-between leading-none p-2 md:p-4">
							<a class="flex items-center no-underline hover:underline text-black" href={`/detail/${blog.id}`}>
								<img alt="Imagem do usuario" class="block rounded-full w-5 h-5" src={blog?.image}/>
								
								<p class="ml-2 text-sm">
									{blog?.user?.first_name} {blog?.user?.last_name}
								</p>
							</a>
							<a class="no-underline text-grey-darker hover:text-red-dark" href="#">
								<span class="hidden">Like</span>
								<i class="fa fa-heart"></i>
							</a>
						</footer>
					</article>
				</div>
			))}

			
		</>
	);
};

export default Home;
