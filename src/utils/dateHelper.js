import { useTimeAgo } from '@vueuse/core'

/**
 * Format tanggal ke format lokal Indonesia
 * Contoh: "10 Jul 2025"
 */
export function formatDateIndo(dateInput) {
  const date = new Date(dateInput)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format tanggal + jam ke format lokal Indonesia
 * Contoh: "10 Jul 2025 14:30"
 */
export function formatDateTimeIndo(dateInput) {
  const date = new Date(dateInput)
  const tanggal = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const waktu = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${tanggal} ${waktu}`
}

/**
 * Format hanya waktu (jam:menit)
 * Contoh: "14:30"
 */
export function formatTimeOnly(dateInput) {
  const date = new Date(dateInput)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format waktu lalu (static, tidak reactive)
 * Contoh: "3 menit yang lalu"
 */
export function formatWaktuLalu(dateInput) {
  const now = new Date()
  const date = new Date(dateInput)
  const diff = (now - date) / 1000

  if (diff < 60) return `${Math.floor(diff)} detik yang lalu`
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari yang lalu`
  if (diff < 31104000) return `${Math.floor(diff / 2592000)} bulan yang lalu`
  return `${Math.floor(diff / 31104000)} tahun yang lalu`
}

/**
 * Format waktu lalu reactive (otomatis update)
 * return: Ref<String>
 */


export function useWaktuLaluReactive(dateInput) {
  return useTimeAgo(new Date(dateInput), {
    updateInterval: 60,
    messages: {
        justNow: 'baru saja',
        past: (n) => n.match(/\d/) ? `${n} yg lalu` : n,
        future: (n) => n.match(/\d/) ? `dalam ${n}` : n,
        second: (n) => `${n} dtk`,
        minute: (n) => `${n} mnt`,
        hour: (n) => `${n} jam`,
        day: (n, past) => n === 1
          ? (past ? 'kemarin' : 'besok')
          : `${n} hr`,
        week: (n, past) => n === 1
          ? (past ? 'minggu lalu' : 'minggu depan')
          : `${n} mgu`,
        month: (n, past) => n === 1
          ? (past ? 'bulan lalu' : 'bulan depan')
          : `${n} bln`,
        year: (n, past) => n === 1
          ? (past ? 'tahun lalu' : 'tahun depan')
          : `${n} thn`,
        invalid: ''
      }
  })
}