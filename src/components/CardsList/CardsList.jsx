import './CardsList.scss'
import useSWR from 'swr'
import { getProducts } from '@/utils/api'
import Card from '../Card/Card'

export default function () {
  const { data, isLoading, error } = useSWR('products', () => getProducts())

  // Добавляем разметку для загрузки страницы
  if (isLoading) {
    return <div className="cards-list__loading">Загружаем...</div>
  }

  // Добавляем обработку ошибки
  if (error) {
    return (
      <div className="cards-list__error">
        При загрузке данных произошла ошибка. Попробуйте перезагрузить страницу.
      </div>
    )
  }
  return (
    <section className="cards-list">
      {data.products.map(item => (
        <Card
          key={item.id}
          {...item}
        />
      ))}
    </section>
  )
}
