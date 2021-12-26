<template>
	<view class="container">
		<view class="user-form">
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">账号</view>
					<input type="text" v-model="form.account" placeholder="请输入账号" @change="handleAccountChange" />
				</view>
			</list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">密码</view>
          <input type="password" v-model="form.password" placeholder="请输入密码" @change="handlePasswordChange" />
        </view>
      </list-cell>
		</view>

		<view class="save-btn">
			<button type="info" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue'
  import {info, loginByPassword} from "../../api/common";
  import website from "../../utils/website";

	export default {
		components: {
			modal
		},
		data() {
			return {
				form: {},
				countdown: 0
			}
		},
    onLoad(options) {

    },
		methods: {
      handleAccountChange({target: {value}}) {
        this.form.account = value
      },
      handlePasswordChange({target: {value}}) {
        this.form.password = value
      },
      login() {
        if (this.form.account === undefined) {
          return uni.showToast({
            title: '请填写账号!',
            icon: 'none'
          })
        }
        if (this.form.password === undefined) {
          return uni.showToast({
            title: '密码不可为空!',
            icon: 'none'
          })
        }
        loginByPassword({
          grantType: "password",
          type: "account",
          account: this.form.account,
          password: this.form.password
        }).then(res => {
          uni.setStorageSync('access_token', res.data.accessToken)
          info().then((res) => {
            const userInfo = res.data
            if (userInfo.avatar === "") {
              userInfo.avatar = website.defaultAvatar
            }
            uni.setStorageSync('userInfo', userInfo)
          }).catch((err) => {
            console.log(err)
          })
          uni.showToast({
            title: '登录成功!',
            icon: 'none'
          })
          setTimeout(() => {
            uni.hideToast()
            uni.switchTab({
              url: '/pages/home/index'
            })
          }, 1000)
        }).catch((e) => {
          console.log(e)
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
.brand {
	background-color: $bg-color-white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
	margin-bottom: 20rpx;

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		margin-bottom: 30rpx;
	}

	.username {
		color: $font-size-medium;
		font-weight: bold;
	}
}

.user-form {
	.form-item {
		width: 100%;
		display: flex;
		align-items: center;

		.label {
			width: 160rpx;
		}

		input {
			flex: 1;
		}

		.radio {
			display: flex;
			margin-right: 50rpx;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
}

.save-btn {
	padding: 0 30rpx;
	margin-top: 60rpx;

	button {
		width: 100%;
		font-size: $font-size-extra-lg;
	}
}

.telphone-modal {
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-size: $font-size-extra-lg;
		font-weight: bold;
		margin-bottom: 30rpx;

		.close-icon {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 0;
		}
	}

	.tips {
		color: $text-color-grey;
		line-height: 1.2rem;
		margin-bottom: 50rpx;
	}

	.telphone-form {
		font-size: $font-size-base;

		.telphone-input {
			width: 100%;
			display: flex;
			align-items: center;

			.prefix {
				color: $color-primary;
				display: flex;
				align-items: center;
				padding-right: 20rpx;
				position: relative;
				margin-right: 10rpx;

				&::after {
					content: " ";
					position: absolute;
					width: 4rpx;
					background-color: $border-color;
				}
			}

			input {
				flex: 1;
			}
		}

		.verfiycode-input {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.countdown {
				font-size: $font-size-base;
			}
		}
	}

	.footer {
		margin-top: 30rpx;
		button {
			font-size: $font-size-lg;
		}
	}
}
</style>
