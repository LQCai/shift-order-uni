<template>
	<view class="container">
    <list-cell class="cell" v-for="item in list">
      <view class="item">
        <view class="wenyue-font">工号: {{ item.code }}</view>
        <view class="wenyue-font">姓名: {{ item.userName }}</view>
        <view class="wenyue-font">联系电话: {{ item.phone }}</view>
        <view class="wenyue-font" v-if="item.remark">预约备注: {{ item.remark }}</view>
        <view class="wenyue-font" v-if="item.status === 1 ">预约状态: {{ item.statusName }}</view>
        <view class="wenyue-font" style="color: red" v-if="item.status !== 1 ">预约状态: {{ item.statusName }}</view>
      </view>
    </list-cell>
    <view class="item" v-if="isLoadAll" style="text-align: center">{{ loadingTxt }}</view>
  </view>
</template>

<script>
  import ListCell from "../../components/list-cell/list-cell";
  import {recordAllDetailList, recordList} from "../../api/order";

  export default {
    components: {ListCell},
    data() {
			return {
        list: [],
        paramsData: {
          current: 1,
          size: 10,
        },
        pages: 1,
        isLoadAll: false,
        loadingTxt: '加载中...',
			}
		},
    onLoad(options) {
      this.paramsData.shiftOrderId = options.id
      this.getRecordList()
    },
		methods: {
      getRecordList() {
        recordAllDetailList(this.paramsData).then(res => {
          this.list = [...this.list, ...res.data.records]
          this.pages = res.data.pages
        }).catch(err => {
          // ...
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
