/**
 * 1.问题：封装函数 f，使 f 的 this 指向指定的对象
 */
/**
 * 解释：apply第二个参数可选的，不一定要有，方法是立即执行函数，所以需要放在函数里面，到调用的时候再执行
 * bind返回的是一个函数
 */
function bindThis(f, oTarget) {
	return function(){
        return f.apply(oTarget,arguments);
    }
}

function bindThis(f,oTarget){
	return  f.bind(oTarget);
}

/**
 * 2.问题：指定参数名称，返回该参数的值 或者 空字符串
 * 不指定参数名称，返回全部的参数对象 或者 {}
 * 如果存在多个同名参数，则返回数组 
 */
function getUrlParam(sUrl,sKey){
	var obj = {};
	var index = sUrl.indexOf('?');
	//url没有带参数的时候
	if(index == -1){
		if(sKey == undefined){
			return obj;
		}else {
			return '';
		}
	}
	//分离出所有参数
	var queryString = (sUrl.split('?')[1]).split('#')[0];
	var query = queryString.split('&');
	for(var i=0;i<query.length;i++){
		var keyValue = query[i].split('=');
		var key = keyValue[0];
		var value = keyValue[1];
		//如果值为空
		if(value == ''){
			continue;
		}
		//判断是否拥有这个属性值
		if(obj.hasOwnProperty(key)){
			//如果是数组，说明已经有这个数组了
			if(Array.isArray(obj[key])){
				obj[key].push(value);
			}else{//已经有这个属性了，还有更多的属性需要把它转换成数组
				var val = obj[key];
				obj[key] = [];
				obj[key].push(val);
				obj[key].push(value);
			}
		}else{
			obj[key] = value;
		}
	}
	if(sKey){
		return obj[sKey]?obj[sKey]:'';
	}else{
		return obj;
	}
}
/**
 * 3.问题：查找两个节点的最近的一个共同父节点，可以包括节点自身
 */
//随便找一个节点，知道某祖先节点（或自己）包含另外一个节点，说明就是这个父节点
function commonParentNode(oNode1, oNode2) {
    for(;oNode1;oNode1=oNode1.parentNode){
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}
/**
 * 4.根据包名，在指定空间中创建对象
 * 输入：namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
 * 输出：{a: {test: 1, b: {c: {d: {}}}}}
 */
function namespace(oNamespace,sPackage){
	var arr = sPackage.split('.');
	var res = oNamespace;
	for(var i=0,len = arr.length;i<len;i++){
		if(arr[i] in oNamespace){ //如果空间名在对象中
			//如果为object就保留引用，否则将此属性设为空对象
			if(typeof oNamespace[arr[i]] != 'object'){
				oNamespace[arr[i]] = {};
			}
		}else{
			oNamespace[arr[i]] = {};
		}
		oNamespace = oNamespace[arr[i]];
	}
	return res;
}
/**
 * 5.为 Array 对象添加一个去除重复项的方法
 * 输入：[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
 * 输出：[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
 */
Array.prototype.uniq = function () {
	var resArr = [];
	var flag1 = true;
	var flag2 = true;
	for(var i=0,len = this.length;i<len;i++){
		//匹配不到,需要添加
		if(resArr.indexOf(this[i]) == -1){
			if(this[i] != this[i]){  
				//如果两者不相等，说明为NaN或者{}
				//为{}的时候
				if(typeof(this[i])== 'object'){
					if (flag2) {
						resArr.push(this[i]);
						flag2 = false;
					}
				}else if(flag1){
					resArr.push(this[i]);
					flag1 = false;
				}

			}else{
				resArr.push(this[i]);
			}
		}
	}
	return resArr;
}

/**
 * 6.用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等
 */
function fibonacci(n){
	if(n==1||n==2){
		return 1;
	}
	return fibonacci(n-1) + fibonacci(n-2);
}
/**
 * 7.按所给的时间格式输出指定的时间
格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014
yy: 年份，14
MM: 月份，补满两位，09
M: 月份, 9
dd: 日期，补满两位，05
d: 日期, 5
HH: 24制小时，补满两位，13
H: 24制小时，13
hh: 12制小时，补满两位，01
h: 12制小时，1
mm: 分钟，补满两位，14
m: 分钟，14
ss: 秒，补满两位，20
s: 秒，20
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五
 */
//在牛客网上多次通过不了，有人可以解释一下不
function formatDate(t,str){
  var s = (t.getHours()%12) ? t.getHours()%12 : 12;
  var obj = {
    yyyy:t.getFullYear(),
    yy:(""+ t.getFullYear()).slice(-2),
    M:t.getMonth()+1,
    MM:("0"+ (t.getMonth()+1)).slice(-2),
    d:t.getDate(),
    dd:("0" + t.getDate()).slice(-2),
    H:t.getHours(),
    HH:("0" + t.getHours()).slice(-2),
    h:s,
    hh:("0"+s).slice(-2),
    m:t.getMinutes(),
    mm:("0" + t.getMinutes()).slice(-2),
    s:t.getSeconds(),
    ss:("0" + t.getSeconds()).slice(-2),
    w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
  };
  return str.replace(/([a-z]+)/ig,function($1){return obj[$1]});
}
/**
8.如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2
输入：'hello world, 牛客', false
输出：17
 */
function strLength(s, bUnicode255For1) {
    if(bUnicode255For1){
    	return s.length;
    }else{
    	var len = s.length;
    	for(var i=0;i<s.length;i++){
    		if(s.charCodeAt(i)>255){
    			len++;
    		}
    	}
    	return len;
    }
}
/**
 * 9.判断输入是否是正确的邮箱格式
 */
//邮箱格式 登录名@主机名.域名
function isAvailableEmail(sEmail) {
	// \w 匹配任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
	//+ 号代表前面的字符必须至少出现一次（1次或多次）。
	//* 号代表字符可以不出现，也可以出现一次或者多次（0次、或1次、或多次）
	var reg = /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i
}
/**
 * 10.将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
rgb 中每个 , 后面的空格数量不固定
十六进制表达式使用六位小写字母
如果输入不符合 rgb 格式，返回原始输入
 */

function rgb2hex(sRGB){
	//\s表示空白，包括空格、换行、tab缩进等所有的空白
    var rgb = /^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
    var ret = sRGB.match(rbg);
    if(ret){
        var str = '#';
        for(var i=1,;i<=3;i++){
            var m = parseInt(ret[i]);
            if(m>=0 &&m <= 255){
                str += m<16 ? '0'+m.toString(16) : m.toString(16);
            }else{
                return sRGB;
            }
        }
        return str;
    }else{
        return sRGB;
    }
}
/**
 * 11.css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
以 - 为分隔符，将第二个起的非空单词首字母转为大写
-webkit-border-image 转换后的结果为 webkitBorderImage
 */
function cssStyle2DomStyle(sName) {
    var result = sName.replace(/^-/,'').split('-');
    for(var i=1,len = result.length;i<len;i++){
    	result[i] = result[i].replace(/^\w/,function(e){
    		return e.toUpperCase();
    	})
    }
    return result.join('');
}
/**
 * 12.统计字符串中每个字符的出现频率，返回一个 Object，key 为统计字符，value 为出现频率
不限制 key 的顺序
输入的字符串参数不会为空
忽略空白字符
 */
//我的思路
function count(str) {
	var obj = {};
	var result = str.replace(\/s\,'');
	for(var i=0,len = result.length;i<len;i++){
		if(obj.hasOwnProperty(result[i])){
			obj[result[i]]++;
		}else{
			obj[result[i]] = 1;
		}
	}
	return obj;
}
//他人思路
function count(str) {
    var count = {};
    var str1 = str.match(/\S/g)
    for(var i in str1) {
        if(count[str1[i]]){
            count[str1[i]]++;
        }
        else{
            count[str1[i]] = 1;
        }
    }
    return count;
}