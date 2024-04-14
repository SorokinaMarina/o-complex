import React, { useEffect } from 'react'
import './PopupContainer.scss'
import Image from 'next/image'
import exit from '../../img/close-icon.svg'

function PopupContainer({ openPopup, onClose, popupName, setOpenPopup }) {
  // Для закрытия попапа по клавише escape и на фон
  useEffect(() => {
    const closeEsc = e => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose()
      }
    }

    const closeMouseDown = e => {
      if (e.target.classList.contains('popup_opened')) {
        onClose()
      }
    }
    window.addEventListener('keydown', closeEsc)
    window.addEventListener('mousedown', closeMouseDown)
    return () => {
      window.removeEventListener('keydown', closeEsc)
      window.removeEventListener('mousedown', closeMouseDown)
    }
  }, [onClose])

  return (
    <div className={`popup ${popupName} ${openPopup ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <button
          className="popup__button"
          type="button"
          onClick={() => {
            setOpenPopup(false)
          }}
        >
          <Image className="popup__image" src={exit} alt="exit" />
        </button>
        <p className="popup__text">Данные успешно отправлены.</p>
      </div>
    </div>
  )
}

export default PopupContainer
