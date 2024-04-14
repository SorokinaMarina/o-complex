import './ButtonBuy.scss'
import { ProductContext } from '@/utils/contexts/productContext'
import { SetProductContext } from '@/utils/contexts/SetProductContext'
import { useContext } from 'react'
import { SetBasketContext } from '@/utils/contexts/SetBasketContext'

export default function ButtonBuy({ id, setCountActive, title, price }) {
  const product = useContext(ProductContext)
  const setProduct = useContext(SetProductContext)
  const setBasket = useContext(SetBasketContext)

  return (
    <button
      className="button"
      type="button"
      onClick={() => {
        if (!product.cart.forEach(item => item.id === id)) {
          setCountActive(true)

          setProduct(prevValues => ({
            ...prevValues,
            cart: [...prevValues.cart, { id, quantity: 1 }],
          }))

          setBasket(prevValues => [
            ...prevValues,
            { title, id, price, quantity: 1 },
          ])
        }
      }}
    >
      купить
    </button>
  )
}
