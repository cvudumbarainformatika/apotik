export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}