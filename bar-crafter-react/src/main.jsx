import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BarProvider } from './context/BarProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BarProvider>
			<RouterProvider router={router} />
		</BarProvider>,
	</React.StrictMode>,
)
