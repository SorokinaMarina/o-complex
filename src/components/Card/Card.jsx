'use client'
import './Card.scss'
import { useState } from 'react'
import Image from 'next/image'
import ButtonBuy from '../ButtonBuy/ButtonBuy'
import InputCount from '../InputCount/InputCount'

export default function Card({
  image_url,
  title,
  description,
  price,
  id,
  setProduct,
  product,
}) {
  const [countActive, setCountActive] = useState(false)
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
            <ButtonBuy
              id={id}
              setProduct={setProduct}
              setCountActive={setCountActive}
            />
          ) : (
            <InputCount id={id} product={product} setProduct={setProduct} />
          )}
        </div>
      </div>
    </div>
  )
}
