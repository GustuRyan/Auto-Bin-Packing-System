import axios from 'axios'

export default defineNuxtPlugin(() => {
  // One shared client keeps the API base URL and timeout consistent.
  const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', 
    timeout: 10000
  })

  // Attach the optional token cookie to authenticated requests.
  api.interceptors.request.use(config => {
    const token = useCookie('token').value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Log the most useful backend error while preserving normal promise rejection.
  api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response?.data || error.message)
      return Promise.reject(error)
    }
  )

  return {
    // Components access this client through `const { $api } = useNuxtApp()`.
    provide: {
      api
    }
  }
})
