<template>
    <!-- Placeholder roles page; role management UI has not been implemented yet. -->
    <div>
        <AdminLayout :title="'roles'">
            <button @click="logout" class="submit-btn">
                Logout
            </button>
        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue';
const { $api } = useNuxtApp()

const logout = async () => {
    try {
        await $api.post('/logout')
    } catch (e) {
        console.log('logout error', e)
    } finally {
        navigateTo('/login')
    }
}
</script>
