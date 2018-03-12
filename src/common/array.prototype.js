/**
 * Created by jige on 2016/12/12.
 */
Array.prototype.max = function () {   //最大值
    return Math.max.apply({}, this)
}
Array.prototype.min = function () {   //最小值
    return Math.min.apply({}, this)
}