<template>
    <div>
        <AdminLayout :title="'bin packing and schedule optimization'">
            <div class="w-full h-[50vh] flex justify-between gap-12">
                <div class="w-full h-full p-6 bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300">
                    <div
                        class="w-full h-full p-6 bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300">

                        <!-- Drop zone -->
                        <div class="w-full h-full p-4 flex flex-col justify-between gap-5 items-center border-3 border-dashed rounded-xl transition-all"
                            :class="dropZoneActive ? 'border-[#356AAC] bg-[#356AAC]/20' : 'border-slate-300'"
                            @drop="handleDrop" @dragover="handleDragOver" @dragleave="handleDragLeave">
                            <DocumentTextIcon class="text-[#356AAC]/50" />
                            <p class="text-lg font-medium text-[#356AAC]/50">
                                Drag and drop CSV file here
                            </p>

                            <button
                                class="w-full p-3 rounded-xl bg-[#356AAC]/25 backdrop-blur-2xl cursor-pointer text-white text-lg font-medium hover:bg-[#356AAC]/50"
                                @click="handleClickUpload">
                                Add New Logistic
                            </button>

                            <!-- Hidden input for file picker -->
                            <input type="file" ref="fileInput" class="hidden" accept=".csv"
                                @change="handleFileSelect" />
                        </div>
                    </div>
                </div>
                <div
                    class="w-[50%] h-full py-6 space-y-2 bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 overflow-y-hidden">
                    <h1 class="font-bold text-2xl text-[#13273E] ml-6 mb-3">Logistic Files List</h1>
                    <div class="h-full px-6 space-y-2 snap-y snap-mandatory overflow-y-auto pb-12">
                        <!-- <div v-for="i in 8"
                            class="w-full flex justify-between p-3 bg-white/85 backdrop-blur-2xl border border-slate-300 rounded-xl snap-start scroll-my-8 ">
                            <div class="text-[#13273E] font-medium">
                                <h1 class="text-lg">File Title Here</h1>
                                <p class="text-sm font-normal">Monday 09/09/2025</p>
                            </div>
                            <div class="text-[#13273E] flex flex-col items-center justify-center">
                                <DocumentTextIcon class="size-7" />
                                <p class="text-sm">100 Mb</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div v-if="uploadedRows.length > 0"
                class="p-6 bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 space-y-8">
                <h2 class="font-bold text-[#13273E] text-3xl whitespace-nowrap leading-none">
                    CSV Data Preview
                </h2>

                <div
                    class="w-full max-h-[560px] overflow-hidden rounded-3xl border-3 border-[#77a3dd] overflow-y-scroll overflow-x-scroll">
                    <table class="min-w-full text-lg">
                        <thead class="font-semibold text-white bg-[#688FC1] sticky top-0 z-10">
                            <tr>
                                <th v-for="(val, key) in uploadedRows[0]" :key="key"
                                    class="border-2 border-[#688FC1] px-3 p-2">
                                    {{ key }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="(row, i) in uploadedRows" :key="i" class="border-t-3 border-[#77a3dd]">
                                <td v-for="(val, key) in row" :key="key" class="border-r-3 border-[#77a3dd] px-3 p-2">
                                    {{ val }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="w-full flex justify-end gap-4">
                    <div v-if="isLoading" class="min-h-12 min-w-12 bg-green-500 rounded-full animate-bounce">
                    </div>

                    <button @click="submitCSV"
                        class="flex items-center py-2 px-8 font-bold bg-[#cbe1ff] hover:bg-[#9fc0f0] cursor-pointer rounded-full">
                        Submit
                    </button>
                </div>
            </div>
            <div class="flex gap-6 justify-between h-58 mb-28">
                <div class="w-[30%] h-58 flex flex-col justify-between">
                    <div v-on:click="isLogisticChart = !isLogisticChart"
                        class="w-full h-[55%] p-6 bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 flex justify-center items-center gap-3 group hover:bg-[#356AAC]/20 cursor-pointer">
                        <ChartPieIcon class="size-20 text-[#356AAC]/50 group-hover:text-[#356AAC]/35" />
                        <p class="text-center text-[#356AAC]/50 text-xl group-hover:text-[#356AAC]/35">Latest Logistics
                        </p>
                    </div>

                    <div
                        class="relative w-full h-[35%] bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 flex justify-center items-center gap-3 group hover:bg-[#356AAC]/20 cursor-pointer">
                        <p v-on:click="isLogAmount = !isLogAmount"
                            class="text-center text-lg text-[#356AAC]/50 group-hover:text-[#356AAC]/35">
                            Logistic Amount
                            <br>
                            <span class="text-sm">( Amounts: {{ paginate }} )</span>
                        </p>
                        <ChevronDownIcon class="size-8 text-[#356AAC]/50 group-hover:text-[#356AAC]/35" />
                        <div v-show="isLogAmount"
                            class="absolute -bottom-26 left-0 w-full bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 p-2 text-[#356AAC]/50">
                            <label class="font-bold">Amount of Logistics</label>
                            <input v-model="paginate" type="number"
                                class="w-full mt-2 border border-slate-100 p-2 rounded-xl bg-white z-50">
                        </div>
                    </div>
                </div>
                <div
                    class="w-full h-full bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 flex justify-center items-center">
                    <button @click="sendToPredict"
                        class="w-[80%] h-36 rounded-full overflow-hidden p-3 relative group cursor-pointer">
                        <div
                            :class="['absolute -left-32 -top-40 bg-linear-to-r from-[#52D9E0]/50 w-[800px] h-[800px] transition-all duration-900', isLoading ? 'animate-spin to-[#FFF]/75' : 'to-[#356AAC]/50  group-hover:rotate-180']">
                        </div>
                        <div
                            :class="['w-full h-full bg-[#356AAC]/5 group-hover:bg-[#356AAC]/20 backdrop-blur-2xl rounded-full flex justify-center items-center font-bold text-4xl', isLoading ? 'text-[#0f325e]' : 'text-white']">
                            GENERATE NOW
                        </div>
                    </button>
                </div>
                <div class="w-[30%] h-58 flex flex-col justify-between">
                    <div v-on:click="isMoreInformation = !isMoreInformation"
                        class="w-full h-[45%] bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 flex justify-center items-center gap-3 group hover:bg-[#356AAC]/20 cursor-pointer">
                        <InformationCircleIcon class="size-12 text-[#356AAC]/50 group-hover:text-[#356AAC]/35" />
                        <p class="text-center text-lg text-[#356AAC]/50 group-hover:text-[#356AAC]/35">More Information
                        </p>
                    </div>

                    <div v-on:click="isDataSource = !isDataSource"
                        class="relative w-full h-[45%] bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 flex justify-center items-center gap-3 group hover:bg-[#356AAC]/20 cursor-pointer">
                        <p class="text-center text-lg text-[#356AAC]/50 group-hover:text-[#356AAC]/35">
                            Data Source
                            <br>
                            <span class="text-sm">( {{ DataSource }} )</span>
                        </p>
                        <ChevronDownIcon class="size-8 text-[#356AAC]/50 group-hover:text-[#356AAC]/35" />
                        <div v-show="isDataSource"
                            class="absolute -bottom-34 left-0 w-full bg-[#356AAC]/10 backdrop-blur-2xl rounded-3xl border border-slate-300 p-2 text-[#356AAC]/50">
                            <label class="font-bold">Choose Source for Predict</label>
                            <div @click="[DataSource = 'database']"
                                :class="['w-full p-2 rounded-xl hover:bg-white/25', DataSource == 'database' && 'bg-white/50']">
                                Database
                            </div>
                            <div @click="[DataSource = 'new csv file']"
                                :class="['w-full p-2 rounded-xl hover:bg-white/25', DataSource == 'new csv file' && 'bg-white/50']">
                                New CSV File
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <h2 v-show="placements.length > 0" class="font-bold text-[#13273E] text-3xl whitespace-nowrap leading-none">
                Generated Results
            </h2>

            <div v-show="placements.length > 0"
                class="w-full max-h-[800px] overflow-y-scroll overflow-x-scroll rounded-xl border-3 border-[#77a3dd]">

                <h1 class="font-bold text-[#13273E] text-2xl whitespace-nowrap leading-none sticky top-0 bg-white z-10 px-4 py-2">
                    Performance Charts
                </h1>

                <h2 class="font-bold text-[#13273E] text-xl whitespace-nowrap leading-none w-full flex justify-center px-4 py-6 mt-8">Q Value Convergent</h2>
                <img src="/public/Q_Value.png" alt="" class="h-[640px] w-full object-fill">

                <h2 class="font-bold text-[#13273E] text-xl whitespace-nowrap leading-none w-full flex justify-center px-4 py-6 mt-8">Reward per Step</h2>
                <RewardChart v-if="rewardHistory.length" :data="rewardHistory"/>

                <h2 class="font-bold text-[#13273E] text-xl whitespace-nowrap leading-none w-full flex justify-center px-4 py-6 mt-8">Cumulative Reward</h2>
                <RewardChart v-if="cumulativeReward.length" :data="cumulativeReward"/>

                <h2 class="font-bold text-[#13273E] text-xl whitespace-nowrap leading-none w-full flex justify-center px-4 py-6 mt-8">Bin Utilization</h2>
                <RewardChart v-if="utilizationHistory.length" :data="utilizationHistory"/>

                <div class="font-bold text-[#13273E] text-xl whitespace-nowrap leading-none w-full flex justify-center px-4 py-6 mt-8">
                    Placement Success Rate:
                    {{ (successRate * 100).toFixed(2) }}%
                </div>
            </div>

            <div v-show="placements.length > 0"
                class="w-full max-h-[560px] overflow-y-scroll overflow-x-scroll rounded-xl border-3 border-[#77a3dd]">

                <table class="min-w-full text-lg border-collapse">

                    <thead class="font-semibold text-white bg-[#688FC1] sticky top-0 z-10">
                        <tr>
                            <th v-for="header in tableHeaders" :key="header"
                                class="border-x-2 border-[#77a3dd] px-3 p-2 text-center bg-[#688FC1]">
                                {{ header }}
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white">
                        <tr v-for="(row, rowIndex) in placements" :key="rowIndex" :class="{
                            'border-t-3 border-[#77a3dd]': true,
                            'bg-[#77a3dd]/15': rowIndex % 2 === 1
                        }">
                            <td v-for="header in tableHeaders" :key="header"
                                class="border-r-3 border-[#77a3dd] px-3 p-2 text-center">
                                <!-- num -->
                                <template v-if="header === 'num'">
                                    {{ rowIndex + 1 }}
                                </template>

                                <!-- array -->
                                <template v-else-if="Array.isArray(row[header as keyof Placement])">
                                    {{ (row[header as keyof Placement] as number[]).join(', ') }}
                                </template>

                                <!-- normal -->
                                <template v-else>
                                    {{ row[header as keyof Placement] }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button v-show="placements.length > 0" @click="uploadDistributions"
                class="flex items-center py-2 px-8 font-bold bg-[#cbe1ff] hover:bg-[#9fc0f0] cursor-pointer rounded-full">
                Submit Distributions
            </button>

        </AdminLayout>
        <div v-show="isLogisticChart" v-on:click="isLogisticChart = !isLogisticChart"
            class="fixed w-screen h-screen bg-black/25 top-0 flex justify-center items-center">
            <div class="bg-white/50 backdrop-blur-3xl w-[60%] p-6 rounded-3xl border border-slate-300 space-y-6">
                <h1 class="text-[#13273E] text-2xl whitespace-nowrap leading-none font-bold">
                    Latest Logistics List
                </h1>
                <LogisticTable :paginate="paginate" />
            </div>
        </div>
        <div v-show="isMoreInformation" v-on:click="isMoreInformation = !isMoreInformation"
            class="fixed w-screen h-screen bg-black/25 top-0 flex justify-center items-center">
            <div class="bg-white/50 backdrop-blur-3xl w-[50%] p-6 rounded-3xl border border-slate-300">
                <h1 class="text-[#13273E] text-2xl whitespace-nowrap leading-none font-bold">
                    More Information About Bin Packing AI
                </h1>
                <p>

                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/layout/admin.vue';
import { DocumentTextIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { ChartPieIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const { $api } = useNuxtApp()
import Papa from "papaparse";
import { Convert, type LogisticModel } from '~/models/LogisticModel';
import type { Placement } from '~/models/PlacementsModel';

type PredictResponse = {
    reward: number
    reward_history: number[]
    cumulative_reward: number[]
    utilization_history: number[]
    placement_success_rate: number
    placements: any[]
}

const placement = ref<Placement | null>(null);
const placements = ref<Placement[]>([]);

const dropZoneActive = ref(false)
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const selectedFile = ref<File | null>(null);
const predictionResult = ref<any>(null);

const isMoreInformation = ref(false);
const isLogisticChart = ref(false);
const isLogAmount = ref(false);
const isDataSource = ref(false);
const DataSource = ref("new csv file");

const paginate = ref(50);

const handleClickUpload = () => {
    fileInput.value!.click()
}

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return;

    selectedFile.value = file;
    parseCSV(file);
}

const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    dropZoneActive.value = false

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    selectedFile.value = file;
    parseCSV(file);
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    dropZoneActive.value = true
}

const handleDragLeave = (event: DragEvent) => {
    dropZoneActive.value = false
}

const uploadedRows = ref<any[]>([])


function convertRowToLogistic(row: Record<string, string>): LogisticModel {
    const toFloat = (v: string | null | undefined): number | null =>
        v === "" || v == null ? null : parseFloat(v)

    const toInt = (v: string | null | undefined): number | null =>
        v === "" || v == null ? null : parseInt(v)

    const toBool = (v: string | null | undefined): boolean =>
        v != null &&
        (v.toString().toLowerCase() === "true" ||
            v === "1")

    return {
        ID: 0,
        CreatedAt: new Date(row.CreatedAt),
        UpdatedAt: new Date(row.UpdatedAt),
        DeletedAt: null,
        logistic_id: row.logistic_code,
        logistic_name: row.logistic_name,

        panjang_cm: parseFloat(row.panjang_cm),
        lebar_cm: parseFloat(row.lebar_cm),
        tinggi_cm: parseFloat(row.tinggi_cm),
        volume_cm3: parseFloat(row.volume_cm3),
        berat_kg: parseFloat(row.berat_kg),
        density_kg_per_cm3: parseFloat(row.density_kg_per_cm3),

        fragility_0_1: parseFloat(row.fragility_0_1),
        stackability_0_1: parseFloat(row.stackability_0_1),

        orientation_flexibility: row.orientation_flexibility,
        kategori: row.kategori,

        tanggal_produksi: row.tanggal_produksi,
        tanggal_kadaluarsa: row.tanggal_kadaluarsa,

        days_to_expiry: toInt(row.days_to_expiry) ?? 0,
        shelf_life_days: toInt(row.shelf_life_days) ?? 0,

        durability: row.durability,
        urgensi_pengiriman_1_5: toInt(row.urgensi_pengiriman_1_5) ?? 0,

        lokasi_asal: row.lokasi_asal || null,
        lokasi_tujuan: row.lokasi_tujuan || null,

        jarak_km: toFloat(row.jarak_km),

        mode_transport: row.mode_transport || null,

        eta_hari: toInt(row.eta_hari) ?? 0,

        nilai_barang_idr: parseFloat(row.nilai_barang_idr),

        prioritas_pelanggan: row.prioritas_pelanggan,

        asuransi: toBool(row.asuransi),

        biaya_simpan_per_hari_idr: toFloat(row.biaya_simpan_per_hari_idr),
        biaya_transport_idr: toFloat(row.biaya_transport_idr),

        temperatur_c: parseFloat(row.temperatur_c),
        kelembaban_ideal_pct: parseFloat(row.kelembaban_ideal_pct),

        jenis_packaging: row.jenis_packaging || null,

        barcode: row.barcode,
        batch_number: row.batch_number || null,

        mode_darat: toBool(row.mode_darat),
        mode_laut: toBool(row.mode_laut),
        mode_udara: toBool(row.mode_udara)
    }
}

let rows: LogisticModel[]

const parseCSV = (file: File) => {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            rows = results.data.map((r: any) =>
                convertRowToLogistic(r)
            )
            uploadedRows.value = results.data

            alert("Upload selesai!")
        }
    })
}

async function submitCSV() {
    try {
        isLoading.value = true
        for (const row of rows) {
            await $api.post("/logistics", row)
        }
        isLoading.value = false
    } catch (err) {
        console.error("Failed to insert:", err)
        isLoading.value = false
    }
}

async function generateCSVFromAPI() {
    const res = await $api.get('/logistics')

    const data: LogisticModel[] = res.data

    if (!data || data.length === 0) {
        console.error("Data is empty")
        return
    }

    const limited = data.slice(0, Number(paginate.value))

    const headers = Object.keys(limited[0]).join(",") + "\n"

    const rows = limited
        .map((row: LogisticModel) => Object.values(row).join(","))
        .join("\n")

    const csvText = headers + rows

    selectedFile.value = new File([csvText], "logistics.csv", {
        type: "text/csv",
    })
}

const rewardHistory = ref<number[]>([])
const cumulativeReward = ref<number[]>([])
const utilizationHistory = ref<number[]>([])
const successRate = ref<number>(0)

const sendToPredict = async () => {

    if (!selectedFile.value) {
        alert("There's no uploaded file!");
        return;
    }

    const form = new FormData();
    form.append("file", selectedFile.value);

    isLoading.value = true;

    try {
        const res = await $fetch<PredictResponse>(
            "http://localhost:8080/api/v1/predict",
            {
                method: "POST",
                body: form
            }
        );

        predictionResult.value = res.reward;
        placements.value = res.placements;

        rewardHistory.value = res.reward_history;
        cumulativeReward.value = res.cumulative_reward;
        utilizationHistory.value = res.utilization_history;
        successRate.value = res.placement_success_rate;

    } catch (err) {
        console.error(err);
        alert("Error predict");
    }

    isLoading.value = false;
};

const logistics = ref<LogisticModel[]>([]);

async function loadLogistics() {
    const response = await $api.get('/logistics')
    logistics.value = Convert.toLogisticModel(JSON.stringify(response.data));

    console.log(logistics.value[0])
}

const getIDByBarcode = (barcode: string) => {
    console.log("MENCARI BARCODE:", barcode)

    const data = logistics.value.find(item => String(item.barcode) === String(barcode))

    if (!data) {
        console.warn("Barcode tidak ditemukan:", barcode)
        return 0
    }

    console.log('ini IDnya: ', data.ID)
    return data.ID
}

const form = ref({
    logistic_id: 0,
    transportation_id: 0,
    x_range: 0,
    y_range: 0,
    z_range: 0,
    orientation_index: 0
})

const uploadDistributions = async () => {
    await loadLogistics()

    try {
        for (const p of placements.value) {
            const id = await Number(getIDByBarcode(p.item_id))
            console.log('ini id yg mau dikirim: ', id)

            form.value.logistic_id = id
            form.value.transportation_id = p.bin_index + 1
            form.value.x_range = p.x_cm
            form.value.y_range = p.y_cm
            form.value.z_range = p.z_cm
            form.value.orientation_index = p.orientation_index

            console.log('form id: ', form.value.logistic_id)

            await $api.post("/distributions", form.value)
        }

    } catch (err) {
        console.error(err)
    }
}

const tableHeaders: (keyof Placement | "num")[] = [
    "num",
    "bin",
    "bin_index",
    "bin_L_cm",
    "bin_W_cm",
    "bin_H_cm",
    "item_id",
    "row_index",
    "orientation_index",
    "dims_lwh_cm",
    "l_cm",
    "w_cm",
    "h_cm",
    "x_cm",
    "y_cm",
    "z_cm",
    "weight_kg",
    "days_to_expiry",
    "urgency_1_5",
    "durability"
];

</script>