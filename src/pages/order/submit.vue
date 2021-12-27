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
          <view>
            <picker class="flex-fill" mode="date" :start="form.startDate" :end="form.endDate" :value="form.date" @change="handleDateChange">
              <view>{{ form.date }}</view>
            </picker>
          </view>
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">预约时间</view>
          <input type="text" v-model="form.time" disabled="disabled" />
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx" last>
        <view class="form-item">
          <view class="label">预约备注</view>
          <input type="text" v-model="form.remark"  @change="handleRemarkChange" />
        </view>
      </list-cell>
    </view>
    <view class="save-btn">
      <button type="info" @click="submit">提交</button>
    </view>
	</view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import {submit} from "../../api/order";

  export default {
    components: {ListCell},
    data() {
			return {
        form: {
          shiftId: "",
          time: "",
          date: "",
          remark: "",
          intervalName: ""
        }
			}
		},
    onLoad(options) {
      this.form.shiftId = options.id
      this.form.time = options.time
      this.form.intervalName = options.intervalName
      this.getDate()
    },
		methods: {
      handleDateChange ({target: {value}}) {
        this.form.date = value
      },
      handleRemarkChange({target: {value}}) {
        this.form.remark = value
      },
      getDate () {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        this.form.date = date.toISOString().slice(0, 10)
        this.form.startDate = date.toISOString().slice(0, 10)
        date.setDate(date.getDate() + 2);
        this.form.endDate = date.toISOString().slice(0, 10)
      },
      submit () {
        submit({shiftTemplateId: this.form.shiftId, date: this.form.date, remark: this.form.remark}).then(res => {
          uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
          setTimeout(() => {
            uni.hideToast()
            uni.navigateTo({
              url: '/pages/order/recordList'
            })
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
