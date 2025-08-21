<template>
  <u-modal persistent :title="`${title}`" @close="emit('close')">
    <template #default>
      <div id="printArea" ref="printArea" class=" max-w-full bg-white text-black mx-auto  p-1 thermal-58">
        <div class="text-center">
          <div class="text-sm font-semibold tracking-wide">NAMA TOKO</div>
          <div class="text-[10px] leading-tight">ALAMAT TOKO</div>
          <div class="text-[10px]">TELEPON TOKO</div>
          <div class="w-full border-t border-dashed border-black my-1"></div>
        </div>
        <div class="text-center">
          <div class="text-[12px] font-semibold tracking-wide">DATA PENERIMAAN</div>
          <div class="text-[12px] tracking-wide">{{ form?.nopenerimaan }}</div>
        </div>
        <div class="flex justify-between text-[11px] mt-1">
          <div>No Faktur {{ form?.nofaktur }}</div>
          <div class="text-right">{{ formatDateIndo(form?.tgl_penerimaan) }}</div>
        </div>
        <div class="flex justify-between text-[11px] mt-1">
          <div>{{ user?.nama || '-' }}</div>
          <div class="text-right"> Jam : {{ formatTimeOnly(form?.tgl_penerimaan) }}</div>
        </div>
        <div class="w-full border-t border-dashed border-black my-1"></div>
        <table class="w-full text-[12px] border-collapse border">
          <thead>
            <tr>
              <th class="border text-left p-1">Nama Barang</th>
              <th class="border text-left p-1">Jumlah Barang</th>
              <th class="border text-right p-1">Harga Barang (Rp)</th>
              <th class="border text-right p-1">Disc (%)</th>
              <th class="border text-right p-1">Subtotal (Rp)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in groupedItems" :key="index">
              <td class="border p-1 text-left">{{ item?.nama || '-' }}</td>
              <td class="border p-1 text-left">{{ item?.jumlah_k }} {{ item?.satuan_k }}</td>
              <td class="border p-1 text-right">{{ formatRupiah(item?.harga) }}</td>
              <td class="border p-1 text-right">{{ formatRupiah(item?.diskon) }}</td>
              <td class="border p-1 text-right">{{ formatRupiah(item?.subtotal) }}</td>
            </tr>
          </tbody>

        </table>


        <div class="w-full border-t border-dotted border-black my-1"></div>

        <div class="text-[12px]">
          <!-- <div class="flex justify-between"><span>Subtotal</span><span>5.000.000</span></div> -->
          <!-- <div class="flex justify-between"><span>Pajak</span><span>20.000</span></div> -->
          <div class="flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>{{ formatRupiah(totalPenerimaan) }}</span>
          </div>

          <div class="flex justify-between font-semibold text-[12px]">
            <div class="row w-full text-center">
              <div class="col-12 px-2">Supplier</div>
              <div class="col-12 px-2"> {{ store.form?.suplier?.nama }} </div>
              <div class="col-12 px-2 pt-8"> </div>
              <div class="col my-1 px-20">
                <div class="border-t border-dashed border-black"></div>
              </div>

            </div>
            <div class="col w-full text-center">
              <div class="col-12 px-2">Diterima Oleh</div>
              <div class="col-12 px-2 pt-12"> </div>
              <div class="col my-1 px-20">
                <div class="border-t border-dashed border-black"></div>
              </div>
            </div>
          </div>
          <!-- <div class="flex justify-between"><span>Bayar ({{ formBayar?.cara_bayar }})</span><span>{{
              formatRupiah(formBayar?.jumlah_bayar) }}</span></div>
          <div class="flex justify-between" :class="{ 'font-semibold': kembali >= 0 }"><span>Kembali</span><span>{{
              formatRupiah(kembali) }}</span></div> -->
        </div>



        <div class="mt-2 pt-6 text-center text-[10px] leading-snug">
          <div class="w-full border-t border-dashed border-black my-1"></div>
          <!-- <p class="mt-1">Terimakasih atas kunjungan anda</p>
        <p class="opacity-60">Simpan struk ini sebagai bukti transaksi.</p> -->
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
  title: { type: String, default: 'Penerimaan' },
  formBayar : { type: Object, default: null },
  form : { type: Object, default: null },
})
const emit = defineEmits(['close', 'save'])

const auth = useAuthStore()
const { user } = storeToRefs(auth)


const printType = ref('a4') // 'a4' | 'thermal-58 | 'thermal-80' | 'thermal-100'

console.log('form', props?.store?.form)
const groupedItems = computed(() => {
  const map = new Map()
  console.log('store', props.store?.form)
  const items = props?.store?.form?.rincian ?? []
  items.forEach(item => {
    const key = item.kode_barang
    if (!map.has(key)) {
      map.set(key, {
        kode_barang: item?.kode_barang,
        nama: item?.barang?.nama,
        satuan_k: item?.satuan_k,
        jumlah_k: Number(item?.jumlah_k),
        harga: Number(item?.harga),
        diskon: Number(item?.diskon_persen),
        subtotal: Number(item?.subtotal),
        created_at: item?.created_at
      })
    } else {
      const existing = map.get(key)
      existing.jumlah_k += Number(item.jumlah_k)
      existing.subtotal += Number(item.subtotal)
      // update created_at jika lebih baru
      if (new Date(item.created_at) > new Date(existing.created_at)) {
        existing.created_at = item.created_at
      }
    }
  })

  return Array.from(map.values())
})

const totalPenerimaan = computed(() => {
  const items = props?.store?.form?.rincian ?? []
  return items.reduce((a, b) => a + Number(b?.subtotal), 0)
})

// const kembali = computed(() => {
//   if (props?.formBayar?.jumlah_bayar < totalPenerimaan.value) {
//     return 0
//   } 
//   return props.formBayar?.jumlah_bayar - totalPenerimaan.value
// })

const printArea = ref(null)

const printObj = {
  id: '#printArea', // ref elemen yang mau diprint
  popTitle: 'Penerimaan Barang',
  preview: false,
  extraCss: '',
  extraHead: '',
  beforeOpenCallback (vue) {
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    console.log('closePrint')
    emit('close')
  }
}


</script>
