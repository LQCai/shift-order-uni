<template>
	<view class="container">
    <sl-filter :ref="'slFilter'" :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
    <list-cell class="cell" v-for="order in orderList">
      <view class="item" @tap="toDetail(order)">
        <view class="wenyue-font">预约区间: {{ order.intervalName }}</view>
        <view class="wenyue-font">预约日期: {{ order.date }}</view>
        <view class="wenyue-font">预约时间: {{ order.startTime.slice(0, 5) }}</view>
      </view>
    </list-cell>
    <view class="item" v-if="isLoadAll" style="text-align: center">{{ loadingTxt }}</view>
  </view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import slFilter from '@/components/sl-filter/sl-filter.vue';
  import {intervalList, recordAllList} from "../../api/order";

  export default {
    components: {ListCell, slFilter},
    data() {
			return {
        selectTitle: "区间选择",
        themeColor: '#000000',
        menuList: [{
          'title': '区间选择',
          'detailTitle': '请选择区间',
          "defaultSelectedIndex": 0,
          'key': 'default',
          'detailList': []
        }],
        orderList: [],
        paramsData: {
          current: 1,
          size: 10
        },
        pages: 1,
        isLoadAll: false,
        loadingTxt: '加载中...',
			}
		},
    onLoad() {
      intervalList().then(res => {
        const intervalList = res.data
        intervalList.map(item => {
          this.menuList[0]["detailList"].push({
            'title': item.name,
            'value': item.id
          })
        })
      }).catch(err => {
        // ...
      })
      this.getRecordList()
    },
		methods: {
      result(val) {
        this.paramsData.intervalId = val.default
        this.orderList = []
        this.getRecordList()
      },
      getRecordList() {
        recordAllList(this.paramsData).then(res => {
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
