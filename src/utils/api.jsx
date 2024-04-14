const BASE_URL = 'http://o-complex.com:1337/'
import $ from 'jquery'

export async function getPreviews() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}reviews`,
      type: 'GET',
      success: function (data) {
        if (!data) {
          console.error('Произошла ошибка при получении данных с сервера')
          reject('Произошла ошибка при получении данных с сервера')
        }
        resolve(data)
      },
      error: function (xhr, status, error) {
        console.error(`Произошла ошибка при загрузке данных ${error}`)
        reject(`Произошла ошибка при загрузке данных ${error}`)
      },
    })
  })
}

export async function getProducts() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}products?page=1&page_size=20`,
      type: 'GET',
      success: function (data) {
        if (!data) {
          console.error('Произошла ошибка при получении данных с сервера')
          reject('Произошла ошибка при получении данных с сервера')
        }
        resolve(data)
      },
      error: function (xhr, status, error) {
        console.error(`Произошла ошибка при загрузке данных ${error}`)
        reject(`Произошла ошибка при загрузке данных ${error}`)
      },
    })
  })
}

export async function makeOrder(product) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}order`,
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(product),
      success: function (data) {
        if (!data) {
          console.error('Произошла ошибка при получении данных с сервера')
          reject('Произошла ошибка при получении данных с сервера')
        }
        resolve(data)
      },
      error: function (xhr, status, error) {
        console.error(`Произошла ошибка при загрузке данных ${error}`)
        reject(`Произошла ошибка при загрузке данных ${error}`)
      },
    })
  })
}
