<template>
	<view class="container">
		<view class="brand">
			<image :src="form.avatar" class="avatar"></image>
		</view>
		<view class="user-form">
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">账户</view>
					<input type="text" v-model="form.account" disabled="disabled" />
				</view>
			</list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">姓名</view>
          <input type="text" v-model="form.name" disabled="disabled" />
        </view>
      </list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">手机号码</view>
					<input type="text" v-model="form.phone" disabled="disabled" />
				</view>
			</list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">性别</view>
					<view class="radio" @tap="form.sex = 1">
						<image :src="!form.sex ? '/static/images/common/gouxuankuang.png' : '/static/images/common/round-black-selected.png'"></image>
						<view>男</view>
					</view>
					<view class="radio" @tap="form.sex = 0">
						<image :src="form.sex ? '/static/images/common/gouxuankuang.png' : '/static/images/common/round-black-selected.png'"></image>
						<view>女</view>
					</view>
				</view>
			</list-cell>
			<list-cell line-right padding="30rpx" last>
				<view class="form-item">
					<view class="label">生日</view>
					 <picker class="flex-fill" mode="date" :value="form.birthday" disabled="true">
						<view><text style="color: lightgray">{{ form.birthday }}</text></view>
					</picker>
				</view>
			</list-cell>
		</view>

		<view class="save-btn">
			<button type="info">保存</button>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	import modal from '@/components/modal/modal.vue'
  import {info} from "../../api/common";

	export default {
		components: {
			listCell,
			modal
		},
		data() {
			return {
				form: {}
			}
		},
    onShow() {
      this.getUserInfo()
    },
		methods: {
      getUserInfo() {
        let userInfo = uni.getStorageSync("userInfo")
        if (!userInfo) {
          info().then((res) => {
            userInfo = res.data
            uni.setStorageSync("userInfo", res.data)
          }).catch((err) => {
            console.log(err)
          })
        }
        this.form = userInfo
        if (this.form.avatar === "") {
          this.form.avatar = uni.getStorageSync("loginInfo").avatar
        }
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
