'use client'
import './Feedback.scss'
import useSWR from 'swr'
import { getPreviews } from '@/utils/api'

export default function Feedback() {
  const { data, error, isLoading } = useSWR('previews', () => getPreviews())

  // Добавляем разметку для загрузки страницы
  if (isLoading) {
    return <div className="feedback__loading">Загружаем...</div>
  }

  // Добавляем обработку ошибки
  if (error) {
    return (
      <div className="feedback__error">
        При загрузке данных произошла ошибка. Попробуйте перезагрузить страницу.
      </div>
    )
  }

  return (
    <section className="feedback">
      {data.map((item, index) => {
        return (
          <div
            className="feedback__container"
            key={index}
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        )
      })}
    </section>
  )
}
