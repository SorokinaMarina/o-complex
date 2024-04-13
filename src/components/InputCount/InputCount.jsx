'use client'
import './InputCount.scss'
import { useState } from 'react'

export default function InputCount({ id, product, setProduct }) {
  function onChange(e) {
    const { id, value } = e.target

    const updatedProduct = product.cart.map(item => {
      if (item.id === +id) {
        return { ...item, quantity: +value }
      }

      return item
    })

    setProduct(prevValues => ({
      ...prevValues,
      cart: updatedProduct,
    }))
  }

  function onClickSubtraction() {
    const updatedProduct = product.cart.map(item => {
      if (item.id === +id) {
        return { ...item, quantity: +item.quantity - 1 }
      }

      return item
    })

    setProduct(prevValues => ({
      ...prevValues,
      cart: updatedProduct,
    }))
  }

  function onClickAddition() {
    const updatedProduct = product.cart.map(item => {
      if (item.id === +id) {
        return { ...item, quantity: +item.quantity + 1 }
      }

      return item
    })

    setProduct(prevValues => ({
      ...prevValues,
      cart: updatedProduct,
    }))
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
          minLength={1}
          max={6}
          placeholder={product.cart[id - 1].quantity}
          value={product.cart[id - 1].quantity}
          onChange={onChange}
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
