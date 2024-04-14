'use client'
import { useState } from 'react'
import './Main.scss'
import Feedback from '../Feedback/Feedback'
import Form from '../Form/Form'
import CardsList from '../CardsList/CardsList'
import { ProductContext } from '@/utils/contexts/productContext'
import { SetProductContext } from '@/utils/contexts/SetProductContext'
import { BasketContext } from '@/utils/contexts/BasketContext'
import { SetBasketContext } from '@/utils/contexts/SetBasketContext'

export default function Main() {
  const [product, setProduct] = useState({
    phone: '',
    cart: [],
  })

  const [basket, setBasket] = useState([])
  console.log(basket)

  return (
    <main className="main">
      <ProductContext.Provider value={product}>
        <SetProductContext.Provider value={setProduct}>
          <BasketContext.Provider value={basket}>
            <SetBasketContext.Provider value={setBasket}>
              <h1 className="main__title">тестовое задание</h1>
              <Feedback />
              <Form />
              <CardsList />
            </SetBasketContext.Provider>
          </BasketContext.Provider>
        </SetProductContext.Provider>
      </ProductContext.Provider>
    </main>
  )
}
