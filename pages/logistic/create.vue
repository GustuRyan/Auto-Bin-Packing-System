<template>
    <div>
        <AdminLayout :title="'add new logistic'">
            <form @submit.prevent="submitForm" class="w-full flex gap-8 text-lg">

                <!-- LEFT FORM -->
                <div
                    class="w-[60%] h-screen p-4 rounded-2xl overflow-hidden overflow-y-scroll border-2 border-slate-100 shadow-lg space-y-4">

                    <label class="font-bold">Logistic Name</label>
                    <input v-model="form.logistic_name" type="text" required placeholder="Enter logistic name"
                        class="input-style">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Logistic ID</label>
                        <input v-model="form.logistic_id" type="text" required placeholder="Enter ID" class="input-style">

                        <label class="font-bold">Barcode</label>
                        <input v-model="form.barcode" type="text" required placeholder="Enter barcode" class="input-style">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Length (cm)</label>
                        <input v-model="form.panjang_cm" type="number" required placeholder="Length" class="input-style">

                        <label class="font-bold">Width (cm)</label>
                        <input v-model="form.lebar_cm" type="number" required placeholder="Width" class="input-style">

                        <label class="font-bold">Height (cm)</label>
                        <input v-model="form.tinggi_cm" type="number" required placeholder="Height" class="input-style">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Volume (cm³)</label>
                        <input v-model="form.volume_cm3" type="number" required placeholder="Volume" class="input-style">

                        <label class="font-bold">Weight (kg)</label>
                        <input v-model="form.berat_kg" type="number" required placeholder="Weight" class="input-style">
                    </div>

                    <label class="font-bold">Density (kg/cm³)</label>
                    <input v-model="form.density_kg_per_cm3" type="number" required min="0" max="1" step="0.0001" placeholder="Density" class="input-style">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Orientation</label>
                        <input v-model="form.orientation_flexibility" type="text" placeholder="e.g. flexible"
                            class="input-style">

                        <label class="font-bold">Kategori</label>
                        <input v-model="form.kategori" type="text" placeholder="Kategori" class="input-style">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Fragility (0–1)</label>
                        <input v-model.number="form.fragility_0_1" type="number" required min="0" max="1" step="0.001"
                            class="input-style">

                        <label class="font-bold">Stackability (0–1)</label>
                        <input v-model.number="form.stackability_0_1" type="number" required min="0" max="1" step="0.001"
                            class="input-style">
                    </div>

                    <label class="font-bold">Urgency (1–5)</label>
                    <input v-model="form.urgensi_pengiriman_1_5" type="number" required placeholder="1–5" class="input-style">

                    <label class="font-bold">Priority</label>
                    <input v-model="form.prioritas_pelanggan" type="text" required placeholder="normal / high / vip"
                        class="input-style">

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Days to Expiry</label>
                        <input v-model="form.days_to_expiry" type="number" required placeholder="e.g. 150" class="input-style">

                        <label class="font-bold">Shelf Life (days)</label>
                        <input v-model="form.shelf_life_days" type="number" required placeholder="e.g. 180" class="input-style">

                        <label class="font-bold">Durability</label>
                        <input v-model="form.durability" type="text" required placeholder="low / medium / high"
                            class="input-style">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Distance (km)</label>
                        <input v-model="form.jarak_km" type="number" placeholder="Distance" class="input-style">

                        <label class="font-bold">Transport Mode</label>
                        <input v-model="form.mode_transport" type="text" placeholder="darat / laut / udara"
                            class="input-style">

                        <label class="font-bold">ETA (days)</label>
                        <input v-model="form.eta_hari" type="number" required placeholder="ETA" class="input-style">
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Item Value (IDR)</label>
                        <input v-model="form.nilai_barang_idr" type="number" required placeholder="Value" class="input-style">

                        <div class="p-2 bg-white rounded-lg flex items-center gap-3">
                            <label class="font-bold">Assurance</label>
                            <input v-model="form.asuransi" type="checkbox">
                        </div>
                    </div>

                    <div class="flex gap-3 items-center">
                        <label class="font-bold">Temperature (°C)</label>
                        <input v-model="form.temperatur_c" type="number" required placeholder="Temp" class="input-style">

                        <label class="font-bold">Humidity (%)</label>
                        <input v-model="form.kelembaban_ideal_pct" type="number" required placeholder="Humidity"
                            class="input-style">

                        <label class="font-bold">Packaging</label>
                        <input v-model="form.jenis_packaging" type="text" placeholder="Packaging type"
                            class="input-style">
                    </div>

                </div>

                <!-- RIGHT FORM -->
                <div
                    class="w-[40%] h-screen p-4 rounded-2xl overflow-hidden bg-white border-2 border-slate-100 shadow-lg flex flex-col justify-between">

                    <div class="space-y-4">
                        <label class="font-bold">Batch</label>
                        <input v-model="form.batch_number" type="text" placeholder="Batch number" class="input-style">

                        <label class="font-bold">Transportation Type</label>
                        <div class="flex justify-between items-center p-2 border border-slate-100 rounded-lg">
                            <label class="font-bold">Land</label>
                            <input v-model="form.mode_darat" type="checkbox">

                            <label class="font-bold">Sea</label>
                            <input v-model="form.mode_laut" type="checkbox">

                            <label class="font-bold">Air</label>
                            <input v-model="form.mode_udara" type="checkbox">
                        </div>

                        <div class="flex gap-3 items-center">
                            <label class="font-bold">Origin</label>
                            <input v-model="form.lokasi_asal" type="text" placeholder="Lokasi asal" class="input-style">

                            <label class="font-bold">Destination</label>
                            <input v-model="form.lokasi_tujuan" type="text" placeholder="Lokasi tujuan"
                                class="input-style">
                        </div>

                        <label class="font-bold">Production Date</label>
                        <input v-model="form.tanggal_produksi" type="datetime-local" required class="input-style">

                        <label class="font-bold">Expiry Date</label>
                        <input v-model="form.tanggal_kadaluarsa" type="datetime-local" required class="input-style">


                        <label class="font-bold">Store Cost / Day (IDR)</label>
                        <input v-model="form.biaya_simpan_per_hari_idr" type="number" required placeholder="Cost per day"
                            class="input-style">

                        <label class="font-bold">Transport Cost (IDR)</label>
                        <input v-model="form.biaya_transport_idr" type="number" required placeholder="Transport cost"
                            class="input-style">
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
import { ref } from "vue"
import AdminLayout from '~/layout/admin.vue'
const { $api } = useNuxtApp()

// FORM OBJECT
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

/* SUBMIT */
async function submitForm() {
    try {

        const payload = {
            ...form.value,
            tanggal_produksi: toRFC3339(form.value.tanggal_produksi),
            tanggal_kadaluarsa: toRFC3339(form.value.tanggal_kadaluarsa),
        }

        const response = await $api.post("/logistics", payload)

        alert("Success: Logistic saved!")
        console.log(response.data)

    } catch (err) {
        console.error(err)
        alert("Failed to submit")
    }
}

function toRFC3339(dt: string) {
    if (!dt) return "";
    return new Date(dt).toISOString();
}

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
