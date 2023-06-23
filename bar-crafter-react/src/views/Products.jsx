import useSWR from 'swr'
import axiosClient from '../context/config/axios'
import Product from '../components/Product'
import useBar from '../hooks/useBar'

export default function Products() {

	const token = localStorage.getItem('AUTH_TOKEN')
	const fetcher = () => axiosClient('/api/products', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(data => data.data )

	const { data, error, isLoading } = useSWR('/api/products', fetcher, {
		refreshInterval: 1000
	})

	if (isLoading) return 'Loading ...'

	return (
		<div>
			<div>
				<h1 className='text-4xl font-black'>Products</h1>
				<p className='text-2xl my-10'>
					Admin your products are availables here!
				</p>

				<div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
					{Array.isArray(data.data) && data.data.map(product => (
						<Product
							key={product.image}
							product={product}
							disponibleButton={true}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
