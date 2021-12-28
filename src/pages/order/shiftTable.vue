<template>
	<view class="container">
    <view class="font-size-base text-color-assist" style="text-align: center">请横屏查看</view>
    <movable-area scale-area>
      <movable-view direction="all" scale="true" scale-min="1">
        <image :src="tableUrl" :mode="'widthFix'"></image>
      </movable-view>
    </movable-area>
	</view>
</template>

<script>
  import {shiftTable} from "../../api/common";
  import ListCell from "../../components/list-cell/list-cell";

  export default {
    components: {ListCell},
    data() {
			return {
        tableUrl: ''
			}
		},
    onLoad() {
      shiftTable().then(res => {
        this.tableUrl = res.data
      }).catch(err => {
        // ...
      })
    },
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		max-height: 100%;
	}

  movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height:100%;
  }

  movable-area {
    height: 100%;
    width: 100%;
    position:fixed;
    overflow: hidden;
  }
</style>
