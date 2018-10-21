function ShopCar(){};
$.extend(ShopCar.prototype , {
    init:function(opts){
        this.cart=$(".cart");
        this.push_cart=$("#empty");
        this.showNumEle=$(".cart .counts");
        this.goodsList=$(".img_show_list");
        this.loadJson()
        .then(function(res){
        this.json=res.subjects;
        this.getItem();
        })
        this.bindEvent();
        this.showNum();
    },
    loadJson(){
        var opt={
            url:"data.json",
            data:{start:0,count:20},
            context:this
        };
        return $.ajax(opt); 
    },
    getItem:function(){
        var str=window.location.hash;
        str=str.replace("#","");
        var html = "";
        var html2="";
        for(var i = 0 ; i < this.json.length ; i ++){
            if(this.json[i].id===str){
               html+=`
                <img src="${this.json[i].images.small}">
               `;
               html2+=`<h2>${this.json[i].title}</h2>`;
            }
        }
        $(".bg_img").html(html);
        $(".show_big").html(html);
        $(".summary .name").html(html2);
    },
    bindEvent:function(){
        this.push_cart.click($.proxy(this.addCart,this));
        this.cart.on( "mouseenter" , this.showCar.bind(this) )
        this.cart.on( "mouseleave" , this.hideCar.bind(this) )
        this.cart.on( "click" , this.clearCar.bind(this) )
    },
    addCart:function(){
        var str=window.location.hash;
        str=str.replace("#","");
        var goodsId=str;
       var cookie;
        if(!(cookie = $.cookie("shopCar")) || cookie == "[]"){
            $.cookie("shopCar",`[{"id":${goodsId},"num":1}]`);
            this.showNum();
            return 0;
        }
        var cookieArray = JSON.parse(cookie);
        var flag=false;
        if(cookieArray[0].id == goodsId){
            flag=true;
            cookieArray[0].num ++;
        }
        if(flag == false){
            cookieArray.push({
                id : goodsId,
                num : 0
            });
        }
       
        $.cookie("shopCar",JSON.stringify(cookieArray));
        this.showNum();
    },
    showCar:function(){
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){
            return 0;
        }
        var cookieArray = JSON.parse(cookie);
        var html3 = "";
        for(var i=0;i<this.json.length;i++){
            if(this.json[i].id==cookieArray[0].id){
                html3 += `<li>
                    <img src="${this.json[i].images.small}" alt="">
                    <span>${this.json[i].title}</span>
                    <h4>数量：${cookieArray[0].num}</h4>
                </li>`;
            }
        }
       this.goodsList.html(html3);

    },
    hideCar:function(){
        this.goodsList.children().remove();
    },
    clearCar:function(){
        var flag = confirm("是否清空购物车?");
        if(flag){
            $.cookie("shopCar","");
            this.hideCar();
        }
        this.showNum()
    },
    showNum:function(){
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){
            this.showNumEle.html(0)
            return 0;
        }
        var cookieArray = JSON.parse($.cookie("shopCar"));
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            sum += Number(cookieArray[i].num);
        }

        this.showNumEle.html(sum);
    }
    
})

var shopCar = new ShopCar();
shopCar.init();