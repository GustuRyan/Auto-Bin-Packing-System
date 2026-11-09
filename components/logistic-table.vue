<template>
  <!-- Reusable, horizontally scrollable table for the wide logistics dataset. -->
  <div class="w-full max-h-[800px] overflow-hidden rounded-xl border-3 border-[#77a3dd] overflow-x-scroll overflow-y-scroll">
    <table class="w-full text-lg">
      <thead class="font-semibold text-white bg-[#688FC1] w-full sticky top-0 z-10">
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th class="border-x-2 border-[#77a3dd] px-3 p-2" v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </th>
          <th class="border-x-2 border-[#77a3dd] px-3 p-2">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white w-full">
        <tr v-for="row in table.getRowModel().rows" :key="row.id" :class="{
          'border-t-3 border-[#77a3dd] ': true,
          'bg-[#77a3dd]/15': Number(row.id) % 2 === 1
        }">
          <td :class="{
            'border-r-3 border-[#77a3dd] px-3 p-2 text-center': true
          }" v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
          <td class="border-t-3 border-[#77a3dd] px-3 p-2">
            <div class="flex items-center justify-center gap-2">
              <NuxtLink :to="'/logistic/' + row.original.ID"
                class="w-10 h-10 bg-amber-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-amber-500">
                <img src="/public/icon-edit.svg" class="size-6">
              </NuxtLink>
              <button @click="deleteLogistic(row.original.ID)"
                class="w-10 h-10 bg-red-500 rounded-md flex justify-center items-center cursor-pointer hover:bg-red-600">
                <img src="/public/icon-delete.svg" class="size-6">
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="TData extends Record<string, any>">
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useVueTable, type ColumnDef, type PaginationState, FlexRender } from '@tanstack/vue-table';
import { Convert, type LogisticModel } from '~/models/LogisticModel';

const { $api } = useNuxtApp()
const logistics = ref<LogisticModel[]>([]);

// Load and runtime-validate the logistics response before rendering it.
async function loadLogistics() {
    const response = await $api.get('/logistics')
    logistics.value = Convert.toLogisticModel(JSON.stringify(response.data));
}

async function deleteLogistic(id: number) {
    try {
        const response = await $api.delete('/logistics/' + id)

        alert("Success: Logistic deleted!")
        console.log(response.data)
    } catch (err) {
        console.error(err)
        alert("Failed to delete!")
    }
}

onMounted(() => {
    loadLogistics()
})

const columnHelper = createColumnHelper<LogisticModel>();
// Column groups mirror the identification, physical, date, shipping, and cost fields.
const columns = [
    // 1. Row Number (Display Column)
    columnHelper.display({
        id: 'rowNumber',
        header: () => 'Num',
        cell: ({ row }) => row.index + 1,
    }),

    // --- Identification Fields ---
    columnHelper.accessor('logistic_id', { header: () => 'Logistic ID' }),
    columnHelper.accessor('logistic_name', { header: () => 'Logistic Name' }),
    columnHelper.accessor('kategori', { header: () => 'Category' }),

    // --- Physical Dimensions & Properties ---
    columnHelper.accessor('panjang_cm', { header: () => 'Length (cm)' }),
    columnHelper.accessor('lebar_cm', { header: () => 'Width (cm)' }),
    columnHelper.accessor('tinggi_cm', { header: () => 'Height (cm)' }),
    columnHelper.accessor('volume_cm3', { header: () => 'Volume (cm³)' }),
    columnHelper.accessor('berat_kg', { header: () => 'Weight (kg)' }),
    columnHelper.accessor('density_kg_per_cm3', { header: () => 'Density (kg/cm³)' }),
    columnHelper.accessor('fragility_0_1', { header: () => 'Fragility (0-1)' }),
    columnHelper.accessor('stackability_0_1', { header: () => 'Stackability (0-1)' }),
    columnHelper.accessor('orientation_flexibility', { header: () => 'Orientation Flexibility' }),
    columnHelper.accessor('durability', { header: () => 'Durability' }),
    columnHelper.accessor('jenis_packaging', { header: () => 'Packaging Type' }),

    // --- Date/Time & Shelf Life ---
    columnHelper.accessor('tanggal_produksi', { header: () => 'Production Date' }),
    columnHelper.accessor('tanggal_kadaluarsa', { header: () => 'Expiry Date' }),
    columnHelper.accessor('days_to_expiry', { header: () => 'Days to Expiry' }),
    columnHelper.accessor('shelf_life_days', { header: () => 'Shelf Life (days)' }),

    // --- Shipment Details ---
    columnHelper.accessor('lokasi_asal', { header: () => 'Origin Location' }),
    columnHelper.accessor('lokasi_tujuan', { header: () => 'Destination Location' }),
    columnHelper.accessor('jarak_km', { header: () => 'Distance (km)' }),
    columnHelper.accessor('eta_hari', { header: () => 'ETA (Days)' }),
    columnHelper.accessor('urgensi_pengiriman_1_5', { header: () => 'Shipping Urgency (1-5)' }),

    // --- Value & Cost ---
    columnHelper.accessor('nilai_barang_idr', { header: () => 'Item Value (IDR)' }),
    columnHelper.accessor('prioritas_pelanggan', { header: () => 'Customer Priority' }),

    // --- Environmental Conditions ---
    columnHelper.accessor('temperatur_c', { header: () => 'Temperature (°C)' }),
    columnHelper.accessor('kelembaban_ideal_pct', { header: () => 'Ideal Humidity (%)' }),

] as ColumnDef<LogisticModel, unknown>[];

const props = defineProps<{
  paginate: number
}>()

// Keep the internal page size synchronized with the parent page's requested limit.
const pageSize = ref(props.paginate)

watch(() => props.paginate, (val) => {
  pageSize.value = val
})

const pageIndex = ref(0);

const paginationState = computed<PaginationState>(() => ({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
}));

// Calculate the client-side page count from the current API data.
const pageCount = computed(() => Math.ceil(logistics.value.length / pageSize.value));

// Apply pagination changes requested by TanStack Table.
const setPagination = (updater: ((prevState: PaginationState) => PaginationState) | PaginationState) => {
    const newState = typeof updater === 'function' ? updater(paginationState.value) : updater;
    pageIndex.value = newState.pageIndex;
    pageSize.value = newState.pageSize;
};

// Getters let TanStack read Vue's latest reactive data and pagination state.
const table = useVueTable({
    get data() { return logistics.value },
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
