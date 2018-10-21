function ajaxGet(url){
    return new Promise(function(succ){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send(null);
        xhr.onload = function(){
            succ(xhr.response)
        }
    })
}
function ajaxPost(url,data){
    return new Promise(function(succ){
        var xhr = new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8;");
        xhr.send(data);
        xhr.onload = function(){
            succ(xhr.response)
        }
    })
}
function jsonp(url,cb){
    return new Promise(function(succ){
        // 提取出了前端的全局函数; 可以任性随便写;
        var cb_name = "callback" + new Date().getTime();
        window[cb_name] = function(res){
            succ(res);
        }
        var script = document.createElement("script");
        var opt = /\?/.test(url) ? "&" : "?";
        script.src = url + opt + cb +"="+cb_name;
        document.body.appendChild(script);
        script.onload = function(){
            this.remove();
        }
    })
}