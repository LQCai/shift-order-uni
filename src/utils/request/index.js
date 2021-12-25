import Fly from 'flyio/dist/npm/wx'
import website from '@/utils/website.js'
import { Base64 } from 'js-base64'
import { getToken, reLogin, userWechat } from '@/api/common.js'

const fly = new Fly()

// 设置超时
fly.config.timeout = 15000
// 设置请求基地址
fly.config.baseURL = website.BASE_URL
fly.config.headers['ContentType'] = "application/x-www-form-urlencoded;charset=utf-8"

// 请求拦截
fly.interceptors.request.use((request) => {
	const accessToken = uni.getStorageSync('access_token') || ''
	request.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
	if (accessToken) {
		request.headers[website.tokenHeader] = `bearer ${accessToken}` // 让每个请求携带token
	}
	uni.showLoading({
		title: '加载中'
	})
	request.body = request.data
	// 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request
})

fly.interceptors.response.use(
	(response) => {
		const res = response.data
		const status = res.code || response.status
		uni.hideLoading()
		if (status === 200) {
			return res
		} else {
			uni.showToast({ title: res.msg, icon: 'none' })
			return Promise.resolve({
				isError: true,
				errorMsg: res.msg,
				isNetError: false
			})
		}
	},
	(err) => {
		// 网络发生错误会走这里
		console.log(err)
		uni.hideLoading()
		const openId = uni.getStorageSync('openId')
		const status = err.status
		// token过期或未登录
		if (status === 401) {
			if (openId) {
				userWechat({ openid: openId }).then(response => {
					if (response.isError) return
					if (window.location.href.split('#')[1] !== '/') {
						uni.setStorageSync('toPath', window.location.href.split('#')[1])
					}
					if (response.data.userId && response.data.userId !== '-1') {
						// 有openId，也绑定了系统账号
						reLogin({
							openid: openId
						}).then(response => {
							if (response.isError) return
							const toPath = uni.getStorageSync('toPath')
							uni.setStorageSync('access_token', response.access_token)
							uni.setStorageSync('refresh_token', response.refresh_token)
							uni.reLaunch({
								url: toPath
							})
						}).catch(() => {})
					} else {
						uni.reLaunch({
							url: '/pages/home/home'
						})
					}
				}).catch(() => {
				})
			}
			return false
		} else if (status === 400) {
			const { response } = err
			uni.showToast({
				title: response.data.msg,
				icon: 'none'
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}, 1500)
			return false
		}
		return Promise.resolve({
			isError: true,
			errorMsg: err,
			isNetError: true
		})
	}
)

export default fly