<template>
    <div>
        <AdminLayout :title="'edit transportation'">
            <form @submit.prevent="submitForm" class="w-full flex gap-8 text-lg h-[600px]">

                <!-- LEFT FORM -->
                <div
                    class="w-[60%] h-full p-4 rounded-2xl overflow-hidden overflow-y-scroll border-2 border-slate-100 shadow-lg space-y-4">

                    <label class="font-bold">Transportation ID</label>
                    <input v-model="form.transportation_id" type="number" 
                        class="input-style">

                    <label class="font-bold">Transportation Name</label>
                    <input v-model="form.transport_name" type="text" 
                        class="input-style">

                    <label class="font-bold">Transportation Type</label>
                    <input v-model="form.transport_type" type="text" 
                        class="input-style">

                </div>

                <!-- RIGHT FORM -->
                <div
                    class="w-[40%] h-full p-4 rounded-2xl overflow-hidden bg-white border-2 border-slate-100 shadow-lg flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="flex gap-3 items-center">
                            <label class="font-bold">Length (cm)</label>
                            <input v-model="form.length" type="number" 
                                class="input-style">

                            <label class="font-bold">Width (cm)</label>
                            <input v-model="form.width" type="number" 
                                class="input-style">

                            <label class="font-bold">Height (cm)</label>
                            <input v-model="form.height" type="number" 
                                class="input-style">
                        </div>

                        <label class="font-bold">Max Weight (kg)</label>
                        <input v-model="form.max_weight" type="number" class="input-style">

                        <label class="font-bold">Fuel Capacity (ltr)</label>
                        <input v-model="form.fuel_capacity" type="number" class="input-style">
                    </div>

                    <div class="w-full flex justify-end">
                        <button type="submit" class="submit-btn">
                            Submit
                        </button>
                    </div>
                </div>

            </form>
        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue';
import { Convert } from '~/models/OneTransportationModel';

const route = useRoute()
const slug = route.params.slug
const { $api } = useNuxtApp()

const form = ref({
    transportation_id: "",
    transport_name: "",
    transport_type: "",
    width: "",
    length: "",
    height: "",
    max_weight: "",
    fuel_capacity: ""
})

async function submitForm() {
    try {
        const payload = {
            ...form.value,
        }

        const response = await $api.put("/transportation/" + slug, payload)

        alert("Success: Transportation updated!")
        console.log(response.data)

    } catch (err) {
        console.error(err)
        alert("Failed to submit")
    }
}

async function loadTransportation() {
    const response = await $api.get('/transportation/' + slug)
    const data = Convert.toOneTransportationModel(JSON.stringify(response.data))

    Object.assign(form.value, data)
}

onMounted (loadTransportation)
</script>

<style>
@reference "tailwindcss";

.input-style {
    @apply w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white;
}

.submit-btn {
    @apply flex items-center py-2 px-8 font-bold bg-[#cbe1ff] hover:bg-[#9fc0f0] cursor-pointer rounded-full;
}
</style>