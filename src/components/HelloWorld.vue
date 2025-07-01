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
    <u-view class="">
      <u-row flex1>
        <u-view>
          aaaa
        </u-view>
        <u-view flex1 class="">
          bbbb
        </u-view>
      </u-row>
    </u-view>
    <u-view flex1 scrollY>
      <u-col flex1  class="space-y-4">
        <!-- <div class="font-medium">Color Palette</div> -->
         <u-title label="Color Palette" />
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


          <u-title label="Buttons (u-btn)" />
          
          <!-- <div class="w-full space-y-2 "> -->
            <u-row flex1 class="w-full">
              <u-btn label="Primary" fullWidth />
              <u-btn variant="secondary" label="Secondary" />
            </u-row>
            <u-row>
              <u-btn label="Primary" fullWidth />
              <u-btn variant="secondary" label="Secondary" />
            </u-row>
          <!-- </div> -->

          <u-title label="Input (u-input)" />
          <u-col class="w-full">
            <u-input label="Email" type="email" v-model="form.email"/>
            <u-input label="Password" type="password" v-model="form.password" />
            <u-input label="Percobaan Error" type="text" v-model="form.error" error error-message="Harap diisi" />
          </u-col>
          <u-title class="">Select (u-select)</u-title>
          <u-col  class="w-full">
              <u-select label="Uselect" v-model="form.status"
                :options="options" :error="errorSelect" :error-message="errorMessageSelect"
                @update:modelValue="(val)=> {
                  console.log('val',val);
                  
                }"
              />
            <div style="margin-bottom: 300px;"></div>
          </u-col>
      </u-col>

    </u-view>
    
   

  </u-page>
</template>

<style scoped>


</style>
