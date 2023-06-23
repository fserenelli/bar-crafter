import useSWR from 'swr'
import Product from '../components/Product'
import useBar from '../hooks/useBar'
import axiosClient from '../context/config/axios'

export default function Home() {

	const { actuallyCategory } = useBar()

	const token = localStorage.getItem('AUTH_TOKEN')
	const fetcher = () => axiosClient('/api/products', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(data => data.data)

	const { data, error, isLoading } = useSWR('/api/products', fetcher, {
		refreshInterval: 1000
	})

	if(isLoading) return 'Loading ...'

	const products = data.data.filter(product => product.category_id === actuallyCategory.id)

	return (
		<>
			<h1 className='text-4xl font-black'>{actuallyCategory.name}</h1>
			<p className='text-2xl my-10'>
				Choose and customize your order below
			</p>

			<div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
				{products.map(product => (
					<Product
						key={product.image}
						product={product}
						addButton={true}
					/>
				))}
			</div>
		</>
	)
}
