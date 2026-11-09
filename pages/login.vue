<template>
    <!-- Public sign-in form; successful authentication redirects to the dashboard. -->
    <div>
        <MainLayout>
            <div class="flex">
                <img src="/public/img-wakatobi-hero.webp" alt="" class=" max-h-full h-screen w-[50%] object-cover">
                <form @submit.prevent="submitForm" class="flex flex-col justify-center w-full h-screen p-16">

                    <h1 class="w-full flex flex-col items-center font-bold text-4xl">
                        LOGIN SECTION
                        <p class="text-lg font-medium">
                            Login as Admin Here To Get All Access
                        </p>
                    </h1>

                    <label class="font-bold mt-16">Email</label>
                    <input v-model="form.email" type="email" required placeholder="Enter your email"
                        class="input-style">
                    <label class="font-bold mt-4">Password</label>
                    <input v-model="form.password" type="password" required placeholder="Enter your password"
                        class="input-style">

                    <div class="w-full flex justify-end mt-16">
                        <button type="submit" class="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    </div>
</template>

<script setup lang="ts">
import MainLayout from '~/layout/main.vue';
const { $api } = useNuxtApp()

const form = ref({
    email: "",
    password: "",
})

async function submitForm() {
  // The backend creates the session cookie used by the global route middleware.
  await $api.post('/login', form.value)

  navigateTo('/')
}

</script>
