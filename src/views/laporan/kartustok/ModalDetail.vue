<template>
  <u-modal persistent :title="`${title}`" @close="emit('close')" size="xl">
    <template #default>
      <div id="printArea" ref="printArea" class=" max-w-full bg-white text-black mx-auto  p-4 print-a4">
        <div class="flex items-start justify-between gap-6">
          <div class="flex items-center gap-4">
            <img src="/images/logo.svg" alt="logo" class="w-14 h-14 object-contain" />
            <div>
              <div class="text-xl font-semibold tracking-wide">{{ company?.name || 'Nama Apotik nya' }}</div>
              <p class="text-sm text-gray-600">
                {{ company?.address || 'Alamat Apotik nya' }}<br />
                Tel: {{ company?.phone || '08123456789' }} • Email: {{ company?.email || 'email Apotik nya' }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <!-- <div class="inline-block px-3 py-1 rounded-full border text-sm uppercase tracking-wider">
              KARTU STOK
            </div> -->
            <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div class="text-gray-500"></div>
              <div class="font-bold uppercase">{{ store.item?.nama || '-' }}</div>
              <div class="text-gray-500">Kode:</div>
              <div class="font-medium">{{ store.item?.kode || '-' }}</div>
              <div class="text-gray-500">Kemasan:</div>
              <div class="text-right"> 1 {{ store.item?.satuan_b }} isi {{ store.item?.isi }} {{
                store.item?.satuan_k}}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full border-t border-dashed border-black my-1"></div>

        <div class="text-center mt-4">
          <div class="inline-block px-3 py-1 rounded-full border text-sm uppercase tracking-wider">
            KARTU STOK
          </div>
        </div>

        <div class="mt-6">
          <table class="w-full text-sm border-separate [border-spacing:0]">
            <thead>
              <tr>
                <th class="th text-left p-1">Jenis Transaksi</th>
                <th class="th text-left p-1">Nomor Transaksi</th>
                <th class="th text-left p-1">Tanggal</th>
                <th class="th text-right p-1">Debit</th>
                <th class="th text-right p-1">Kredit</th>
                <th class="th text-right p-1">Saldo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in groupedItems" :key="index">
                <td class="td p-1 text-left">{{ item?.jenis || '-' }}</td>
                <td class="td p-1 text-left">{{ item?.notrans || '-' }}</td>
                <td class="td p-1 text-left">{{ formatDateIndo(item?.tanggal) }}</td>
                <td class="td p-1 text-right">{{ item?.debit }}</td>
                <td class="td p-1 text-right">{{ item?.kredit }}</td>
                <td class="td p-1 text-right">{{ item?.saldo }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="rounded-xl p-4">
          </div>
          <div class="rounded-xl p-4 bg-gray-50">
            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold">Total Masuk</span>
                <span class="font-semibold">{{ formatRupiah(totalDebit) }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold">Total Keluar</span>
                <span class="font-semibold">{{ formatRupiah(totalKredit) }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold">Total Stok</span>
                <span class="font-semibold">{{ formatRupiah(totalStok) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 text-center text-[10px] leading-snug">
          <div class="w-full border-t border-dashed border-black my-1"></div>
          <p class="mt-2">&copy; 2025 CV Udumbara Informatika</p>
        </div>

      </div>
    </template>
    <template #footer>
      <u-row flex1 class="w-full" right>
        <u-btn variant="secondary" label="Batal" @click="$emit('close')" />
        <u-btn v-print="printObj" label="Cetak" type="button" />
      </u-row>
    </template>
  </u-modal>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { formatRupiah } from '@/utils/numberHelper'
import { formatDateIndo, formatTimeOnly } from '@/utils/dateHelper'
const props = defineProps({
  store: { type: Object, required: true },
  title: { type: String, default: 'Kartu Stok' },
})
const emit = defineEmits(['close', 'save'])

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const printType = ref('a4') // 'a4' | 'thermal-58 | 'thermal-80' | 'thermal-100'
const company = computed(() => {
  return props.store.company || null
})


const groupedItems = computed(() => {
  const result = []

  // --- PENERIMAAN ---
  const penerimaan = props.store?.item?.penerimaan_rinci ?? []
  penerimaan.forEach(item => {
    result.push({
      jenis: 'PENERIMAAN',
      notrans: item.nopenerimaan,
      tanggal: item.tgl_penerimaan,
      debit: Number(item.jumlah_k ?? 0),
      kredit: 0,
      saldo: 0,
    })
  })

  // --- PENJUALAN ---
  const penjualan = props.store?.item?.penjualan_rinci ?? []
  penjualan.forEach(item => {
    result.push({
      jenis: 'PENJUALAN',
      notrans: item.nopenjualan,
      tanggal: item.tgl_penjualan,
      debit: 0,
      kredit: Number(item.jumlah_k ?? 0),
      saldo: 0,
    })
  })

  // --- PENYESUAIAN ---
  const penyesuaian = props.store?.item?.penyesuaian ?? []
  penyesuaian.forEach(item => {
    const jumlah = Number(item.jumlah_k ?? 0)
    result.push({
      jenis: 'PENYESUAIAN',
      notrans: 'PS' + item.kode_barang,
      tanggal: item.tgl_penyesuaian,
      debit: jumlah > 0 ? jumlah : 0,
      kredit: jumlah < 0 ? Math.abs(jumlah) : 0,
      saldo: 0,
    })
  })

  // --- RETUR PEMBELIAN ---
  const returPembelian = props.store?.item?.retur_pembelian_rinci ?? []
  returPembelian.forEach(item => {
    result.push({
      jenis: 'RETUR PEMBELIAN',
      notrans: item.noretur,
      tanggal: item.tglretur,
      debit: 0,
      kredit: Number(item.jumlah_k ?? 0),
      saldo: 0,
    })
  })

  // --- RETUR PENJUALAN ---
  const returPenjualan = props.store?.item?.retur_penjualan_rinci ?? []
  returPenjualan.forEach(item => {
    result.push({
      jenis: 'RETUR PENJUALAN',
      notrans: item.noretur_penjualan,
      tanggal: item.tgl_retur,
      debit: Number(item.jumlah_k ?? 0),
      kredit: 0,
      saldo: 0,
    })
  })

  // --- SORTING berdasarkan tanggal ---
  result.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))

  // --- HITUNG SALDO BERJALAN ---
  let saldo = 0
  result.forEach(r => {
    saldo += r.debit - r.kredit
    r.saldo = saldo
  })

  console.log('groupedItems', result)
  return result
})

const totalDebit = computed(() => {
  const items = groupedItems.value ?? []
  return items.reduce((a, b) => a + Number(b?.debit), 0)
})

const totalKredit = computed(() => {
  const items = groupedItems.value ?? []
  return items.reduce((a, b) => a + Number(b?.kredit), 0)
})


const totalStok = computed(() => {
  const items = props.store?.item?.stok ?? []
  return items.reduce((a, b) => a + Number(b?.jumlah_k), 0)
})



const printArea = ref(null)

const printObj = {
  id: '#printArea', // ref elemen yang mau diprint
  popTitle: 'Penerimaan Barang',
  preview: false,
  extraCss: '',
  extraHead: '',
  beforeOpenCallback(vue) {
    console.log('wait...')
  },
  openCallback(vue) {
    console.log('opened')
  },
  closeCallback(vue) {
    console.log('closePrint')
    emit('close')
  }
}


</script>
