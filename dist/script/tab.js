function Tab(){};
$.extend(Tab.prototype,{
    init:function(sort_item,submenu){
        this.hd=$(sort_item);
        //console.log(this.hd)
        this.bd=$(submenu);
        //console.log(this.bd)
        this.nowIndex=0;
        this.bindEvent();
    },
    bindEvent:function(){
        this.hd.mouseenter($.proxy(this.changeIndex,this))
    },
    changeIndex:function(event){
        var target=event.target;
        this.nowIndex=$(target).index();
        console.log(this.nowIndex)
        this.show();
    },
    show:function(){
        this.hd.eq(this.nowIndex).siblings().removeClass("on");
        this.hd.eq(this.nowIndex).addClass("on");
        this.bd.eq(this.nowIndex).siblings().removeClass("active");
        this.bd.eq(this.nowIndex).addClass("active");
     }
})
var tab=new Tab();
tab.init(".newbook1 .newbook_item",".newbook1 .newbook_bd")
var tab1=new Tab();
tab1.init(".sort_recommend1",".sort_recommend2")
var tab2=new Tab();
tab2.init(".another .newbook_item","")

function NowHot(){};
$.extend(NowHot.prototype,{
    init:function(){
        this.now_item_show=$(".now_item .title a");
        this.now_item=$(".now_item");
        this.bindEvent()
    },
    bindEvent:function(){
        this.now_item.mouseenter($.proxy(this.show,this)) 
    },
    show:function(event){
        var target=event.target;
        this.nowIndex=$(target).index();
        this.now_item.eq(this.nowIndex).siblings().removeClass("on");
        this.now_item.eq(this.nowIndex).addClass("on");
    }
})
var nowHot=new NowHot();
nowHot.init();