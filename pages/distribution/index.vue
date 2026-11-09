<template>
    <!-- Read-only view of AI placements joined with logistics and transportation data. -->
    <div>
        <AdminLayout :title="'distributions'">
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
                <NuxtLink :to="'/distribution/create'"
                    class="flex items-center gap-2 rounded-2xl bg-[#13273E] text-white px-5 py-3 cursor-pointer hover:bg-[#18314fea]">
                    <img src="/public/icon-plus.svg" alt="">
                    <span class="text-xl font-semibold w-28">
                        Add new
                    </span>
                </NuxtLink>
            </div>
            <div class="w-full overflow-hidden rounded-xl border-3 border-[#77a3dd] overflow-x-scroll">
                <table class="w-full text-lg">
                    <thead class="font-semibold text-white bg-[#688FC1]">
                        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <th class="border-x-2 border-[#77a3dd] px-3 p-2" v-for="header in headerGroup.headers"
                                :key="header.id">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                            </th>
                            <th class="border-x-2 border-[#77a3dd] px-3 p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="row in table.getRowModel().rows" :key="row.id" :class="{
                            'border-t-3 border-[#77a3dd]': true,
                            'bg-[#77a3dd]/15': Number(row.id) % 2 === 1
                        }">
                            <td :class="{
                                'border-r-3 border-[#77a3dd] px-3 p-2 text-center': true
                            }" v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                            <td class="border-t-3 border-[#77a3dd] px-3 p-2">
                                <div class="flex items-center justify-center gap-2">
                                    <button
                                        class="w-10 h-10 bg-amber-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-amber-500">
                                        <img src="/public/icon-edit.svg" class="size-6">
                                    </button>
                                    <button
                                        class="w-10 h-10 bg-red-500 rounded-md flex justify-center items-center cursor-pointer hover:bg-red-600">
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
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useVueTable, type ColumnDef, type PaginationState, FlexRender } from '@tanstack/vue-table';
import { Convert, type DistributionsModel } from '~/models/DistributionsModel';

const { $api } = useNuxtApp()
const distributions = ref<DistributionsModel[]>([]);

async function loadDistributions() {
    // Validate nested logistics/transportation records before table rendering.
    const response = await $api.get('/distributions')
    distributions.value = Convert.toDistributionsModel(JSON.stringify(response.data));
}

onMounted(() => {
    loadDistributions()
})

const columnHelper = createColumnHelper<DistributionsModel>();
// Nested accessors display both placement coordinates and item/container details.
const columns = [
    // 1. Row Number (Display Column)
    columnHelper.display({
        id: 'rowNumber',
        header: () => 'Num',
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor('Logistic.logistic_name', { header: () => 'Logistic Name' }),
    columnHelper.accessor('Transportation.transport_name', { header: () => 'Transportation Name' }),
    columnHelper.accessor('x_range', { header: () => 'X Range (cm)' }),
    columnHelper.accessor('y_range', { header: () => 'Y Range (cm)' }),
    columnHelper.accessor('z_range', { header: () => 'Z Range (cm)' }),
    columnHelper.accessor('orientation_index', { header: () => 'Orientation' }),
    columnHelper.accessor('Logistic.panjang_cm', { header: () => 'Length (cm)' }),
    columnHelper.accessor('Logistic.lebar_cm', { header: () => 'Width (cm)' }),
    columnHelper.accessor('Logistic.tinggi_cm', { header: () => 'Height (cm)' }),
    columnHelper.accessor('Logistic.berat_kg', { header: () => 'Weight (kg)' }),
    columnHelper.accessor('Logistic.urgensi_pengiriman_1_5', { header: () => 'Urgency' }),
    columnHelper.accessor('Logistic.durability', { header: () => 'Durability' }),
    columnHelper.accessor('Logistic.days_to_expiry', { header: () => 'Days to Expiry' }),
    
] as ColumnDef<DistributionsModel, unknown>[];


// Client-side pagination state shared with TanStack Table.
const pageSize = ref(10);
const pageIndex = ref(0);

const paginationState = computed<PaginationState>(() => ({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
}));

// Calculate page count from the latest distribution records.
const pageCount = computed(() => Math.ceil(distributions.value.length / pageSize.value));

// Apply page changes requested by the table controls.
const setPagination = (updater: ((prevState: PaginationState) => PaginationState) | PaginationState) => {
    const newState = typeof updater === 'function' ? updater(paginationState.value) : updater;
    pageIndex.value = newState.pageIndex;
    pageSize.value = newState.pageSize;
};

// Reactive getters ensure the table always sees current Vue state.
const table = useVueTable({
    get data() { return distributions.value },
    columns,
    get pageCount() { return pageCount.value },
    state: {
        get pagination() { return paginationState.value },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
});
</script>
