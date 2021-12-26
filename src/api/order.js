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

export function submit(query) {
  return vue.$fly.request({
    url: `/order/submit`,
    method: 'POST',
    params: query
  })
}

export function recordList(query) {
  return vue.$fly.request({
    url: `/order/record-list`,
    method: 'GET',
    params: query
  })
}

export function cancel(query) {
  return vue.$fly.request({
    url: `/order/cancel`,
    method: 'POST',
    params: query
  })
}

export function recordAllList(query) {
  return vue.$fly.request({
    url: `/shift/shift-order/list`,
    method: 'GET',
    params: query
  })
}
