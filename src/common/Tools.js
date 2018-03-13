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
	
	/**
	 * 计算字符串长度(英文占1个字符，中文汉字占2个字符)
	 * @str 任意字符串
	 * @returns {number}返回字符串的长度
	 */
	static getStrLen(str) {
		var len = 0;
		for(var i = 0; i < str.length; i++) {
			if(str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
				len += 2;
			} else {
				len++;
			}
		}
		return len;
	}
	
	/**
	 * 判断变量是否为空
	 * @param 需要判断的字段
	 * 返回值为true或false
	 */
	static isEmpty(param) {
		if(typeof param == 'object') {
			/* 是否为数组 */
			if((param == null) || (Object.prototype.toString.call(param) === '[object Array]' && param.length == 0) ||
				(param.hasOwnProperty('length') && param.length == 0)) {
				return true;
			}
			for(var name in param) {
				return false;
			}
			return true;
		}
		return(typeof param == 'undefined' || (typeof param == 'string' && param == '') || (typeof param == 'number' && isNaN(param)));
	}
	
	/**
	 * 存储localStorage
	 */
	static setStore(name, content) {
		if(!name) return;
		if(typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		window.localStorage.setItem(name, content);
	}
	
	/**
	 * 获取localStorage
	 */
	static getStore(name) {
		if(!name) return;
		return window.localStorage.getItem(name);
	}
	
	/**
	 * 删除localStorage
	 */
	static removeStore(name) {
		if(!name) return;
		window.localStorage.removeItem(name);
	}
	
	/**
	 * 设置cookie
	 * @name 设置的cookie名字
	 * @value 设置的cookie值
	 * @day 设置cookie有效时间
	 */
	static setCookie(name, value, day) {
		var Days = day || 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
	
	/**
	 * 读取 指定的cookie
	 * @name 要读取的cookie名字
	 */
	static getCookie(name) {
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		var arr = document.cookie.match(reg);
		if(arr)
			return unescape(arr[2]);
		else
			return null;
	}
	
	/**
	 * 删除 指定的cookie
	 * @name 要删除的cookie名字
	 */
	static delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
	
	/**
	 * 根据长度截取先使用字符串，超长部分追加…
	 * @str 对象字符串
	 * @len 目标字节长度
	 * 返回值： 处理结果字符串
	 */
	static cutString(str, len) {
		if(str.length * 2 <= len) {
			return str;
		}
		var strlen = 0;
		var s = "";
		for(var i = 0; i < str.length; i++) {
			s = s + str.charAt(i);
			if(str.charCodeAt(i) > 128) {
				strlen = strlen + 2;
				if(strlen >= len) {
					return s.substring(0, s.length - 1) + "...";
				}
			} else {
				strlen = strlen + 1;
				if(strlen >= len) {
					return s.substring(0, s.length - 2) + "...";
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
		while(re.test(num)) {
			result = RegExp.lastMatch + result;
			if(num !== RegExp.lastMatch) {
				result = ',' + result;
				num = RegExp.leftContext;
			} else {
				num = '';
				break;
			}
		}
		if(num) {
			result = num + result;
		}
		return result;
	}
}

export default Tools;