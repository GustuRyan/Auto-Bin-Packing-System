<template>
    <div>
        <AdminLayout :title="'logistics'">
            <div class="w-full grid grid-cols-2 gap-5">
                <div class="bg-white rounded-[20px] shadow-md w-full h-60">

                </div>
                <div class="bg-white rounded-[20px] shadow-md w-full h-60">

                </div>
            </div>
            <div class="flex items-center gap-10">
                <h2 class="font-bold text-[#13273E] text-3xl whitespace-nowrap leading-none">
                    Logistic List
                </h2>
                <div class="w-full h-0.5 bg-[#13273E]/25 rounded-full"></div>
                <NuxtLink :to="'/logistic/create'"
                    class="flex items-center gap-2 rounded-2xl bg-[#13273E] text-white px-5 py-3 cursor-pointer hover:bg-[#18314fea]">
                    <img src="/public/icon-plus.svg" alt="">
                    <span class="text-xl font-semibold w-28">
                        Add new
                    </span>
                </NuxtLink>
            </div>
            
            <LogisticTable :paginate="Number(10)" />
        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import LogisticTable from '~/components/logistic-table.vue';
import AdminLayout from '~/layout/admin.vue';

</script>