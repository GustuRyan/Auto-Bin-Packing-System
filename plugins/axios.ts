import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', 
    timeout: 10000
  })

  // Interceptor: menyisipkan token
  api.interceptors.request.use(config => {
    const token = useCookie('token').value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Interceptor: error handling
  api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response?.data || error.message)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
