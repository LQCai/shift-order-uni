import Vue from 'vue'

let vue = new Vue()

export function intervalList() {
  return vue.$fly.request({
    url: `/order/interval-list`,
    method: 'GET'
  })
}
