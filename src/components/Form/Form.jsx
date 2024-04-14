import { useContext } from 'react'
import './Form.scss'
import { BasketContext } from '@/utils/contexts/BasketContext'

export default function Form() {
  const basket = useContext(BasketContext)
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
        <form
          className="form__template"
          action="#"
          id="basket-form"
          name="basket-form"
          noValidate
        >
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="form-input">
              <input
                className="form__input"
                name="form-input"
                id="form-input"
                type="number"
                placeholder="+7 (___) ___ __-__"
              ></input>
            </label>
          </fieldset>
          <button className="form__button">заказать</button>
        </form>
      </div>
    </section>
  )
}
