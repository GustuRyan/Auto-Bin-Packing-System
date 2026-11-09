export default defineNuxtRouteMiddleware(async (to) => {
  // Login must remain public; every other route requires a valid session.
  if (to.path === '/login') return

  try {
    // The backend reads the browser's session cookie and returns the current user.
    const res = await $fetch('http://localhost:8080/api/v1/me', {
      credentials: 'include', 
    })

    console.log('AUTH MIDDLEWARE RESPONSE:', res)

  } catch (err: any) {
    console.log('AUTH MIDDLEWARE ERROR:', err)

    // Any failed session check sends the visitor back to the login form.
    return navigateTo('/login')
  }
})
