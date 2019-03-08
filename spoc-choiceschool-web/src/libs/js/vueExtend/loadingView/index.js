if (typeof window._loadingView === "undefined") {
    window._loadingViewArr = [];
    window._loadingView=document.createElement("div");
    window._loadingView.className = "loadingView";
    var frame = window.document.createElement("div");
    frame.className = "loadingViewFrame";
    frame.innerHTML='<div class="loadingBox1 loadingBox"></div>\
                      <div class="loadingBox2 loadingBox"></div>\
                      <div class="loadingBox4 loadingBox"></div>\
                      <div class="loadingBox3 loadingBox"></div>'
    window._loadingView.appendChild(frame);
    window.document.body.appendChild(window._loadingView);
}
var install={
    install(Vue) {
        if (this.installed) return;
        this.installed = true;
        var animateTimer=0,
            node=window._loadingView,
            animateComplate=null;
        const isDef = v => v !== undefined
        const registerInstance = (vm, callVal) => {
            let i = vm.$options._parentVnode
            if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
                i(vm, callVal)
            }
        }
        function css(_v,_k){
    		if(typeof _v ==="string"){
    			if(_k !==undefined){
    				node.style[_v]=_k;
    				return;
    			}else{
    				var style=node.style[_v];
    				if(!style){
    					style=window.getComputedStyle ? window.getComputedStyle(node,null)[_v] :node.currentStyle[_v];
    				}
    				return style;
    			}
    		}
    		for(var name in _v){
    			node.style[name]=_v[name];
    		}
    	};
        function animate(_obj, _time, _sp,_fn){
            window.clearTimeout(animateTimer);
            if(animateComplate)animateComplate();
            animateComplate=_fn;
            window.setTimeout(function(){
                css({transition:"none",webkitTransition:"none",mozTransition:"none"});
                if(_time){
                    css({transition: "all ease "+_time+"ms",webkitTransition: "all ease "+_time+"ms",mozTransition: "all ease "+_time+"ms"});
                    animateTimer=setTimeout(function(){
                        css({transition:"none",webkitTransition:"none",mozTransition:"none"});
                        if(typeof _fn ==="function")_fn.call(node);
                    },_time);
                }
                css(_obj);
            },1);
        };
        function showHide(_name, _isShow) {
            if (!_name) return null;
            let loadingId = _name;
            var index = window._loadingViewArr.indexOf(loadingId);
            if (index >= 0) {
                if (_isShow) return true;
                window._loadingViewArr.splice(index, 1);
            } else {
                if (_isShow) {
                    window._loadingViewArr.push(loadingId);
                }
            }
            if(window._loadingViewArr.length){
                var opacity=Number(css("opacity"));
                if(isNaN(opacity) || opacity == 0 || css("display")=="none"){
                    css({opacity:0,display:"block"});
                }
                animate({opacity:1,display:"block"},500,"ease",null);
            }else{
                animate({opacity:0},500,"ease",function(){
                    css("display","none");
                });
            }
            return window._loadingViewArr.length > 0;
        }
        var loadingView = window.loadingView={
            show(_name) {
                return showHide(_name, true);
            },
            hide(_name) {
                return showHide(_name, false);
            }
        }
        Vue.mixin({
            beforeCreate() {
                this.$loadingView = loadingView;
                registerInstance(this, this)
            },
            destroyed() {
                registerInstance(this)
            }
        })
    }
}
export default install;
