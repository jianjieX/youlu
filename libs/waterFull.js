function WaterFull(){};
$.extend(WaterFull.prototype,{
	init:function(){
		this.trade_grid=$(".bookList")[0];
		this.rendering=false;
		this.page_num=0;
		this.loadJson()
		.then(function(date){
			this.render()
		}.bind(this));
		this.bindEvent()
	},
	bindEvent:function(){
		onscroll=this.ifRender.bind(this);
	},
	ifRender:function(){
		var children=this.trade_grid.children;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var clientHeight = document.documentElement.clientHeight;
		if(this.rendering){
			return 0;
		}
		if(children.length==0){
			return 0;
		}
		var lastChildren = children[children.length - 1];
        var lastTop = lastChildren.offsetTop;
		if(scrollTop+clientHeight>lastTop){
			this.rendering=true;
			this.page_num++;
			this.render();
		}
	},
	loadJson:function(){
		return new Promise(function(success){
			var xhr=new XMLHttpRequest();
			xhr.open("GET","data.json");
			xhr.send(null);
			xhr.onload=function(){
				if(xhr.status){
					this.json=JSON.parse(xhr.response);
					success(xhr.response);
				}
			}.bind(this);
		}.bind(this))
	},
	render:function(){
		var html="";
		var list=this.json.subjects;
		for(var i=this.page_num*5;i<=this.page_num*5+4;i++){
			html+=`<li class="bookList_item">
            <div class="allInfo">
                <a href="list.html">
                    <img src="${list[i].images.small}" alt="">
                </a>
                <div class="bookname">
                    <a href="list.html">${list[i].title}</a>
                </div>
                <div class="nowPrice">￥23.00</div>
				<div class="agoPrice">￥36.00</div>
            </div>
        </li>`;
		}
		this.trade_grid.innerHTML+=html;
		this.rendering=false;
	}
})
var waterFull=new WaterFull();
waterFull.init();