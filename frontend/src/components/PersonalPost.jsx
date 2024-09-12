import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiEdit, TiPen, TiPencil, TiTrash, TiUser } from "react-icons/ti";
import { formatDistance, subDays } from "date-fns";

const PersonalPost = () => {
	const [PostData, setPostData] = useState();
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const navigate = useNavigate();

	const uniquePost = () => {
		setLoading(true);
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/uniquepost`,{withCredentials: true,})
			.then(function (response) {
				setLoading(false);
				setPostData(response?.data);
			})
			.catch(function (error) {
				setLoading(false);
			});
	};

	useEffect(() => {
		const User = localStorage.getItem("user");
		if (!User) {
			navigate("/login");
		}
		uniquePost();
	}, []);

	const deleteBtn = (Post) => {
		setDeleteLoading(true);
		axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deletepost/${Post.id}`,{withCredentials: true,})
			.then(function (response) {
				setDeleteLoading(false);
				uniquePost();
			})
			.catch(function (error) {
				setDeleteLoading(false);
			})
	};

	return (
		<>
			<div className="text-center mb-16">
				<p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
					My posts
				</p>
				<h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
					These are your <span className="text-indigo-600">Creations</span>
				</h3>
			</div>
			{!loading && PostData?.length <= 0 && (
				<div className="text-2xl font-bold text-center flex justify-center items-center pl-16 pt-24">
					<h1>You don't have post yet. Kindly create a post </h1>
				</div>
			)}
			{loading && (
				<div className="text-2xl font-bold text-center px-56 pt-24">
					<h1>LOADING.....</h1>
				</div>
			)}
			<div className="container my-12 mx-auto px-4 md:px-12">
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
					{PostData?.map((post) => (
						<div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
							<article className="overflow-hidden rounded-lg shadow-lg">
								<div className="h-[300px] overflow-hidden flex justify-center items-center">
									<a href={`/detail/${post.id}`}>
										<img alt="Imagem do Post" className="w-full" src={post?.image} onError={(e) => e.target.src = "golangerror.jpg"}/>
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
										<TiUser size={25} />
										<p className="ml-2 text-sm">
											{post?.user?.first_name} {post?.user?.last_name}
										</p>
									</a>
									<div className="flex items-center gap-3">
										<a href={`edit/${post.id}`}>
											<button className="text-yellow-500 hover:text-yellow-">
												<TiPencil size={25} />
											</button>
										</a>

										<button onClick={() => deleteBtn(post)} disabled={loading ? true : false} className="text-red-500 hover:text-red-700">
											{deleteLoading ? "Loading" : <TiTrash size={25}/>}
										</button>
									</div>
								</footer>
							</article>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default PersonalPost;
