import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";
import axiosClient from "./config/axios";

const BarContext = createContext();

const BarProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [actuallyCategory, setActuallyCategory] = useState({});
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const newTotal = cart.reduce( (total, product) => (product.price * product.quantity) + total, 0 )
      setTotal(newTotal)
    }, [cart])

    const getCategories = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await axiosClient('/api/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(data.data)
            setActuallyCategory(data.data[0])
        } catch (error) {
            
        }
    }

    useEffect(() => {
      getCategories()
    }, [])

    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setActuallyCategory(category)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    const handleAddCart = ({category_id, ...product}) => {
        if (cart.some(cartState => cartState.id === product.id)) {
			const updateCart = cart.map( cartState => cartState.id === product.id ? product : cartState)
			setCart(updateCart)
            toast.success('Cart Updated')
		} else {
            setCart([...cart, product])
            toast.success('Added to Cart')
        }
    }

    const handleEditQuantity = id => {
        const updateProduct = cart.filter(product => product.id === id)[0]
        setProduct(updateProduct)
        setModal(!modal)
    }

    const handleDeleteProductCart = id => {
        const updateProduct = cart.filter(product => product.id !== id)
        setCart(updateProduct)
        toast.success('Deleted from cart')
    }

    const handleSubmitNewOrder = async (logout) => {

        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const response = await axiosClient.post('/api/cart', 
            {
                total,
                products: cart.map(product => {
                    return {
                        id: product.id, 
                        quantity: product.quantity
                    }
                })
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(response.data.message)

            setTimeout(() => {
                setCart([])
            }, 500);

            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN')
                logout()
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickFinishOrder = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await axiosClient.put(`/api/cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success('Order Completed')
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickSoldOut = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await axiosClient.put(`/api/products/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success('Order Completed')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BarContext.Provider
            value={{
                categories,
                actuallyCategory,
                handleClickCategory,
                modal,
                handleClickModal,
                product,
                handleSetProduct,
                cart,
                handleAddCart,
                handleEditQuantity,
                handleDeleteProductCart,
                total,
                handleSubmitNewOrder,
                handleClickFinishOrder,
                handleClickSoldOut
            }}
        >{children}</BarContext.Provider>
    )
}

export {
    BarProvider
}
export default BarContext