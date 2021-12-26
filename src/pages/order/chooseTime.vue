<template>
	<view class="container">
    <list-cell class="cell">
      <view> {{ intervalName }} </view>
    </list-cell>
    <list-cell class="cell" v-for="shift in shiftList">
      <view class="item" @tap="submit(shift)">
        <view class="wenyue-font">{{ shift.startTime.slice(0, 5) }}</view>
      </view>
    </list-cell>
	</view>
</template>

<script>
import {shiftList} from "../../api/order";
  import ListCell from "../../components/list-cell/list-cell";

  export default {
    components: {ListCell},
    data() {
			return {
        intervalName: "",
        shiftList: []
			}
		},
    onLoad(options) {
      this.intervalName = options.name
      shiftList({intervalId: options.id}).then(res => {
        this.shiftList = res.data
      }).catch(err => {
        // ...
      })
    },
		methods: {
      submit(shift) {
        uni.navigateTo({
          url: `/pages/order/submit?id=${shift.id}&time=${shift.startTime}&intervalName=${this.intervalName}`
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

  .cell {
    justify-content: center;
  }

  .item {
    width: 90%;
    background-color: whitesmoke;
    padding: $spacing-row-lg 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-lg;
    .wenyue-font {
      font-size: 40rpx;
    }
  }
</style>
