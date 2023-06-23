import { formatMoney } from "../helpers";
import useBar from '../hooks/useBar'

export default function Product({ product, addButton = false, disponibleButton = false }) {

	const { handleClickModal, handleSetProduct, handleClickSoldOut } = useBar();
	const { name, image, price } = product;

	return (
		<div className="border p-3 shadow bg-white">
			<img 
				src={`/img/${image}.jpg`} 
				alt={`Image ${name}`}
				className="w-full"
			/>

			<div className="p-5">
				<h3 className="text-2xl font-bold">{name}</h3>
				<p className="mt-5 font-black text-4xl text-amber-500">
					{formatMoney(price)}
				</p>

				{addButton && (
					<button 
						type="button"
						className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
						onClick={() => {
							handleClickModal();
							handleSetProduct(product);
						}}
					>
						Add
					</button>
				)}

				{disponibleButton && (
					<button 
						type="button"
						className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
						onClick={() => {
							handleClickSoldOut(product.id)
						}}
					>
						Sold Out
					</button>
				)}
				
			</div>
		</div>
	)
}
