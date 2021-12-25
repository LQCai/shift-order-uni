<template>
	<view class="container">
		<view class="brand">
			<image :src="form.avatarUrl" class="avatar"></image>
		</view>
		<view class="user-form">
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">昵称</view>
					<input type="text" v-model="form.nickName" @change="handleNickNameChange"/>
				</view>
			</list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">手机号码</view>
					<input type="number" v-model="form.telephone" placeholder="请输入手机号码" @change="handleTelChange" />
				</view>
			</list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">性别</view>
					<view class="radio" @tap="form.gender = 1">
						<image :src="!form.gender ? '/static/images/common/gouxuankuang.png' : '/static/images/common/round-black-selected.png'"></image>
						<view>男</view>
					</view>
					<view class="radio" @tap="form.gender = 0">
						<image :src="form.gender ? '/static/images/common/gouxuankuang.png' : '/static/images/common/round-black-selected.png'"></image>
						<view>女</view>
					</view>
				</view>
			</list-cell>
			<list-cell line-right padding="30rpx" last>
				<view class="form-item">
					<view class="label">生日</view>
					 <picker class="flex-fill" mode="date" :value="form.birthday" @change="handleBirthdayChange">
						<view>{{ form.birthday }}</view>
					</picker>
          <view><text style="color: lightgray">生日设置后不可修改</text></view>
        </view>
			</list-cell>
		</view>

		<view class="save-btn">
			<button type="info" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue'
  import {checkUniquePhone, signUp, login} from "../../api/common";

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
      this.form = JSON.parse(options.userInfo)
      if (this.form.birthday === undefined) {
        this.form.birthday = '2000-01-01'
      }
      if (this.form.telephone === undefined) {
        this.form.telephone = ''
      }
    },
		methods: {
			handleBirthdayChange({target: {value}}) {
        this.form.birthday = value
        this.$forceUpdate()
			},
      handleTelChange({target: {value}}) {
        this.form.telephone = value
      },
      handleNickNameChange({target: {value}}) {
        this.form.nickName = value
      },
      save() {
        if (!this.validateTelephone(this.form.telephone)) {
          return uni.showToast({
            title: '请填写正确的手机号码!',
            icon: 'none'
          })
        }
        checkUniquePhone({phone: this.form.telephone}).then(res => {
          const exist = res.data
          if (exist) {
            return uni.showToast({
              title: '您输入的手机号已存在!',
              icon: 'none'
            })
          } else {
            signUp(this.form).then(() => {
              login({openId: uni.getStorageSync('openId')}).then(res => {
                uni.setStorageSync('userInfo', res.data)
                uni.setStorageSync('access_token', res.data.accessToken)
                uni.showToast({
                  title: '信息录入成功!',
                  icon: 'none'
                })
              }).catch((e) => {
                console.log(e)
              })
              uni.switchTab({
                url: '/pages/home/home'
              })
            })
          }
        })
      },
      validateTelephone(telephone) {
        const	reg=/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
        return reg.test(telephone)
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
