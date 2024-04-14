'use client'
import './Card.scss'
import Image from 'next/image'
import ButtonBuy from '../ButtonBuy/ButtonBuy'
import InputCount from '../InputCount/InputCount'
import { BasketContext } from '@/utils/contexts/BasketContext'
import { useContext } from 'react'

export default function Card({ image_url, title, description, price, id }) {
  const basket = useContext(BasketContext)

  // Находим объект с нужным id в массиве basket
  const itemInBasket = basket.find(item => item.id === id)
  const countActive = itemInBasket ? itemInBasket.countActive : false

  return (
    <div className="card">
      <div className="card__flex-container">
        <div className="card__container">
          <Image
            className="card__img"
            src={image_url}
            alt={title}
            width={281}
            height={366}
          />
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
        </div>
        <div className="card__container-buy">
          <p className="card__price"> Цена: {price}₽</p>
          {!countActive ? (
            <ButtonBuy title={title} price={price} id={id} />
          ) : (
            <InputCount id={id} />
          )}
        </div>
      </div>
    </div>
  )
}
