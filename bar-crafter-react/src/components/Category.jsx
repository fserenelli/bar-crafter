import useBar from '../hooks/useBar'

export default function Category({category}) {

	const { handleClickCategory, actuallyCategory } = useBar();
	const { icon, id, name } = category;

	return (
		<div className={`${actuallyCategory.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
			<img 
				src={`/img/icono_${icon}.svg`} 
				alt="Icon Image"
				className="w-12"
			/>

			<button 
				className="text-lg font-bold cursor-pointer truncate"
				type='button'
				onClick={() => handleClickCategory(id)}
			>
				{name}
			</button>
		</div>
	)
}
