<template>
    <!-- Public landing page describing the available transport services. -->
    <div>
        <MainLayout>
            <div class="relative">
                <img src="/public/img-wakatobi-hero.webp" alt="" class="h-[640px] w-full object-cover">
                <div class="bg-[#25C9D2]/10 w-full h-[640px] absolute z-20 top-0">
                    <div class="absolute bottom-[-210px] z-30 flex justify-between items-center gap-14 px-14 w-full">
                        <div
                            class="rounded-2xl p-7 bg-[#C5D1D0]/50 backdrop-blur-sm w-full h-[420px] flex flex-col gap-6">
                            <div class="w-full flex justify-between item-center">
                                <div class="rounded-full w-16 h-16 bg-[#18314F]"></div>
                                <p class="text-[#18314F] text-3xl font-bold w-[360px] text-right">
                                    Seamless Destinations. Reliable Logistics.
                                </p>
                            </div>
                            <div class="flex justify-between items-end h-full">
                                <div class="flex flex-col justify-between h-full">
                                    <p class="text-[#18314F] text-2xl font-bold w-[360px]">
                                        From exclusive island getaways to end-to-end transportation logistics, we connect people, places, and events with precision and comfort.
                                    </p>
                                    <div class="flex gap-3">
                                        <div class="w-14 h-6 rounded-[10px] bg-[#18314F]">
                                        </div>
                                        <div class="w-14 h-6 rounded-[10px] bg-[#18314F]">
                                        </div>
                                        <div class="w-14 h-6 rounded-[10px] bg-[#18314F]">
                                        </div>
                                    </div>
                                </div>
                                <div class="w-50 h-50 rounded-xl bg-[#18314F]"></div>
                            </div>
                        </div>
                        <div class="rounded-2xl p-7 bg-[#1F1F1F]/50 backdrop-blur-sm w-[70%] h-[300px]">
                            <p class="text-2xl font-bold text-white">
                                We provide integrated travel and logistics solutions designed to support events, corporate trips, and premium destinations. Our services ensure efficiency, safety, and unforgettable experiences—every step of the journey.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="my-[300px] space-y-28">
                    <h1 class="w-full text-center font-bold text-3xl uppercase">Transportation Services</h1>
                    <div class="w-full flex justify-between">
                        <div class="space-y-4 w-[46%] pl-14">
                            <h2 class="text-3xl font-bold">Guest & Logistic Transportation</h2>
                            <p class="text-2xl font-medium text-[#7A7A7A]">
                                Our air transportation services offer fast and secure mobility for guests, equipment, and essential logistics. Using reliable propeller aircraft, we ensure access to remote destinations while maintaining high safety and comfort standards—ideal for island travel, events, and urgent logistics.
                            </p>
                        </div>
                        <div class="relative w-[46%] flex items-center">
                            <div class="absolute group z-10 flex w-full h-full items-center justify-end pr-14 ">
                                <img src="/public/icon-folder-blue.svg" alt="" class="z-20 w-[424px] pb-8">
                                <img src="/public/img-propeller-airplane.png" alt="" class="absolute z-30 -right-32 -top-38 transition duration-1000 group-hover:-translate-x-40 group-hover:-translate-y-8 group-hover:-rotate-10 soft-bounce">
                                <div class="absolute z-20 group-hover:z-40 w-full left-36 bottom-2 leading-none transition duration-1000 group-hover:translate-x-12">
                                    <p class="text-white uppercase text-4xl font-medium">
                                        Guest &
                                        <br>
                                        Logistic
                                        <br>
                                        Transportation
                                    </p>
                                    <h1 class="font-bold text-[64px] text-white">
                                        Airplane
                                    </h1>
                                    <h1 class="font-bold text-[76px] text-white">
                                        Propeller
                                    </h1>
                                </div>
                            </div>
                            <div class="bg-[#1F1F1F]/50 w-full h-[360px]"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-between">
                        <div class="relative w-[46%] flex items-center">
                            <div class="absolute group z-10 flex w-full h-full items-center pl-14 ">
                                <img src="/public/icon-folder-blue.svg" alt="" class="z-20 w-[424px] pb-8 transform scale-x-[-1]">
                                <div class="absolute z-20 group-hover:z-40 w-[424px] left-20 top-1 leading-none transition-all duration-1000 group-hover:translate-x-8">
                                    <p class="text-white uppercase text-4xl font-medium">
                                        Hard Logistic
                                        <br>
                                        Transportation
                                    </p>
                                    <h1 class="font-bold text-[76px] text-end group-hover:text-start text-white">
                                        Container
                                    </h1>
                                    <h1 class="font-bold text-[64px] text-end group-hover:text-start text-white">
                                        Vessel
                                    </h1>
                                </div>
                                <img src="/public/img-container-vessel.png" alt="" class="absolute z-30 right-18 -bottom-28 transition duration-1000 group-hover:translate-x-32 group-hover:translate-y-5 group-hover:rotate-5 soft-move">
                            </div>
                            <div class="bg-[#1F1F1F]/50 w-full h-[360px]"></div>
                        </div>
                        <div class="space-y-4 w-[46%] pr-14 text-end">
                            <h2 class="text-3xl font-bold">Hard Logistic Transportation</h2>
                            <p class="text-2xl font-medium text-[#7A7A7A]">
                                We provide dependable sea freight solutions using container vessels capable of handling large-scale logistics. From event equipment to commercial cargo, our maritime services guarantee secure handling, efficient routes, and on-time delivery across regional and international waters.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </div>
</template>

<script setup lang="ts">
import MainLayout from '~/layout/main.vue';

</script>
