<template>
  <u-list :items="items">
    <template #item="{ item }">
      <u-grid cols="2">
        <u-col gap="gap-0" class="w-full">
          <div>kode</div>
          <div>cccc</div>
        </u-col>
        <u-col right gap="gap-0" class="w-full">
          <div>kode</div>
          <div>cccc</div>
        </u-col>
      </u-grid>
    </template>
  </u-list>
</template>

<script setup>
const props = defineProps({
  store: { type: Object, required: true },
  items: { type: Array, default: ()=> [] },
})
</script>