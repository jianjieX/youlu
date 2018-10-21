function Magnifier(){}
$.extend(Magnifier.prototype,{
    init:function(options){
        this.small=$(options.small);
        this.big=$(options.big);
        this.frame=$(options.frame);
        this.big_img=$(options.big_img);
        this.small_img=$(options.small_img);
        this.size=87.5;
        this.bindEvent();
    },
    bindEvent:function(){
        this.small.mouseenter($.proxy(this.show,this));
        this.small.mousemove($.proxy(this.enlarge,this));
        this.small.mouseleave($.proxy(this.hide,this));
    },
    show:function(){
        this.big.css({
            display:"block"
        })
        this.frame.css({
            display:"block"
        })
    },
    hide:function(){
        this.big.css({
            display:"none"
        })
        this.frame.css({
            display:"none"
        })
    },
    enlarge:function(event){
        var nLeft=event.offsetX-this.size/2;
        var nTop=event.offsetY-this.size/2;
        if(nLeft<0){
            nLeft=0
        }
        if(nTop<0){
            nTop=0;
        }
        var maxLeft=this.small.width()-this.frame.width();
        var maxTop=this.small.height()-this.frame.height();
        if(nLeft>maxLeft){
			nLeft=maxLeft;
		}
        if(nTop>maxTop){
			nTop=maxTop;
		}
		this.frame.css({
            left:nLeft,
            top:nTop
        })
		var protoX=this.big_img.width()/this.small.width()
        var protoY=this.big_img.height()/this.small.height()
        this.big_img.css({
            left:-nLeft*protoX,
            top:-nTop*protoY
        })
        this.frame.css({
            backgroundPositionX:-nLeft,
            backgroundPositionY:-nTop
        })
    }
})
var magnifier=new Magnifier();

