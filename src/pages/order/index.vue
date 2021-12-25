<template>
	<view class="container">
    <list-cell class="cell" v-for="interval in intervalList">
      <view class="item" @tap="chooseTime">
        <view class="wenyue-font">{{ interval.name }}</view>
      </view>
    </list-cell>
	</view>
</template>

<script>
  import {intervalList} from "../../api/order";
  import ListCell from "../../components/list-cell/list-cell";

  export default {
    components: {ListCell},
    data() {
			return {
        intervalList: []
			}
		},
    onLoad() {
      intervalList().then(res => {
        this.intervalList = res.data
      }).catch(err => {
        // ...
      })
    },
		methods: {
      chooseTime() {

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
