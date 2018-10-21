// banner轮播
function Banner(){};
$.extend(Banner.prototype,{
    init:function(options){
        this.btn_list=$(options.btn_list);
        this.slider_list=$(options.slider_list);
        this.nowIndex=0;
        this.bindEvent();
    },
    bindEvent:function(){
        this.btn_list.mouseenter($.proxy(this.toIndex,this)); 
    },
    toIndex:function(event){
        var target=event.target;
        this.nowIndex=$(target).index();
        this.animation();
    },
    animation:function(){
        this.slider_list.eq(this.nowIndex).addClass("active");
        this.slider_list.eq(this.nowIndex).siblings().removeClass("active");
        this.btn_list.eq(this.nowIndex).addClass("on");
        this.btn_list.eq(this.nowIndex).siblings().removeClass("on");
    }
})
var banner=new Banner();
banner.init({
    btn_list:".btn_list span",
    slider_list:".slider_list li"
});
// 推荐图书轮播
function Focus(){};
$.extend(Focus.prototype,{
    init:function(options){
        this.slider_item=$(options.slider_item);
        this.sk_left=$(options.sk_left);
        this.sk_right=$(options.sk_right);
        this.list_btn=$(options.list_btn);
        this.pageState=$(options.pageState)
        this.nowIndex=0;
        this.list_wrap=this.slider_item.parent();
        this.slider_num=this.slider_item.length;
        if(this.sk_left==0&&this.sk_right==0&&this.list_btn==0){
            this.autoPlay();
        }else{
            this.bindEvent();
        }
        if(options.autoPlay){
            this.autoPlay();
        }
    },
    bindEvent:function(){
        this.sk_left.click($.proxy(this.prev,this));
        this.sk_right.click($.proxy(this.next,this));
        this.list_btn.mouseover($.proxy(this.toIndex,this));
    },
    next:function(){
        if(this.nowIndex==this.slider_num-1){
            this.list_wrap.css({
                left:0
            })
            this.nowIndex=1;
        }else{
            this.nowIndex++;
        }
        this.animate()
    },
    prev:function(){
        if(this.nowIndex==0){
            this.list_wrap.css({
                left:-(this.slider_num-1)*(this.slider_item[0].offsetWidth)
            })
            this.nowIndex=this.slider_num-2
        }else{
            this.nowIndex--;
        }
        this.animate()
    },
    toIndex:function(event){
        var target=event.target;
        this.nowIndex=$(target).index();
        this.animate()
    },
    autoPlay:function(){
        $("#sk_chn_list").mouseenter(function(){
                        clearInterval(this.banner_timer)
                    }.bind(this))
        $("#sk_chn_list").mouseleave(function(){
                        this.banner_timer=setInterval(function(){
                        this.next()
                        }.bind(this),2000)
                    }.bind(this))
    },
    animate:function(){
        this.list_wrap.stop().animate({
            left:-this.nowIndex*(this.slider_item[0].offsetWidth)
        })
        this.list_btn.removeClass("active");
            var index;
            if(this.nowIndex==this.item_num-1){
                index=0;
            }else{
                index=this.nowIndex;
            }
            this.list_btn.eq(index).addClass("active");
            this.pageState.html(index)
    }
})
var focus=new Focus();
focus.init({
    slider_item:".tempList li",
    sk_left:"#temp_left",
    sk_right:"#temp_right",
    pageState:".pageState span",
    autoPlay:false
});
var focus1=new Focus();
focus1.init({
    slider_item:".colum1 .colum_list li",
    sk_left:"#column_left",
    sk_right:"#column_right",
    autoPlay:false
})
var focus2=new Focus();
focus2.init({
    slider_item:".colum2 .colum_list li",
    sk_left:".colum2 #column_left",
    sk_right:".colum2 #column_right",
    autoPlay:false
})
var focus3=new Focus();
focus3.init({
    slider_item:".colum3 .colum_list li",
    sk_left:".colum3 #column_left",
    sk_right:".colum3 #column_right",
    autoPlay:false
})