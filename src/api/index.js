import common from './common.js'

const json = {
	common
}

export default (name, loading = true) => {
	if(loading) {
		uni.showLoading()
	}

	return new Promise(resolve => {
		setTimeout(() => {
			uni.hideLoading()
			resolve(json[name])
		}, 500)
	})
}