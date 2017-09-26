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