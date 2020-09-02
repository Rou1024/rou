var $ = {
    ajax: function(options){
        // url
        var url = options.url;
        if(url === undefined){
            throw new Error("ajax必须写url");
            return;
        }
        // type
        var type = options.type || "get"; //请求类型  默认get
        var datatype = options.datatype || "string"; //返回的数据类型  默认样式是string

        // ie兼容
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest; //高级
        } else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); //ie6
        }
        // 404报错
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    // 成功
                    if((typeof options.success) === "function"){
                        var response = "";
                        if(datatype === "string"){
                            response = xhr.responseText;
                        } else if (datatype === "josn"){
                            response = JSON.parse(xhr.responseText);
                        }
                        options.success(response); //回调函数
                    }
                }
            } 
        }
        xhr.open(type,url,true);
        xhr.send(null);      
    }  
}