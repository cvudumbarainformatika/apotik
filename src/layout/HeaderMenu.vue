<template>
   <header class="absolute top-0 left-0 w-full h-[60px] px-4 pt-2 text-sm text-primary">
    <u-view flex1 class="gap-2 ">
      <u-row class="">
        <img src="/images/logo.svg" alt="Logo" class="w-10 h-10" />
        <div>Apotik Udumbara</div>
      </u-row>
      <u-row flex1 right class="">
        <!-- header desktop -->
        <div class="hidden md:flex items-center gap-6 text-sm ">
          <div
            v-for="menu in menus"
            :key="menu.name"
            class="relative"
            @mouseenter="handleEnter(menu.name)"
            @mouseleave="handleLeave(menu.name)"
          >
            <button
              class="transition px-3 py-2 rounded-lg hover:bg-grady-primary hover:text-background hover:shadow-primary"
              :class="{
                'bg-grady-primary text-background shadow-primary': openMenu === menu.name
              }"
              @click="menu.submenu.length ? toggleMenu(menu.name) : goTo(menu.url)"
            >
              <u-row>
                <span class="">{{ menu.label }}</span>
                  <svg
                    v-if="menu.submenu.length"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[14px] h-[14px] transition-transform duration-300 ease-in-out"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      :class="{ 'rotate-95': openMenu === menu.name }"
                    >
                    <path
                      fill-rule="evenodd"
                      d="M6.5 4.5a.5.5 0 0 1 .79-.41l7 5a.5.5 0 0 1 0 .82l-7 5a.5.5 0 0 1-.79-.41v-10z"
                      clip-rule="evenodd"
                    />
                  </svg>
              </u-row>
            </button>

            <transition 
              name="fade"
              appear
              enter-active-class="transition-opacity duration-150 ease-out"
              leave-active-class="transition-opacity duration-100 ease-in"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              >
              <div
                v-if="openMenu === menu.name && menu.submenu.length"
                :ref="el => dropdownRefs[menu.name] = el"
                class="absolute top-full mt-4 w-max max-w-[320px] bg-light-primary text-background border shadow-lg rounded-md py-2 z-50"
                style="left: 0;"
                @mouseenter="clearHoverTimeout"
                @mouseleave="handleLeave(menu.name)"
              >
                <button
                  v-for="sub in menu.submenu"
                  :key="sub.name"
                  @click="goTo(sub.url)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-background hover:bg-primary hover:text-secondary transition"
                >
                  <span class="w-1.5 h-1.5 bg-background rounded-full shrink-0"></span>
                  <span class="truncate block max-w-full text-xs font-light">{{ sub.label }}</span>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- header mobile -->
        <MobileMenu :menus="menus" />
      </u-row>
    </u-view>
  </header>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed, defineAsyncComponent } from 'vue'

import { useRouter } from 'vue-router'


const MobileMenu = defineAsyncComponent(() => import('./MobileMenu.vue'))


// KHusus Desktop
const router = useRouter()
const dropdownDirection = ref({})
const dropdownRefs = ref({})



const openMenu = ref(null)
onMounted(() => {
  console.log('layout mounted');

})

watch(openMenu, (val) => {
  if (val) adjustDropdownPosition(val)
})

const menus = ref([
  {
    name: 'dashboard',
    label: 'Dashboard',
    url: '/',
    submenu: []
  },
  {
    name: 'master',
    label: 'Master',
    url: '/master',
    submenu: [
      {
        name: 'satuan',
        label: 'Master Satuan',
        url: '/master/satuan',
      },
      {
        name: 'jenis',
        label: 'Master Jenis',
        url: '/master/jenis',
      },
    ]
  },
  {
    name: 'transaksi',
    label: 'Transaksi',
    url: '/transaksi',
    submenu: [
      {
        name: 'penjualan',
        label: 'Transaksi Penjualan',
        url: '/transaksi/penjualan',
      },
      {
        name: 'pembelian',
        label: 'Transaksi Pembelian',
        url: '/transaksi/pembelian',
      },
    ]
  },
  
])


function toggleMenu(name) {
  openMenu.value = openMenu.value === name ? null : name
}

function goTo(url) {
  // router.push(url)
  // openMenu.value = null
  console.log('url',url);
  
}

function adjustDropdownPosition(menuName) {
  nextTick(() => {
    requestAnimationFrame(() => {
      const el = dropdownRefs.value[menuName]
      if (!el?.getBoundingClientRect) return

      const rect = el.getBoundingClientRect()
      const overflowRight = rect.right > window.innerWidth

      if (overflowRight) {
        el.style.left = 'auto'
        el.style.right = '0'
      } else {
        el.style.left = '0'
        el.style.right = 'auto'
      }
    })
  })
}

let hoverTimeout = null

function handleEnter(name) {
  // console.log('handleEnter');
  clearTimeout(hoverTimeout)
  openMenu.value = name
}

function handleLeave(name) {
  // console.log('handleLeave');
  hoverTimeout = setTimeout(() => {
    if (openMenu.value === name) openMenu.value = null
  }, 100) // kasih delay 100ms supaya tidak flicker
}

function clearHoverTimeout() {
  clearTimeout(hoverTimeout)
}

</script>

<style>
</style>