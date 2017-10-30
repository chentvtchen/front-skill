/**
 * 如果是pc端跳到相应的pc端界面
 * 这段代码应该放在手机端3
 * @return {[type]} [description]
 */
function judgePC(){
	(function(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
			window.location.href = 'pc page';
		}else if(ua.indexOf('iphone')>0||ua.indexOf('android')>0){
			//window.location.href = 'phone page';
		}
	})();
}
function ajax(method,url){
    var xmlhttp;
    if(window.XMLHttpRequest){
    	// code for  IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    }else{
        // code for IE6, IE5
        xmlhttp = ActiveXObject("Microsoft.XMLHTTP");
    }
    //判定执行状态
    xmlhttp.onreadystatechange = function(){
        /*
        readyState
            0: 请求未初始化
            1: 服务器连接已建立
            2: 请求已接收
            3: 请求处理中
            4: 请求已完成，且响应已就绪
        status
            200：服务器响应正常。
		 	304：该资源在上次请求之后没有任何修改（这通常用于浏览器的缓存机制，使用GET请求时尤其需要注意）。
		 	400：无法找到请求的资源。
			401：访问资源的权限不够。
			403：没有权限访问资源。
			404：需要访问的资源不存在。
			405：需要访问的资源被禁止。
			407：访问的资源需要代理身份验证。
			414：请求的URL太长。
			500：服务器内部错误。
        */
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
        	//获得字符串形式的响应数据
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
      }
    xmlhttp.open(method,url,true);
    /**
     * 以下几种情况使用post
     * 1.无法使用缓存文件（更新服务器上的文件或数据库）
     * 向服务器发送大量数据（POST没有数据量显示）
     * 发送包含位置字符的用户输入时，POST比GET更稳定也更可靠
     */
    //设置头信息
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    //将信息发送到服务器
    xmlhttp.send();    

}
