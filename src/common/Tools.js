/**
 * Created by jige on 2016/12/8.
 */
import Vue from 'vue';

//公共工具类
class Tools {
    static alt(data) {
        alert(data)
    }

    static getHash() {
        return location.hash;
    }

    static getPathname() {
        return location.pathname;
    }

    static getStrLen(str) {
        //计算字符串长度(英文占1个字符，中文汉字占2个字符)
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }

        return len;
    }

    static isEmpty(param) {
        if (typeof param == 'object') {
            /* 是否为数组 */
            if ((param == null) || (Object.prototype.toString.call(param) === '[object Array]' && param.length == 0) ||
                (param.hasOwnProperty('length') && param.length == 0)) {
                return true;
            }
            for (var name in param) {
                return false;
            }
            return true;
        }
        return (typeof param == 'undefined' || (typeof param == 'string' && param == '') || (typeof param == 'number' && isNaN(param)));
    }

    //写cookies
    static setCookie(name, value, day) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    //读取cookies
    static getCookie(name) {
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        var arr = document.cookie.match(reg);
        if (arr)
            return unescape(arr[2]);
        else
            return null;
    }

    //删除cookies
    static delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    /**参数说明：
     * 根据长度截取先使用字符串，超长部分追加…
     * str 对象字符串
     * len 目标字节长度
     * 返回值： 处理结果字符串
     */
    static cutString(str, len) {
        //length属性读出来的汉字长度为1
        if(str.length*2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for(var i = 0;i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if(strlen >= len){
                    return s.substring(0,s.length-1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if(strlen >= len){
                    return s.substring(0,s.length-2) + "...";
                }
            }
        }
        return s;
    }

    /**
     * @name Utils#toThousands
     * @function
     * @desc 千位符格式化。
     * @param Number 待格式化数字
     * @return String 截取后字符串
     */
    static toThousands(num) {
        var num = (num || 0).toString(),
            re = /\d{3}$/,
            result = '';
        while ( re.test(num) ) {
            result = RegExp.lastMatch + result;
            if (num !== RegExp.lastMatch) {
                result = ',' + result;
                num = RegExp.leftContext;
            } else {
                num = '';
                break;
            }
        }
        if (num) {
            result = num + result;
        }
        return result;
    }

    /**
     * @name Utils#toThousandsDot
     * @function
     * @desc 带小数的千位符格式化。
     * @param Number 待格式化数字
     * @param Number 保留小数位
     * @return String 截取后字符串
     */

    static toThousandsDot(s, n){
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
        var l = s.split('.') [0].split('').reverse(),
            r = s.split('.') [1];
        var  t = '';
        for (var i = 0; i < l.length; i++)
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
    }
}

export default Tools;