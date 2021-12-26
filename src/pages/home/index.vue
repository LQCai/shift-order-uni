<template>
	<view class="container">
		<swiper class="banner-swiper" circular autoplay :interval="5000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
				<navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
          <image :src="item" mode="widthFix"></image>
        </navigator>
			</swiper-item>
		</swiper>
		<view class="content">
			<!-- section-1 begin -->
			<view class="section-1">
        <view class="item" @tap.stop="order">
          <image src="/static/images/home/home_icon_eatin.png" mode="widthFix"></image>
          <view class="wenyue-font">开始预约</view>
        </view>
        <view class="item" @tap.stop="recordList">
          <image src="/static/images/home/home_icon_waimai1.png" mode="widthFix"></image>
          <view class="wenyue-font">预约记录</view>
        </view>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
		data() {
			return {
				swipers: [
          "/static/images/product/banner.jfif"
				],
        loginInfo: {}
			}
		},
    onShow() {
      this.loginInfo = uni.getStorageSync('loginInfo')
      if (this.loginInfo === {} || this.loginInfo === '') {
        uni.switchTab({
          url: '/pages/my/index'
        })
      }
    },
		methods: {
      order () {
        uni.navigateTo({
          url: "/pages/order/index"
        })
      },
      recordList () {
        uni.navigateTo({
          url: "/pages/order/recordList"
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		max-height: 100%;
	}

	.banner-swiper {
		width: 100%;
		height: 600rpx;

		.banner-swiper-item {
			image {
				width: 100%;
			}
		}
	}

	.content {
		width: 100%;
		padding: 0 30rpx;
		position: relative;
	}

	.section-1 {
		position: relative;
		background-color: $bg-color-white;
		margin-top: -60rpx;
		border-radius: $border-radius-lg;
		padding: 60rpx 0;
		display: flex;
		margin-bottom: 30rpx;
		box-shadow: $box-shadow;

		.item {
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			&:nth-child(1):after {
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				width: 2rpx;
				background-color: $border-color;
			}

			image {
				width: 100rpx;
				margin-bottom: 20rpx;
			}

			.wenyue-font {
				font-size: 48rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	.section-2 {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;

		.item {
			width: 335rpx;
			background-color: #EAEBEC;
			padding: $spacing-row-lg 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: $border-radius-lg;

			.title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-lg;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 10rpx;
				}
			}

			.tips {
				color: $text-color-assist;
				font-size: $font-size-base;
			}
		}
	}

	.section-3 {
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-assist;
		padding: 0 10rpx;

		.my-integral {
			flex: 1;
			display: flex;
			flex-direction: column;

			.integrals {
				display: flex;
				align-items: center;
				font-size: $font-size-lg;
				color: $text-color-base;
				margin-bottom: 10rpx;

				.neutra-font {
					margin-left: 10rpx;
					font-size: 42rpx;
				}
			}
		}

		.my-code {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 30rpx;
			position: relative;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: $spacing-col-sm;
			}

			&:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				border-left: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			}
		}
	}
</style>
