import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiUser } from "react-icons/ti";
import { formatDistance } from "date-fns";

const Home = () => {
	const [userData, setUserData] = useState();
	const [posts, setPosts] = useState();

	async function fetchPosts(){
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allpost`, {withCredentials: true})
			.then(function(response){
				setPosts(response?.data?.data)
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
			<div className="relative h-screen w-full flex items-center justify-center text-center bg-center">
				<div className="absolute top-0 right-0 bottom-0 left-0 -z-10" style={{ backgroundImage: "url(/hero.png)", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
				
				<main className="px-4 z-10">
					<div className="text-center">
						<h2 className="text-4xl tracking-tight leading-10 font-bold sm:text-5xl text-white sm:leading-none md:text-6xl">
							{userData ? (
								<p>Hi <span className="text-indigo-600">{userData?.first_name} {userData?.last_name}</span>, welcome!</p>
							):(
								<p>Hello, welcome!</p>
							)}
						</h2>
						<p className="my-10 text-white whitespace-nowrap italic">
						“The difference between stupidity and genius is that genius has its limits.” <span className="text-zinc-500"> – Albert Einstein</span>
						</p>
						<div className="mt-5 flex justify-center *:rounded-lg *:py-2 *:px-4 gap-3">
							<a href="/create" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out">
								Create Post
							</a>
							<a href="/personal" className="text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out">
								View My Post
							</a>
						</div>
					</div>
				</main>
			</div>

			<div className="flex flex-wrap gap-10 p-5 my-10">
				{posts?.map((post, idx) => (
					<div className="w-[400px] h-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300" key={idx}>
						<article className="overflow-hidden rounded-lg shadow-lg">
							<div className="h-[300px] overflow-hidden flex justify-center items-center">
								<a href={`/detail/${post.id}`}>
									<img alt="Imagem do Post" className="w-full" src={post?.image}/>
								</a>
							</div>
							<header className="flex items-center justify-between leading-tight p-2 md:p-4">
								<h1 className="text-lg">
									<a className="no-underline hover:underline text-black" href={`/detail/${post.id}`}>
										{post.title}
									</a>
								</h1>
								<p className="text-grey-darker text-sm">
									{formatDistance(new Date(post?.created_at), new Date(), { addSuffix: true })}
								</p>
							</header>

							<footer className="flex items-center justify-between leading-none p-2 md:p-4">
								<a className="flex items-center no-underline hover:underline text-black" href={`/detail/${post.id}`}>
									
									<TiUser size={20} />
									<p className="ml-2 text-sm">
										{post?.user?.first_name} {post?.user?.last_name}
									</p>
								</a>
								<a className="no-underline text-grey-darker hover:text-red-dark" href="#">
									<span className="hidden">Like</span>
									<i className="fa fa-heart"></i>
								</a>
							</footer>
						</article>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
