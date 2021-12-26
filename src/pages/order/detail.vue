<template>
	<view class="container">
    <view class="order-form">
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">预约区间</view>
          <input type="text" v-model="form.intervalName" disabled="disabled" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">预约日期</view>
          <input type="text" v-model="form.date" disabled="disabled" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">预约时间</view>
          <input type="text" v-model="form.startTime" disabled="disabled" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">创建时间</view>
          <input type="text" v-model="form.createTime" disabled="disabled" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx" v-if="form.remark">
        <view class="form-item">
          <view class="label">预约备注</view>
          <textarea v-model="form.remark" disabled="disabled" />
        </view>
      </list-cell>
    </view>
    <view class="save-btn">
      <button type="info" @click="cancel">取消预约</button>
    </view>
	</view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import {cancel} from "../../api/order";

  export default {
    components: {ListCell},
    data() {
			return {
        form: {
          id: "",
          intervalName: "",
          date: "",
          startTime: "",
          createTime: "",
          remark: ""
        }
			}
		},
    onLoad(options) {
      this.form = options
    },
		methods: {
      cancel () {
        cancel({shiftOrderDetailId: this.form.id}).then((res) => {
          uni.showToast({ title: res.msg, icon: 'none' })
          setTimeout(() => {
            uni.hideToast()
            uni.switchTab({ url: '/pages/home/index' })
          }, 1000)
        }).catch(err => {
          // ...
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		max-height: 100%;
	}

	.content {
		width: 100%;
		padding: 0 30rpx;
		position: relative;
	}

  .order-form {
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
</style>
