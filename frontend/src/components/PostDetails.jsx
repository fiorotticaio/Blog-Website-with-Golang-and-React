import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BlogDetail = () => {
	const navigate = useNavigate();
	const [post, setPost] = useState();
	const { id } = useParams();
	
	useEffect(() => {
		const User = localStorage.getItem("user");

		if (!User) {
			navigate("/login");
		}
	}, []);

	const fetchPost = () => {
		axios.get( `${process.env.REACT_APP_BACKEND_URL}/api/post/${id}`, {withCredentials: true})
			.then(function (response) {
				setPost(response?.data?.data);
			})
			.catch(function (error) {
				console.log(error);
			})
	};

	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<div className="relative">
			<div className="max-w-3xl mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
				<div className="mx-auto text-4xl font-bold text-indigo-600 transition duration-500 ease-in-out my-8">
					{post?.title}
				</div>

				<div className="h-[400px] overflow-hidden flex justify-center items-center rounded-xl">
					<img alt="Imagem do Post" className="w-full" src={post?.image} onError={(e) => e.target.src = "golangerror.jpg"}/>
				</div>

				<p className="text-gray-700 text-base leading-8 my-4">
					Author: {post?.user?.first_name} {post?.user?.last_name}
				</p>

				<hr />
			</div>

			<div className="mx-auto mb-32 text-center">
				<div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
					<div className="">
						<p className="text-base leading-8 my-5">{post?.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogDetail;
