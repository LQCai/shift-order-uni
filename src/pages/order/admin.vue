<template>
	<view class="container">
    <view class="select-form">
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">筛选日期</view>
          <view>
            <picker class="flex-fill" mode="date" :value="date" @change="handleDateChange">
              <view>{{ date }}</view>
            </picker>
          </view>
        </view>
      </list-cell>
      <list-cell line-right padding="30rpx">
        <view class="form-item">
          <view class="label">筛选时刻</view>
          <view>
            <picker class="flex-fill" :value="index" :range="timeList" :range-key="'value'" @change="handleTimeChange">
              <view>{{ timeList[index].value }}</view>
            </picker>
          </view>
        </view>
      </list-cell>
    </view>

    <list-cell class="cell" v-for="order in orderList">
      <view class="item" @tap="toDetail(order)">
        <view class="wenyue-font">预约区间: {{ order.intervalName }}</view>
        <view class="wenyue-font">预约日期: {{ order.date }}</view>
        <view class="wenyue-font">预约时间: {{ order.startTime.slice(0, 5) }}</view>
        <view class="wenyue-font">预约人数: {{ order.activeOrderCount }}</view>
      </view>
    </list-cell>
    <view class="item" v-if="isLoadAll" style="text-align: center">{{ loadingTxt }}</view>
  </view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import slFilter from '@/components/sl-filter/sl-filter.vue';
  import {intervalStartList, recordAllList} from "../../api/order";
  import {formatTimeDate} from "@/utils";

  export default {
    components: {ListCell, slFilter},
    data() {
			return {
        date: '2022-01-01',
        selectTitle: "时刻选择",
        themeColor: '#000000',
        menuList: [{
          'title': '时刻选择',
          'detailTitle': '请选择时刻',
          "defaultSelectedIndex": 0,
          'key': 'default',
          'detailList': [
            {
              'title': '不限',
              'value': ''
            }
          ]
        }],
        index: 0,
        timeList: [
          {
            'key': '',
            'value': '不限'
          }
        ],
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
      this.date = formatTimeDate(new Date().getTime(), 'yyyy-MM-dd')
      intervalStartList().then(res => {
        const intervalList = res.data
        intervalList.map(item => {
          this.timeList.push(item)
        })
      }).catch(err => {
        // ...
      })
      this.paramsData.date = this.date
      this.getRecordList()
    },
		methods: {
      handleTimeChange({target: {value}}) {
        this.index = value
        this.paramsData.shiftBindKey = this.timeList[value].key
        this.orderList = []
        this.getRecordList()
      },
      handleDateChange: function(e) {
        this.date = e.target.value
        this.paramsData.date = e.target.value
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
          url: `/pages/order/adminDetail?id=${order.id}`
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

  .select-form {
    .form-item {
      width: 100%;
      display: flex;
      align-items: center;

      .label {
        margin-left: 14%;
        font-size: 14px;
        width: 160rpx;
      }

      input {
        flex: 1;
      }
    }
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
