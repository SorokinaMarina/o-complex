'use client'
import { useContext, useState, useEffect } from 'react'
import './Form.scss'
import { BasketContext } from '@/utils/contexts/BasketContext'
import { IMaskInput } from 'react-imask'
import { SetProductContext } from '@/utils/contexts/SetProductContext'
import useSWRMutation from 'swr/mutation'
import { makeOrder } from '@/utils/api'
import { SetBasketContext } from '@/utils/contexts/SetBasketContext'

export default function Form({ product, setOpenPopup }) {
  // Переменные с контекстом
  const basket = useContext(BasketContext)
  const setProduct = useContext(SetProductContext)
  const setBusket = useContext(SetBasketContext)

  // Переменная с шаблоном маски
  const maskTemplate = '+{7}(000)000-00-00'

  // В переменную values записываем данные из поля ввода
  const [values, setValues] = useState()
  // Переменная хранит булевое значение об успешной/не успешной валидации
  const [isValid, setIsValid] = useState(null)
  // Переменная хранит в себе текст ошибки
  const [errorText, setErrorText] = useState('')

  // Функция ждля запроса к серверу
  const { trigger } = useSWRMutation('order', () => makeOrder(product))

  // Запускаем живую валидацию с подсказками для пользователя
  useEffect(() => {
    validate()

    if (isValid === null) {
      setErrorText('')
    }
  }, [values, product.cart])

  // Функция, которая производит валидацию
  function validate() {
    if (values === undefined) {
      setErrorText('Введите номер телефона чтобы оформить заказ.')
      setIsValid(false)
    } else if (product.phone.length !== 11 || values === undefined) {
      setErrorText('Номер телефона должен состоять из 11 цифр.')
      setIsValid(false)
    } else if (product.cart.length === 0) {
      setErrorText('Корзина товаров пуста.')
      setIsValid(false)
    } else {
      setErrorText('')
      setIsValid(true)
    }
  }

  // Функция собирает данные из поля ввода
  function onAccept(value) {
    setValues(value)
    setProduct({ ...product, phone: value.replace(/\D/g, '') })
  }

  // Функция, которая срабатывает при клике на кнопку формы и отправляет запрос к серверу
  function onSubmit(e) {
    e.preventDefault()

    try {
      trigger()
      setIsValid(null)
      setErrorText('')
      setValues('')
      setBusket([])
      setProduct({
        phone: '',
        cart: [],
      })
      setOpenPopup(true)
    } catch (e) {
      console.log(`Ошибка: ${e}`)
    }
  }

  return (
    <section className="form">
      <div className="form__container">
        <h3 className="form__title">Добавленные товары</h3>
        <table className="form__table">
          <tbody className="form__table-body">
            {basket.map(item => (
              <tr key={item.id} className="form__table-row">
                <td className="form__table-data form__table-data_invisible-ending">
                  {item.title}
                </td>
                <td className="form__table-data">{`x${item.quantity}`}</td>
                <td className="form__table-data">{`${+item.price * item.quantity}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="form__error-text">{errorText}</span>
        <form
          className="form__template"
          action="#"
          id="basket-form"
          name="basket-form"
          onSubmit={onSubmit}
          noValidate
        >
          <fieldset className="form__fieldset">
            <label
              className={`form__label ${errorText !== '' && 'form__label_error'}`}
              htmlFor="form-input-phone"
            >
              <IMaskInput
                className="form__input"
                name="form-input"
                id="form-input-phone"
                type="phone"
                placeholder="+7(___)___ __-__"
                mask={maskTemplate}
                value={values}
                onAccept={onAccept}
              />
            </label>
          </fieldset>
          <button
            className={`form__button ${!isValid && 'form__button_error'}`}
            type="submit"
            disabled={!isValid}
          >
            заказать
          </button>
        </form>
      </div>
    </section>
  )
}
