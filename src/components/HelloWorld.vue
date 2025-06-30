<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const form = ref({
  email: '',
  password: '',
  error: '',
  status: ''
})

const errorSelect = ref(false)
const errorMessageSelect = ref('')
const options = ref([
  { value: '1', label: 'Tampilkan' },
  { value: '2', label: 'Sembunyikan' }
])


</script>

<template>
  <u-page>
    <u-view flex1 class="">
      <u-row flex1>
        <u-view>
          aaaa
        </u-view>
        <u-view flex1 class="bg-blue-100">
          aaaa
        </u-view>
      </u-row>
    </u-view>
    
    <!-- <div class="font-medium">Color Palette</div>
    <u-grid cols="4">
      <div class="bg-primary text-white p-4 h-[100px]">primary</div>
      <div class="bg-light-primary text-white p-4">light-primary</div>
      <div class="bg-secondary text-dark p-4">secondary</div>
      <div class="bg-background text-black p-4">background</div>
      <div class="bg-danger text-white p-4 h-[100px]">danger</div>
      <div class="bg-success text-white p-4 h-[100px]">dark</div>
      <div class="bg-grady-primary text-white p-4 h-[100px]">grady-primary</div>
      <div class="bg-grady-secondary text-black p-4 h-[100px]">grady-secondary</div>
    </u-grid>


    <div class="font-medium">Buttons (u-btn)</div>

    
    <div class="w-full space-y-2">
      <u-row>
        <u-btn label="Primary" fullWidth />
        <u-btn variant="secondary" label="Secondary" />
      </u-row>
      <u-row>
        <u-btn label="Primary" fullWidth />
        <u-btn variant="secondary" label="Secondary" />
      </u-row>
    </div>

    <div class="font-medium">Input (u-input)</div>
    <u-col>
      <u-input label="Email" type="email" v-model="form.email"/>
      <u-input label="Password" type="password" v-model="form.password" />
      <u-input label="Percobaan Error" type="text" v-model="form.error" error error-message="Harap diisi" />
    </u-col>
    <div class="font-medium">Select (u-select)</div>
    <div class="space-y-4 bg-background p-8">
      <u-select label="Uselect" v-model="form.status"
        :options="options" :error="errorSelect" :error-message="errorMessageSelect"
      />
    </div> -->

  </u-page>
</template>

<style scoped>


</style>
