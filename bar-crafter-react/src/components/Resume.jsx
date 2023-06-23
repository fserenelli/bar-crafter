import { formatMoney } from '../helpers';
import useBar from '../hooks/useBar'
import { useAuth } from '../hooks/useAuth';
import ProductResume from './ProductResume';

export default function Resume() {

	const { cart, total, handleSubmitNewOrder } = useBar();
	const { logout } = useAuth({})

	const checkCart = () => cart.length === 0;

	const handleSubmit = e => {
		e.preventDefault()

		handleSubmitNewOrder(logout)
	}

	return (
		<aside className="w-70 h-screen overflow-y-scroll p-5">
			<h1 className="text-4xl font-black">
				My Cart
			</h1>

			<p className="text-lg my-5">
				Here you can see your resume cart
			</p>

			<div className='py-10'>
				{cart.length === 0 ? (
					<p className='text-center text-2xl'>
						Nothing selected yet
					</p>
				) : (
					cart.map(product => (
						<ProductResume 
							key={product.id}
							product={product}
						/>
					))
				)}
			</div>

			<p className='text-xl mt-10'>
				Total: {''}
				{ formatMoney(total) }
			</p>

			<form 
				className='w-full'
				onSubmit={handleSubmit}
			>
				<div className='mt-5'>
					<input 
						type="submit" 
						className={`${checkCart() ? "bg-indigo-100" :  "bg-indigo-600 hover:bg-indigo-800" } px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
						value="Confirm"
						disabled={checkCart()}
					/>
				</div>
			</form>
		</aside>
	)
}
