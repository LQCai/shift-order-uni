<template>
	<view class="container">
		<view class="user-form">
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">姓名</view>
					<input type="text" v-model="form.name" placeholder="请输入姓名" @change="handleNameChange"/>
				</view>
			</list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">工号</view>
          <input type="text" v-model="form.code" placeholder="请输入工号(登录账号)" @change="handleCodeChange"/>
        </view>
      </list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">手机号码</view>
					<input type="number" v-model="form.phone" placeholder="请输入手机号码" @change="handleTelChange" />
				</view>
			</list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">密码</view>
          <input type="password" v-model="form.password" placeholder="请输入密码" @change="handlePasswordChange" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">所属角色</view>
          <view>
            <picker class="flex-fill" :value="index" :range="roles" :range-key="'displayName'" @change="handleRoleChange">
              <view>{{ roles[index].displayName }}</view>
            </picker>
          </view>
        </view>
      </list-cell>
		</view>

		<view class="save-btn">
			<button type="info" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal.vue'
  import {register} from "@/api/common";

	export default {
		components: {
			modal
		},
		data() {
			return {
				countdown: 0,
        index: 0,
        roles: [
          {
            code: 'rail_driver',
            displayName: '动车司机'
          },
          {
            code: 'shuttle_driver',
            displayName: '班车司机'
          }
        ],
        form: {
          name: '',
          code: '',
          phone: '',
          password: '',
          role: 0
        }
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
      handleRoleChange({target: {value}}) {
        this.form.role = value
			},
      handleTelChange({target: {value}}) {
        this.form.telephone = value
      },
      handlePasswordChange({target: {value}}) {
        this.form.password = value
      },
      handleNameChange({target: {value}}) {
        this.form.name = value
      },
      handleCodeChange({target: {value}}) {
        this.form.code = value
      },
      submit() {
        if (!this.validateTelephone(this.form.phone)) {
          return uni.showToast({
            title: '请填写正确的手机号码!',
            icon: 'none'
          })
        }
        this.form.roleId = this.roles[this.form.role].code
        const params = this.form
        register(params).then(res => {
          uni.showToast({
            title: res.msg,
            icon: "none"
          })
          setTimeout(() => {
            uni.hideToast()
            uni.switchTab({
              url: '/pages/home/index'
            })
          }, 1000)
        }).catch(err => {
          // ...
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
