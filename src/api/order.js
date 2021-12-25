import Vue from 'vue'

let vue = new Vue()

export function intervalList() {
  return vue.$fly.request({
    url: `/order/interval-list`,
    method: 'GET'
  })
}

export function shiftList(query) {
  return vue.$fly.request({
    url: `/order/shift-list`,
    method: 'GET',
    params: query
  })
}
