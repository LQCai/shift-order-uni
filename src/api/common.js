import Vue from 'vue'
import website from '@/utils/website.js'

let vue = new Vue()

/*
  接口地址 /mobile-user/wxe8823e90b7c00283/greet
  请求方式 GET
  接口描述 获取微信SDK授权需要的参数信息
*/
export function greet(query) {
  return vue.$fly.request({
    url: `/wechat/${website.appId}/greet`,
    method: 'POST',
    params: query
  })
}

export function loginByPassword(query) {
  return vue.$fly.request({
    url: `/blade-auth/token`,
    method: 'POST',
    params: query
  })
}

export function info() {
  return vue.$fly.request({
    url: `/blade-user/info`,
    method: 'GET'
  })
}

export function updateInfo(query) {
  return vue.$fly.request({
    url: `/blade-user/update`,
    method: 'POST',
    data: query
  })
}
