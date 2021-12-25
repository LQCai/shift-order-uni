// 格式化时间
export function formatTimeDate(time, pattern) {
  // 时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
  var date = new Date(time)
  var year = date.getFullYear()
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  // var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  // 拼接
  if (pattern === 'yyyy-MM') {
    return year + '-' + month
  }
  if (pattern === 'yyyy-MM-dd') {
    return year + '-' + month + '-' + day
  }
  if (pattern === 'yyyy/MM') {
    return year + '/' + month
  }
  if (pattern === 'yyyy/MM/dd') {
    return year + '/' + month + '/' + day
  }
}

/**
 * object对象深拷贝
 * @param {source} 原对象
 * @returns 目标对象
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 计算两经纬度距离
 *
 * @param latitude1
 * @param latitude2
 * @param longitude1
 * @param longitude2
 * @returns {string}
 */
export function countDistance(latitude1, latitude2, longitude1, longitude2) {
    const R = 6378.137;//地球半径
    const latitudeRad = (latitude1 * Math.PI) / 100.0
    const latitudeMerchantRad = (latitude2 * Math.PI) / 100.0
    const a = latitudeRad - latitudeMerchantRad
    const b = (longitude1 * Math.PI) / 100.0 - (longitude2 * Math.PI) / 100.0
    let distance = Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(latitudeRad) * Math.cos(latitudeMerchantRad) * Math.pow(Math.sin(b / 2), 2)));
    return (Math.round(distance * R * 1000) / 10000 * 10).toFixed(2)
}

export default {
	formatTimeDate,
	deepClone
}