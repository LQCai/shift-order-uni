<template>
	<view class="container">
    <list-cell class="cell" v-for="order in orderList">
      <view class="item" @tap="toDetail(order)">
        <view class="wenyue-font">预约区间: {{ order.intervalName }}</view>
        <view class="wenyue-font">预约日期: {{ order.date }}</view>
        <view class="wenyue-font">预约时间: {{ order.startTime.slice(0, 5) }}</view>
        <view class="wenyue-font" v-if="order.remark">预约备注: {{ order.remark }}</view>
      </view>
    </list-cell>
    <view class="item" v-if="isLoadAll" style="text-align: center">{{ loadingTxt }}</view>
  </view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import {recordList} from "../../api/order";

  export default {
    components: {ListCell},
    data() {
			return {
        orderList: [],
        paramsData: {
          current: 1,
          size: 10,
        },
        pages: 1,
        isLoadAll: false,
        loadingTxt: '加载中...',
			}
		},
    onLoad() {
      this.getRecordList()
    },
		methods: {
      getRecordList() {
        recordList(this.paramsData).then(res => {
          this.orderList = [...this.orderList, ...res.data.records]
          this.pages = res.data.pages
        }).catch(err => {
          // ...
        })
      },
      toDetail(order) {
        uni.navigateTo({
          url: `/pages/order/detail?id=${order.id}&intervalName=${order.intervalName}
          &date=${order.date}
          &startTime=${order.startTime}
          &createTime=${order.createTime}
          &remark=${order.remark}`
        })
      }
		},
    onPullDownRefresh() {
      this.getRecordList()
    },
    onReachBottom() {
      // 判断当前页是否大于等于总页数
      if (this.pages <= this.paramsData.current) {
        this.isLoadAll = true;
        this.loadingTxt = '没有更多数据啦~';
      } else {
        this.paramsData.current++;
        this.isLoadAll = true;
        this.loadingTxt = '加载中...';
        this.getRecordList();   // 每次滑动请求接口，实现上拉加载更多数据
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
    justify-content: center;
    border-radius: $border-radius-lg;
    text-align: left;
    .wenyue-font {
      margin-left: 50rpx;
      font-size: 40rpx;
    }
  }
</style>
