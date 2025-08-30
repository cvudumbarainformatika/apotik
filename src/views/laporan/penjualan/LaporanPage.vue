<template>
  <u-page >
    <u-view flex1 scrollY class="w-full">
      <button @click="printReport" class="bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
        Print 10.000 Row
      </button>

      <!-- Preview -->
      <div  v-html="tableHtml" class="mt-4 border"></div>
    </u-view>
  </u-page>
</template>

<script setup>
import { ref } from "vue"

const tableHtml = ref("")

function generateTable(data) {
  let html = `
    <table class="w-full border-collapse border text-xs">
      <thead class="bg-gray-200">
        <tr>
          <th class="border p-1">#</th>
          <th class="border p-1">Tanggal</th>
          <th class="border p-1">Invoice</th>
          <th class="border p-1">Customer</th>
          <th class="border p-1 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
  `

  for (let i = 0; i < data.length; i++) {
    html += `
      <tr>
        <td class="border p-1">${i + 1}</td>
        <td class="border p-1">${data[i].tanggal}</td>
        <td class="border p-1">${data[i].invoice}</td>
        <td class="border p-1">${data[i].customer}</td>
        <td class="border p-1 text-right">${data[i].total}</td>
      </tr>
    `
  }

  html += "</tbody></table>"
  return html
}

function printReport() {
  // simulasi data 10 ribu row
  const dummy = Array.from({ length: 10000 }, (_, i) => ({
    tanggal: "2025-08-30",
    invoice: "INV-" + (i + 1),
    customer: "Customer " + (i + 1),
    total: Math.floor(Math.random() * 1000000),
  }))

  tableHtml.value = generateTable(dummy)

  // kasih delay biar DOM siap
  setTimeout(() => window.print(), 500)
}
</script>

<style>
@media print {
  body {
    margin: 0;
  }
  .page-break {
    page-break-after: always;
  }
}
</style>
