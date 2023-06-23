import { Link } from "react-router-dom"
import useBar from '../hooks/useBar'
import Category from "./Category"
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {

	const { categories } = useBar();
	const { logout, user } = useAuth({middleware: 'auth'})

	return (
		<aside className="md:w-72">
			<div className="p-4">
				<Link to="/">
					<img
						className="w-40 cursor-pointer"
						src="img/logo.svg"
						alt="Logo Image"
					/>
				</Link>
			</div>

			<p className='my-10 text-xl text-center'>Hi, {user?.name}!</p>

			<div className="mt-10">
				{categories.map(category => (
					<Category
						key={category.id}
						category={category}
					/>
				))}
			</div>

			<div className="my-5 px-5">
				<button
					type="button"
					className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
					onClick={logout}
				>
					Cancel Order
				</button>
			</div>
		</aside>
	)
}
