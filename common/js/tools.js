//兼容性的className的写法
Document.prototype.getByClassName = function(className){
	//获取类数组document.getElementsByTagName('*')，但是类数组上没有slice标签
	//通过call方法改变this指向
	//从头截取到尾，存放截取出来的内容
	var allDomArr = Array.prototype.slice.call(document.getElementsByTagName('*'),0);
	var filterDomArr = [];
	function dealClass(dom) {
		//多个空格变成一个空格，并且最开始的空格不能要
		var reg = /\s+/g;
		var arrClass = dom.className.replace(reg, " ").trim().split(' ');
		return arrClass;
	}
	// 循环一个数组
	// forEach无法brek，必须循环遍历完所有的数组
	allDomArr.forEach(function(ele, index) {
		//把不规则的class类名处理成规则的class类名
		var classStrArr = dealClass(ele);
		for(var i = 0, len = classStrArr.length; i < len; i++){
			if(classStrArr[i] == className){
				filterDomArr.push(ele);
				break;
			}
		}
	});
	return filterDomArr;
};
function loadScript(url, calssback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if(script.readyState) {
		// 兼容IE
		script.onreadystatechange = function() {
			if(script.readyState == "complete" || script.readyState == "loaded"){
				tools[callback]();
			}	
		};	
	}else {
		script.onload = function () {
			//safari chrome firefox opera
			tools[callback]();
		};
	}
	script.src = url; //这句执行完，系统就会下载东西了，下载过程也是异步下载，但是还没执行
	document.body.appendChild(script);// 把标签插入到页面里面，这个才会执行
} 
// 圣杯模式（继承）
function inhreit(Target, Origin) {
	function F(){}
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	// 为了让Target的constuctor指向自己
	Target.prototype.constuctor = Target;
	//如果想知道Target继承自哪个，调用这个函数
	Target.prototype.uber = Origin.prototype;
}
// 深度克隆
function deepClone(Target, Origin) {
	Origin = Origin || {};
	for(var prop in Target) {
		//排除原型链上面的
		if(Target.hasOwnProperty(prop)){
			if(Target[prop] !== null && typeof(Target[prop]) === 'object'){
				if(Object.prototype.toString.call(Target[prop]) === '[object Array]'){
					Origin[prop] = [];
				}else {
					Origin[prop] = {};
				}
				//或者Origin[prop] = Object.prototype.toString.call(Target[prop]) === '[object Array]' ? [] :{}
				deepClone(Target[prop],Origin[prop]);
			}else {
				Origin[prop] = Target[prop];
			}		
		}
	}
	return Origin;
}
//区分类型
function type(target) {
	var typeStr = typeof(target),
		template = {
			'[object Array]' : 'array',
			'[object Object]' : 'object',
			'[object Number]' : 'number - object',
			'[object Boolean]' : 'boolean - object',
			'[object String]' : 'string - object',
		};
	//如果是null
	if(target === null) {
		return 'null';
	}else if(typeStr == 'object'){
		//数组,对象,包装类
		return template[Object.prototype.toString.call(target)];
	}else {
		return typeStr;
	}
	
}
//删除左右两边的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 求滚轮条距离
function getScrollOffset(){
	if(window.pageXOffset){
		return {
			x : window.pageXOffset,
			y : window.pageYOffset
		};
	}else {
		return {
			x : document.body.scrollLeft + document.documentElement.scroolLeft,
			y : document.body.scrollLeft + document.documentElement.scrollTop
		};
	}

}
// 求鼠标坐标位置
function getMousePos(event) {
       var e = event || window.event;
       var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
       var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
       var x = e.pageX || e.clientX + scrollX;
       var y = e.pageY || e.clientY + scrollY;
       return { x: x, y: y };
}
//判断浏览器窗口尺寸
function getViewportOffset(){
	//判断标准模式还是
	if(window.innerWidth){
		return {
			w : window.innerWidth,
			h : window.innerHeight
		};
	}else {
		if(document.compatMode === 'BackCompat') {
			return {
				x : document.body.clientWidth,
				y :  document.body.clientHeight
			};
		}else {
			return {
				w : document.documentElement.clientWidth,
				h :  document.documentElement.clientHeight
			};
		}
	}
}
// 获取元素的style样式
function getStyle(ele, prop) {
	if(window.getComputedStyle){
		return window.getComputedStyle(ele, null)[prop];
	}else {
		// 兼容IE及IE8以下
		return ele.currentStyle[prop];
	}
}
//绑定事件
function addEvent(elem, type, handle){
	if(elem.addEventListener){
		elem.addEventListener(type, handle, false);
	}else if(elem.attachEvent) {
		elem.attachEvent('on' + type, function(){
			//改变this指向为dom元素
			handle.call(elem);
		});
	}else{
		elem['on' + type] = handle;
	}
}
// 解绑事件
function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    }else if (elem.detachEvent) {
        elem.detachEvent('on' + type.handler);
    }else {
        elem['on' + type] = false;
    }
}

//取消冒泡
function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation();
	}else {
		event.cancelBubble = true;
	}
}
// 阻止默认事件
function cancelHandler(event) {
	if(event.preventDefault){
		event.preventDefault();
	}else {
		event.returnValue = false;
	}
}
// 拖拽元素
function drag(elem) {
	var disX,
		disY;
	 addEvent(elem, 'mousedown', function(e) {
		var event = e || window.event,
			mousePos = getMousePos(event);
		disX = mousePos.x - parseInt(getStyle(elem, 'left'));
		disY = mousePos.y - parseInt(getStyle(elem, 'top'));
		// 为了解决鼠标帧频比监听速度快（导致鼠标出去后来不及反应，元素没跟上），应该监听document
		addEvent(document, 'mousemove', mouseMove);
		addEvent(document, 'mouseup', mouseUp);
		// 取消冒泡，阻止默认事件
		stopBubble(event);
		cancelHandler(event);
	});
	 function mouseMove(e) {
	 	var event = e || window.event,
			mousePos = getMousePos(event);
			elem.style.left = mousePos.x - disX + 'px';
			elem.style.top = mousePos.y - disY + 'px';
	 }
	 function mouseUp(e) {
	 	var event = e || window.event;
	 	removeEvent(document, 'mousemove', mouseMove);
	 	removeEvent(document, 'mouseup', mouseUp);
	 }
}
// 插入到元素后面
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
// 格式化1为01
function format(a){
    return a.toString().replace(/^(\d)$/,'0$1');
    //如果a是一位数字，则在前面加上0，返回该字符串  比如a 为1,则返回"01"
}
// 在页面加载时执行多个函数
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload!="function") {
        window.onload = func;
    }
    else {
        window.onload = function(){
            oldonload();
            func();
        };
    }
}
