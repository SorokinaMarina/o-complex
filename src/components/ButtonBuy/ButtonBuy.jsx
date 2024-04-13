import './ButtonBuy.scss'

export default function ButtonBuy({ setCountActive, id, setProduct }) {
  return (
    <button
      className="button"
      type="button"
      onClick={() => {
        setCountActive(true)
        setProduct(prevValues => ({
          ...prevValues,
          cart: [...prevValues.cart, { id: id, quantity: 1 }],
        }))
      }}
    >
      купить
    </button>
  )
}
