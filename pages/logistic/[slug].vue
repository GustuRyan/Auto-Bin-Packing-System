<template>
    <div>
        <AdminLayout :title="'edit logistic detail'">
            <form class="w-full flex gap-8 text-lg" @submit.prevent="submitForm">
                <div
                    class="w-[60%] h-screen p-4 rounded-2xl overflow-hidden overflow-y-scroll border-2 border-slate-100 shadow-lg space-y-4">

                    <label class="font-bold">Logistic Name</label>
                    <input type="text" v-model="form.logistic_name"
                        class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Logistic ID</label>
                        <input type="text" v-model="form.logistic_id"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Barcode</label>
                        <input type="text" v-model="form.barcode"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Length (cm)</label>
                        <input type="number" v-model="form.panjang_cm"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Width (cm)</label>
                        <input type="number" v-model="form.lebar_cm"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Height (cm)</label>
                        <input type="number" v-model="form.tinggi_cm"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Volume (cm3)</label>
                        <input type="number" v-model="form.volume_cm3"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Weight (kg)</label>
                        <input type="number" v-model="form.berat_kg"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <label class="font-bold">Density (kg/cm³)</label>
                    <input type="number" v-model="form.density_kg_per_cm3" min="0" max="1" step="0.0001"
                        class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Orientation</label>
                        <input type="text" v-model="form.orientation_flexibility"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Kategori</label>
                        <input type="text" v-model="form.kategori"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Fragility (0–1)</label>
                        <input type="number" step="0.01" v-model="form.fragility_0_1"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Stackability (0–1)</label>
                        <input type="number" step="0.01" v-model="form.stackability_0_1"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <label class="font-bold">Urgency (1–5)</label>
                    <input type="number" v-model="form.urgensi_pengiriman_1_5"
                        class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                    <label class="font-bold">Priority</label>
                    <input type="text" v-model="form.prioritas_pelanggan"
                        class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Days to Expiry</label>
                        <input type="number" v-model="form.days_to_expiry"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Shelf Life (days)</label>
                        <input type="number" v-model="form.shelf_life_days"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Durability</label>
                        <input type="text" v-model="form.durability"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Distance (km)</label>
                        <input type="number" v-model="form.jarak_km"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Mode</label>
                        <input type="text" v-model="form.mode_transport"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">ETA (days)</label>
                        <input type="number" v-model="form.eta_hari"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Item Value (IDR)</label>
                        <input type="number" v-model="form.nilai_barang_idr"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <div class="p-2 bg-white rounded-lg flex items-center gap-3">
                            <label class="font-bold">Assurance</label>
                            <input type="checkbox" v-model="form.asuransi" class="mt-2">
                        </div>
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Temperature (°C)</label>
                        <input type="number" v-model="form.temperatur_c"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Humidity (%)</label>
                        <input type="number" v-model="form.kelembaban_ideal_pct"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Packaging</label>
                        <input type="text" v-model="form.jenis_packaging"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                </div>

                <div
                    class="w-[40%] h-screen p-4 rounded-2xl overflow-hidden bg-white border-2 border-slate-100 shadow-lg flex flex-col justify-between">

                    <div class="space-y-4">
                        <label class="font-bold">Batch</label>
                        <input type="text" v-model="form.batch_number"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Transportation Type</label>
                        <div class="flex justify-between items-center p-2 border border-slate-100 rounded-lg">
                            <label class="font-bold">Land</label>
                            <input type="checkbox" v-model="form.mode_darat">

                            <label class="font-bold">Sea</label>
                            <input type="checkbox" v-model="form.mode_laut">

                            <label class="font-bold">Air</label>
                            <input type="checkbox" v-model="form.mode_udara">
                        </div>

                        <div class="flex gap-3 items-center">
                            <label class="font-bold">Origin</label>
                            <input type="text" v-model="form.lokasi_asal"
                                class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                            <label class="font-bold">Direction</label>
                            <input type="text" v-model="form.lokasi_tujuan"
                                class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                        </div>

                        <label class="font-bold">Production Date</label>
                        <input type="datetime-local" v-model="form.tanggal_produksi"
                            class="w-full border border-slate-100 p-2 rounded-lg">

                        <label class="font-bold">Expiry Date</label>
                        <input type="datetime-local" v-model="form.tanggal_kadaluarsa"
                            class="w-full border border-slate-100 p-2 rounded-lg">

                        <label class="font-bold">Store Cost / Day (IDR)</label>
                        <input type="number" v-model="form.biaya_simpan_per_hari_idr"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">

                        <label class="font-bold">Transport Cost (IDR)</label>
                        <input type="number" v-model="form.biaya_transport_idr"
                            class="w-full mt-2 border border-slate-100 p-2 rounded-lg bg-white">
                    </div>

                    <div class="w-full flex justify-end">
                        <button type="submit"
                            class="flex items-center py-2 px-8 font-bold bg-[#cbe1ff] hover:bg-[#9fc0f0] cursor-pointer rounded-full">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue'
import { Convert } from '~/models/OneLogisticModel'

const route = useRoute()
const slug = route.params.slug
const { $api } = useNuxtApp()

// FORM
const form = ref({
    logistic_name: "",
    logistic_id: "",
    barcode: "",
    panjang_cm: "",
    lebar_cm: "",
    tinggi_cm: "",
    volume_cm3: "",
    berat_kg: "",
    density_kg_per_cm3: "",
    orientation_flexibility: "",
    kategori: "",
    fragility_0_1: "",
    stackability_0_1: "",
    urgensi_pengiriman_1_5: "",
    prioritas_pelanggan: "",
    days_to_expiry: "",
    shelf_life_days: "",
    durability: "",
    jarak_km: "",
    mode_transport: "",
    eta_hari: "",
    nilai_barang_idr: "",
    asuransi: false,
    temperatur_c: "",
    kelembaban_ideal_pct: "",
    jenis_packaging: "",
    batch_number: "",
    mode_darat: false,
    mode_laut: false,
    mode_udara: false,
    lokasi_asal: "",
    lokasi_tujuan: "",
    tanggal_produksi: "",
    tanggal_kadaluarsa: "",
    biaya_simpan_per_hari_idr: "",
    biaya_transport_idr: ""
})

async function submitForm() {
    try {
        const payload = {
            ...form.value,
            tanggal_produksi: toRFC3339(form.value.tanggal_produksi),
            tanggal_kadaluarsa: toRFC3339(form.value.tanggal_kadaluarsa),
        }

        const response = await $api.put("/logistics/" + slug, payload)
        alert("Success updating logistic data!")
        console.log(response.data)
    } catch (err) {
        console.error(err)
        alert("Failed to submit")
    }
}

function toRFC3339(dt: string) {
    if (!dt) return ""
    return new Date(dt).toISOString()
}

function formatToDatetimeLocal(value: string | number | Date) {
    if (!value) return "";
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
}


async function loadLogistics() {
    const response = await $api.get('/logistics/' + slug)
    const data = Convert.toOneLogisticModel(JSON.stringify(response.data))

    Object.assign(form.value, data)
    form.value.tanggal_produksi = formatToDatetimeLocal(data.tanggal_produksi);
    form.value.tanggal_kadaluarsa = formatToDatetimeLocal(data.tanggal_kadaluarsa);
}

onMounted(loadLogistics)
</script>
