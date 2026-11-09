<template>
    <!-- Placeholder schedule table using sample rows until an API is connected. -->
    <div>
        <AdminLayout :title="'schedules'">
            <div class="w-full grid grid-cols-4 gap-5">
                <div v-for="i in 4" :key="i" class="bg-white rounded-[20px] shadow-md w-full h-60">

                </div>
            </div>
            <div class="flex items-center gap-10">
                <h2 class="font-bold text-[#13273E] text-3xl whitespace-nowrap leading-none">
                    Schedule List
                </h2>
                <div class="w-full h-0.5 bg-[#13273E]/25 rounded-full"></div>
                <button class="flex items-center gap-2 rounded-2xl bg-[#13273E] text-white px-5 py-3 cursor-pointer hover:bg-[#18314fea]">
                    <img src="/public/icon-plus.svg" alt="">
                    <span class="text-xl font-semibold w-28">
                        Add new
                    </span>
                </button>
            </div>
            <div class="w-full overflow-hidden rounded-xl border-3 border-[#77a3dd]">
                <table class="min-w-full text-lg">
                    <thead class="font-semibold text-white bg-[#688FC1]">
                        <tr>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                No
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Item Name
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Weight
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Width
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Length
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Height
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Expired Rate
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Toughness
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Urgency
                            </th>
                            <th class="border-2 border-[#688FC1] px-3 p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="i in 5" :key="i" class="border-t-3 border-[#77a3dd]">
                            <td class="border-r-3 border-[#77a3dd] px-3 p-2">
                                {{ i }} A
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                Item Name{{ i }}
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                1{{ i }} kg
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                {{ i + 25 }} cm
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                {{ i + 40 }} cm
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                {{ i + 25 }} cm
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                0,7{{ i }}
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                0,5{{ i }}
                            </td>
                            <td class="border-t-3 border-r-3 border-[#77a3dd] px-3 p-2">
                                0,8{{ i + 2 }}
                            </td>
                            <td class="border-t-3 border-[#77a3dd] px-3 p-2">
                                <div class="flex items-center justify-center gap-2">
                                    <button class="w-10 h-10 bg-amber-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-amber-500">
                                        <img src="/public/icon-edit.svg" class="size-6">
                                    </button>
                                    <button class="w-10 h-10 bg-red-500 rounded-md flex justify-center items-center cursor-pointer hover:bg-red-600">
                                        <img src="/public/icon-delete.svg" class="size-6">
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue';
</script>
