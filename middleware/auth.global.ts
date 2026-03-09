export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login') return

  try {
    const res = await $fetch('http://localhost:8080/api/v1/me', {
      credentials: 'include', 
    })

    console.log('AUTH MIDDLEWARE RESPONSE:', res)

  } catch (err: any) {
    console.log('AUTH MIDDLEWARE ERROR:', err)

    return navigateTo('/login')
  }
})