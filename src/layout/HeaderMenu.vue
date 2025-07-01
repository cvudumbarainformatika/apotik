<template>
   <header class="absolute top-0 left-0 w-full h-[60px] px-4 pt-2">
        <u-view flex1 class="gap-2">
          <u-row class="">
            <img src="/images/logo.svg" alt="Logo" class="w-10 h-10" />
          </u-row>
          <u-row flex1 right class="">
            <div class="flex items-center gap-6 text-sm font-medium text-gray-700">
          <div
            v-for="menu in menus"
            :key="menu.name"
            class="relative"
            @mouseenter="menu.submenu.length && (openMenu = menu.name)"
            @mouseleave="menu.submenu.length && (openMenu = null)"
            @pointerenter="handleEnter(menu.name)"
            @pointerleave="handleLeave(menu.name)"
          >
            <button
              class="hover:text-primary transition px-2 py-1 rounded-md hover:bg-primary/10"
              :class="{
                'bg-primary/10 text-primary font-medium': openMenu === menu.name
              }"
              @click="menu.submenu.length ? toggleMenu(menu.name) : goTo(menu.url)"
            >
              {{ menu.label }}
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
                class="absolute top-full mt-4 min-w-[12rem] bg-white border shadow-lg rounded-md py-2 z-50"
                style="left: 0;"

              >
                <button
                  v-for="sub in menu.submenu"
                  :key="sub.name"
                  @click="goTo(sub.url)"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition"
                >
                  <span class="w-2.5 h-2.5 bg-primary rounded-full shrink-0"></span>
                  <span>{{ sub.label }}</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
          </u-row>
        </u-view>
      </header>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'

import { useRouter } from 'vue-router'

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
  clearTimeout(hoverTimeout)
  openMenu.value = name
}

function handleLeave(name) {
  hoverTimeout = setTimeout(() => {
    if (openMenu.value === name) openMenu.value = null
  }, 100) // kasih delay 100ms supaya tidak flicker
}

</script>

<style>
/* untuk menu */
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>