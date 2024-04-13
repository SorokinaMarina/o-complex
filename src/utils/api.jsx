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
      url: `${BASE_URL}products?page=1&page_size=20`,
      type: 'POST',
      data: product,
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
  // try {
  //   const res = await fetch(`${BASE_URL}order`, {
  //     method: 'POST',
  //     body: JSON.stringify(product),
  //   })
  //   const data = await res.json()
  //   if (!data) {
  //     throw new Error('Произошла ошибка при отправке данных на сервер')
  //   }
  //   return data
  // } catch (e) {
  //   console.log(e)
  //   return `Произошла ошибка при загрузке данных ${e}`
  // }
}
