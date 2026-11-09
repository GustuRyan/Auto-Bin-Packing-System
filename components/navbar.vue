<template>
    <!-- Collapsible side navigation shared by the public and admin layouts. -->
    <div class="absolute z-50 transition delay-150 duration-300" :class="position">
        <div class="fixed h-screen flex items-center pb-24">
            <div @click="toggleOn" :class="menuToggle"
                class="relative group h-36 bg-[#18314F] hover:opacity-90 backdrop-blur-sm rounded-l-full flex items-center">
                <div class="absolute flex justify-center items-center h-7 rounded-full bg-[#18314F] -left-[14px] group-hover:-translate-x-5 transition"
                    :class="menuArrow">
                    <img src="/public/icon-toggle-arrow.svg" alt="" class="rotate-180 w-[14px]">

                </div>
            </div>
            <div v-on-click-outside="toggleOff" class="group space-y-5 transition-all ease-in-out delay-150 duration-500"
                :class="toggle">
                <NuxtLink :to="'/'" :class="homeToggle" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                    class="group/menu bg-[#356AAC] hover:bg-[#18314F] rounded-full flex justify-center items-center">
                    <img src="/public/icon-home.svg" alt="" class="w-6">
                    <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            Home
                        </div>
                </NuxtLink>
                <div
                    class="w-14 h-full bg-gradient-to-b from-[#356AAC] to-[#18314F] rounded-full">
                    <NuxtLink :to="'/logistic'" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                        class="group/menu size-14 hover:bg-[#18314F] rounded-full relative flex justify-center items-center">
                        <img src="/public/icon-products.svg" alt="" class="w-6">
                        <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            Logistic
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="'/transportation'" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                        class="group/menu size-14 hover:bg-[#18314F] rounded-full flex justify-center items-center">
                        <img src="/public/icon-transportation.svg" alt="" class="w-6">
                        <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            Transport
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="'/ai-model'" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                        class="group/menu size-14 hover:bg-[#18314F] rounded-full flex justify-center items-center">
                        <img src="/public/icon-ai.svg" alt="" class="w-6">
                        <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            AiPacking
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="'/distribution'" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                        class="group/menu size-14 hover:bg-[#18314F] rounded-full flex justify-center items-center">
                        <img src="/public/icon-distribution.svg" alt="" class="w-6">
                        <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            Distribution
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="'/employee'" :active-class="'bg-[#22446D] border-2 border-[#B4C6DD]'"
                        class="group/menu size-14 hover:bg-[#18314F] rounded-full flex justify-center items-center">
                        <img src="/public/icon-user.svg" alt="" class="w-6">
                        <div class="absolute left-16 bg-[#18314F] hidden group-hover/menu:flex p-2 text-white font-bold rounded-lg">
                            Employee
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'

const route = useRoute()

const position = ref('-left-7')
const menuToggle = ref('')
const homeToggle = ref('size-14')
const menuArrow = ref('w-0')
const toggle = ref('')

// The home page can collapse the menu; inner pages keep it visible.
var toggleOff = () => {}

const toggleOn = () => {
    position.value = '-left-7',
    toggle.value = 'opacity-100 w-14',
    menuToggle.value = menuArrow.value = 'w-0 opacity-0'
}

if (route.fullPath == '/') {
    toggleOff = () => {
        toggle.value = 'opacity-0 w-0'
        menuToggle.value = 'w-[14px]'
        menuArrow.value = 'w-7'
        position.value = '-left-3'
    }
} else {
    toggleOn()
    homeToggle.value = 'transition-all duration-300 ease-in-out size-0 group-hover:size-14'
}


</script>
