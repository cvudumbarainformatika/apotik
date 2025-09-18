<template>
  <u-modal persistent :title="title" @close="close">
    <template #default>
      <u-col flex1 class="w-full p-4 max-h-[70vh] overflow-auto">
        <div v-if="loading" class="text-gray-500">Loading...</div>

        <div v-else class="w-full">
          <div v-for="menu in menus" :key="menu.id" class="mb-4 border rounded-lg overflow-hidden">
            <!-- header menu -->
            <div class="bg-gray-100 px-3 py-2 font-semibold flex items-center gap-3">
              <input type="checkbox" :checked="selectedMenuIds.includes(menu.id)"
                @change="e => toggleMenu(menu.id, e.target.checked, menu.children)" />
              <span>{{ menu.title || menu.name }}</span>
            </div>

            <!-- daftar submenu -->
            <div v-if="menu.children?.length" class="p-3">
              <div v-for="sub in menu.children" :key="sub.id" class="flex items-center gap-3 py-1">
                <input type="checkbox" :checked="selectedSubIds.includes(`${menu.id}:${sub.id}`)"
                  @change="e => toggleSubmenu(menu, sub.id, e.target.checked)" />
                <span>{{ sub.title || sub.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </u-col>
    </template>

    <template #footer>
      <u-row flex1 class="w-full" right>
        <u-btn variant="secondary" label="Tutup" @click="close" />
        <u-btn :loading="saving" label="Simpan" @click="handleSave" />
      </u-row>
    </template>
  </u-modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { useNotify } from '@/composables/useNotify'

const props = defineProps({
  user: { type: Object, required: true },
  title: { type: String, default: 'Hak Akses' }
})
const emit = defineEmits(['close'])

const loading = ref(false)
const saving = ref(false)
const menus = ref([])

const selectedMenuIds = ref([])
const selectedSubIds = ref([])

const initialSet = ref(new Set())

async function loadData() {
  loading.value = true
  try {
    const res = await api.get('api/v1/setting/menu/get-list')
    const items = res.data?.data?.items ?? res.data?.data ?? []
    menus.value = items
  } catch (e) {
    console.error('load menus error', e)
    menus.value = []
  } finally {
    loading.value = false
  }
}

function toggleMenu(menuId, checked, children = []) {
  if (checked) {
    if (!selectedMenuIds.value.includes(menuId)) {
      selectedMenuIds.value.push(menuId)
    }
    children.forEach(sub => {
      const key = `${menuId}:${sub.id}`
      if (!selectedSubIds.value.includes(key)) {
        selectedSubIds.value.push(key)
      }
    })
  } else {
    selectedMenuIds.value = selectedMenuIds.value.filter(id => id !== menuId)
    selectedSubIds.value = selectedSubIds.value.filter(
      key => !key.startsWith(`${menuId}:`)
    )
  }
}

function toggleSubmenu(menu, subId, checked) {
  const key = `${menu.id}:${subId}`
  if (checked) {
    if (!selectedSubIds.value.includes(key)) {
      selectedSubIds.value.push(key)
    }
    if (!selectedMenuIds.value.includes(menu.id)) {
      selectedMenuIds.value.push(menu.id)
    }
  } else {
    selectedSubIds.value = selectedSubIds.value.filter(k => k !== key)
    const masihAda = menu.children.some(c =>
      selectedSubIds.value.includes(`${menu.id}:${c.id}`)
    )
    if (!masihAda) {
      selectedMenuIds.value = selectedMenuIds.value.filter(id => id !== menu.id)
    }
  }
}

async function handleSave() {
  if (!props.user?.id) return
  saving.value = true
  try {
    const currentSet = new Set()
    selectedMenuIds.value.forEach(id => {
      currentSet.add(`${id}:null`)
    })
    selectedSubIds.value.forEach(key => {
      currentSet.add(key)
    })

    const toGrant = []
    const toRevoke = []

    for (const item of currentSet) {
      if (!initialSet.value.has(item)) {
        const [menu_id, sub_id] = item.split(':')
        toGrant.push({
          menu_id: parseInt(menu_id),
          submenu_id: sub_id === 'null' ? null : parseInt(sub_id)
        })
      }
    }

    for (const item of initialSet.value) {
      if (!currentSet.has(item)) {
        const [menu_id, sub_id] = item.split(':')
        toRevoke.push({
          menu_id: parseInt(menu_id),
          submenu_id: sub_id === 'null' ? null : parseInt(sub_id)
        })
      }
    }

    if (toGrant.length) {
      await api.post('api/v1/setting/hak-akses/grant', {
        user_id: props.user.id,
        menus: toGrant
      })
    }
    if (toRevoke.length) {
      await api.post('api/v1/setting/hak-akses/revoke', {
        user_id: props.user.id,
        menus: toRevoke
      })
    }

    useNotify({ message: res.data.message ?? 'Berhasil Menyimpan data', type: 'success' })
    emit('close')
  } catch (e) {
    console.error('simpan hak akses error', e)
    alert('Gagal menyimpan hak akses.')
  } finally {
    saving.value = false
  }
}

function close() {
  emit('close')
}

onMounted(async () => {
  await loadData()

  if (props.user?.akses?.length) {
    props.user.akses.forEach(acc => {
      const key = `${acc.menu_id}:${acc.submenu_id ?? 'null'}`
      initialSet.value.add(key)

      if (!selectedMenuIds.value.includes(acc.menu_id)) {
        selectedMenuIds.value.push(acc.menu_id)
      }
      if (acc.submenu_id) {
        selectedSubIds.value.push(`${acc.menu_id}:${acc.submenu_id}`)
      }
    })
  }
})
</script>
