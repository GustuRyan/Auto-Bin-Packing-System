<template>
    <div>
        <AdminLayout :title="'User Profile'">

            <div class="w-full mx-auto p-6 rounded-2xl space-y-4">

                <h2 class="text-2xl font-bold mb-4">User Detail</h2>

                <div class="space-y-3">
                    <div>
                        <label class="font-bold">Name</label>
                        <input type="text" :value="user.name" class="input-style bg-gray-100" />
                    </div>

                    <div>
                        <label class="font-bold">Email</label>
                        <input type="text" :value="user.email" class="input-style bg-gray-100" />
                    </div>

                    <div>
                        <label class="font-bold">Role</label>
                        <input type="text" :value="user.role" class="input-style bg-gray-100" />
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                    <button @click="updateUser" class="submit-btn">
                        Save
                    </button>

                    <button @click="logout" class="submit-btn bg-red-500">
                        Logout
                    </button>
                </div>
            </div>

        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue'
const { $api } = useNuxtApp()

const user = ref({
    id: 0,
    name: '',
    email: '',
    role: '',
})

const loading = ref(true)

const loadUser = async () => {
  try {
    const res = await $api.get('/me')

    console.log('RESPONSE DATA USER:', res.data.user)

    const rawUser = res.data.user

    user.value = {
      id: rawUser.id,
      name: rawUser.name,
      email: rawUser.email,
      role: rawUser.role,
    }

  } catch (err) {
    console.error('Failed to load user', err)
  } finally {
    loading.value = false
  }
}

const updateUser = async () => {
  try {
    await $api.put('/me', {
      name: user.value.name,
      email: user.value.email,
    })

    alert('Profile updated successfully')
  } catch (err) {
    console.error(err)
    alert('Failed to update profile')
  }
}

const logout = async () => {
    try {
        await $api.post('/logout')
    } finally {
        navigateTo('/login')
    }
}

onMounted(loadUser)
</script>