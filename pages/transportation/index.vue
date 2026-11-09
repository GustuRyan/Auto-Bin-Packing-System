<template>
    <!-- Transportation CRUD list with client-side TanStack pagination. -->
    <div>
        <AdminLayout :title="'transportation'">
            <div class="w-full grid grid-cols-3 gap-5">
                <div v-for="i in 3" :key="i" class="bg-white rounded-[20px] shadow-md w-full h-60">

                </div>
            </div>
            <div class="flex items-center gap-10">
                <h2 class="font-bold text-[#13273E] text-3xl whitespace-nowrap leading-none">
                    Transportation List
                </h2>
                <div class="w-full h-0.5 bg-[#13273E]/25 rounded-full"></div>
                <NuxtLink :to="'transportation/create'" class="flex items-center gap-2 rounded-2xl bg-[#13273E] text-white px-5 py-3 cursor-pointer hover:bg-[#18314fea]">
                    <img src="/public/icon-plus.svg" alt="">
                    <span class="text-xl font-semibold w-28">
                        Add new
                    </span>
                </NuxtLink>
            </div>
            <div class="w-full overflow-hidden rounded-xl border-3 border-[#77a3dd]">
                <table class="min-w-full text-lg">
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
                                    <NuxtLink :href="'/transportation/' + row.original.ID"
                                        class="w-10 h-10 bg-amber-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-amber-500">
                                        <img src="/public/icon-edit.svg" class="size-6">
                                    </NuxtLink>
                                    <button @click="deleteTransportation(row.original.ID)"
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
import { Convert, type TransportationsModel } from '~/models/TransportationsModel';

const { $api } = useNuxtApp()
const transportations = ref<TransportationsModel[]>([]);

async function loadTransportations() {
    // Validate the API array before exposing it to the table.
    const response =  await $api.get('/transportation')
    transportations.value = Convert.toTransportationsModel(JSON.stringify(response.data));
}

async function deleteTransportation(id: number) {
    try {
        const response = await $api.delete('/transportation/' + id)

        alert("Success: Transportation deleted!")
        console.log(response.data)
    } catch (err) {
        console.error(err)
        alert("Failed to delete!")
    }
}

onMounted(() => {
    loadTransportations()
})

const columnHelper = createColumnHelper<TransportationsModel>();
// Define the visible container identity, dimensions, and capacity columns.
const columns = [
    // 1. Row Number (Display Column)
    columnHelper.display({
        id: 'rowNumber',
        header: () => 'Num',
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor('transportation_id', { header: () => 'Transportation ID' }),
    columnHelper.accessor('transport_name', { header: () => 'Transportation Name' }),
    columnHelper.accessor('transport_type', { header: () => 'Transportation Type' }),
    columnHelper.accessor('length', { header: () => 'Length (cm)' }),
    columnHelper.accessor('width', { header: () => 'Width (cm)' }),
    columnHelper.accessor('height', { header: () => 'Height (cm)' }),
    columnHelper.accessor('max_weight', { header: () => 'Weight Capacity (kg)' }),
    columnHelper.accessor('fuel_capacity', { header: () => 'Fuel Capacity (ltr)' }),
    
] as ColumnDef<TransportationsModel, unknown>[];


// Client-side pagination state shared with TanStack Table.
const pageSize = ref(10);
const pageIndex = ref(0);

const paginationState = computed<PaginationState>(() => ({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
}));

// Calculate page count from the latest transportation data.
const pageCount = computed(() => Math.ceil(transportations.value.length / pageSize.value));

// Apply page changes requested by the table controls.
const setPagination = (updater: ((prevState: PaginationState) => PaginationState) | PaginationState) => {
    const newState = typeof updater === 'function' ? updater(paginationState.value) : updater;
    pageIndex.value = newState.pageIndex;
    pageSize.value = newState.pageSize;
};

// Reactive getters ensure the table always sees current Vue state.
const table = useVueTable({
    get data() { return transportations.value },
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
