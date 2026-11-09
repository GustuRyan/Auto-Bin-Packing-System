<template>
    <!-- Admin shell: background decoration, navigation, page heading, and content slot. -->
    <div class="overflow-hidden bg-[#F7F7F7] relative w-full min-h-screen h-full p-12 flex justify-center">
        <div class="absolute w-full max-w-[1400px] h-full">
            <Navbar />
            <div
                class="w-[760px] lg:w-[970px] h-[605px] lg:h-[805px] rounded-full left-[-25%] top-[-12%] absolute bg-[#356AAC]/30 blur-[80px] lg:blur-[120px]">
            </div>
            <div
                class="w-[480px] lg:w-[1200px] h-[375px] lg:h-[705px] rounded-full right-[-30%] top-[40%] absolute bg-[#52D9E0]/30 blur-[80px] lg:blur-[120px]">
            </div>
        </div>
        <div
            class="overflow-hidden bg-white/55 backdrop-blur-3xl w-full max-w-[1400px] min-h-screen h-full rounded-[40px] shadow-lg border-2 border-[#2A2A2A]/10 px-14 py-10 space-y-10">
            <div class="flex items-center gap-10">
                <img src="/public/icon-back-primary.svg" alt="" class="hover:opacity-75">
                <div class="space-y-2 font-bold text-[#356AAC] text-[40px] uppercase">
                    <span>
                        {{ status }}
                    </span>
                    <h1 class="text-[#13273E]" :class="route.fullPath == '/ai-model' ? 'text-[44px]' : 'text-5xl'">
                        {{ title }}
                    </h1>
                </div>
            </div>
            <div class="w-full h-0.5 bg-[#13273E]/25 rounded-full"></div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/navbar.vue';

const route = useRoute()
const status = ref('')
// The AI page uses a more specific section label than regular admin pages.
status.value = route.fullPath == '/ai-model' ? 'ai model' : 'admin'

defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>
