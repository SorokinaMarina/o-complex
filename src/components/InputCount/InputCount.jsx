'use client'
import './InputCount.scss'
import { useContext } from 'react'
import { ProductContext } from '@/utils/contexts/productContext'
import { SetProductContext } from '@/utils/contexts/SetProductContext'
import { SetBasketContext } from '@/utils/contexts/SetBasketContext'
import { BasketContext } from '@/utils/contexts/BasketContext'

export default function InputCount({ id, setCountActive }) {
  const product = useContext(ProductContext)
  const setProduct = useContext(SetProductContext)
  const setBasket = useContext(SetBasketContext)
  const basket = useContext(BasketContext)
  const productObject = product.cart.find(item => item.id === id)
  console.log(product)
  // Функция, которая собирается данные из полей с количеством товаров
  function onChange(e) {
    const { id, value } = e.target

    const updatedProduct = product.cart.map(item => {
      if (item.id === +id) {
        return { ...item, quantity: parseInt(value, 10) || 0 }
      }

      return item
    })

    const updatedBasket = basket.map(item => {
      if (item.id === +id) {
        return { ...item, quantity: parseInt(value, 10) || 0 }
      }

      return item
    })

    setProduct(prevValues => ({
      ...prevValues,
      cart: updatedProduct,
    }))

    setBasket(updatedBasket)
  }

  // Функция, которая увеличивает/уменьшает количество товаров на единицу
  function updateQuantity(option) {
    const updatedProduct = product.cart.map(item => {
      if (item.id === +id) {
        if (option === 'subtraction') {
          return { ...item, quantity: +item.quantity - 1 }
        } else if (option === 'addition') {
          return { ...item, quantity: +item.quantity + 1 }
        }
      }

      return item
    })

    const updatedBasket = basket.map(item => {
      if (item.id === +id) {
        if (option === 'subtraction') {
          return { ...item, quantity: +item.quantity - 1 }
        } else if (option === 'addition') {
          return { ...item, quantity: +item.quantity + 1 }
        }
      }

      return item
    })

    const filterProducts = updatedProduct.filter(item => {
      if (item.id === +id && item.quantity < 1) {
        setCountActive(false)
      }

      return item.quantity > 0
    })

    const filterBasket = updatedBasket.filter(item => item.quantity > 0)

    setProduct(prevValues => ({
      ...prevValues,
      cart: filterProducts,
    }))

    setBasket(filterBasket)
  }

  // Функция срабатывает при клике на "-"
  function onClickSubtraction() {
    updateQuantity('subtraction')
  }

  // Функция срабатывает при клике на "+"
  function onClickAddition() {
    updateQuantity('addition')
  }

  // Перезаписываем product при расфокусе с поля ввода
  function onBlur() {
    const filterProducts = product.cart.filter(item => {
      if (item.id === +id && item.quantity < 1) {
        setCountActive(false)
      }

      return item.quantity > 0
    })

    const filterBasket = basket.filter(item => item.quantity > 0)

    setProduct(prevValues => ({
      ...prevValues,
      cart: filterProducts,
    }))

    setBasket(filterBasket)
  }

  return (
    <div className="input-count">
      <button
        className="input-count__button"
        type="button"
        onClick={onClickSubtraction}
      >
        -
      </button>
      <label className="input-count__label" htmlFor={id}>
        <input
          className="input-count__field"
          id={id}
          type="number"
          placeholder={productObject.quantity}
          value={productObject.quantity}
          onChange={onChange}
          onBlur={onBlur}
          name="input"
        />
      </label>
      <button
        className="input-count__button"
        type="button"
        onClick={onClickAddition}
      >
        +
      </button>
    </div>
  )
}
