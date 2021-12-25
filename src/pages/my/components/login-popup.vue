<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="popup-content d-flex flex-column">
			<view class="d-flex justify-content-end">
				<image src="/static/images/common/clousex-big.png" class="close_btn" @tap="close"></image>
			</view>
			<view class="d-flex flex-fill flex-column justify-content-between">
				<view class="d-flex flex-column">
					<view class="font-size-extra-lg font-weight-bold text-color-base mb-30">欢迎登陆~</view>
					<view class="font-size-base text-color-assist">登录享受更好的服务体验</view>
				</view>
				<view class="d-flex flex-column">
					<button type="primary" class="w-100 font-size-lg mb-30" @click="getUserInfo">微信一键登陆</button>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import website from "../../../utils/website";
  import {greet} from "../../../api/common";

	export default {
		name: 'LoginPopup',
		components: {
			uniPopup
		},
		props: {

		},
    data() {
      return {
        // code,
        // openId
      }
    },
		methods: {
			getUserInfo() {
        // this.getCode()
        uni.navigateTo({
          url: '/pages/my/login'
        })
        this.close()
			},
      // getCode() {
      //   if (window.location.href.indexOf("state") !== -1) {
      //     // 如果页面url有state参数 如果有就是微信授权 重定向过来的页面 ， 没有的话就是自己进入的首页
      //     // 获取网页授权需要使用到的code
      //     this.code = window.location.href.split("&")[0].split("=")[1]
      //   }
      //   if (this.code) {
      //     this.getOpenId()
      //   } else {
      //     this.handLogin()
      //   }
      // },
      // handLogin() {
      //   // const domain = window.location.href.split('#')[0]
      //   const domain = window.location.href.split('#')[0]
      //   // const domain = 'https://mind.opstime.xin/weapons'
      //   // 缓存没有微信用户授权时进入的页面路径，授权结束后再跳回相应的页面
      //   uni.setStorageSync('toPath', window.location.href.split('#')[1])
      //   if (!this.code) {
      //     window.location.replace(`
			// 			https://open.weixin.qq.com/connect/oauth2/authorize?appid=${website.appId}
			// 				&redirect_uri=${encodeURIComponent(domain)}
			// 				&response_type=code
			// 				&scope=snsapi_userinfo
			// 				&state=h5#wechat_redirect`)
      //   }
      // },
      // getOpenId() {
      //   // 向后端发起请求，可取得openid
      //   greet({ code: this.code }).then(response => {
      //     if (response.isError) return
      //     this.openId = response.data.openid
      //     uni.setStorageSync('openId', response.data.openid)
      //   }).catch(() => {
      //   })
      // },
      open() {
        this.$refs['popup'].open()
      },
      close() {
        this.$refs['popup'].close()
      },
      change({show}) {
        this.$emit('change', show)
      }
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		background-color: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		height: 50vh;
		padding: 50rpx 40rpx;
	}

	.close_btn {
		width: 40rpx;
		height: 40rpx;
	}
</style>
