'use client'
import { useState } from 'react'
import './Main.scss'
import Feedback from '../Feedback/Feedback'
import Form from '../Form/Form'
import CardsList from '../CardsList/CardsList'

export default function Main() {
  const [product, setProduct] = useState({
    phone: '',
    cart: [],
  })

  return (
    <main className="main">
      <h1 className="main__title">тестовое задание</h1>
      <Feedback />
      <Form />
      <CardsList setProduct={setProduct} product={product} />
    </main>
  )
}
