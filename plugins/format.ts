import { Plugin } from '@nuxt/types'

const format: Plugin = (_, inject) => {
  function toDateTime(day: Date | string | number) {
    if (!day) return ''
    day =
      typeof day === 'number'
        ? new Date(day)
        : new Date(day.toString().replace(/-/g, '/'))
    const YYYY = day.getFullYear()
    const MM =
      day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1
    const DD = day.getDate() < 10 ? '0' + day.getDate() : day.getDate()
    const hh = day.getHours() < 10 ? '0' + day.getHours() : day.getHours()
    const mm = day.getMinutes() < 10 ? '0' + day.getMinutes() : day.getMinutes()
    const ss = day.getSeconds() < 10 ? '0' + day.getSeconds() : day.getSeconds()
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
  }

  const format = {
    toDateTime(day: Date | string | number) {
      return toDateTime(day)
    },
    toDate(day: Date | string | number) {
      return toDateTime(day).slice(0, 10)
    },
  }

  inject('format', format)
}

export default format
