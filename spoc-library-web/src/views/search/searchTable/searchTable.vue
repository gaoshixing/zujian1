<style lang="less">
@greenLight:#e3f5f4;
@green:#d7e9e8;
@themeColor:#44bcb7;
.table-wrap{
    width: 100%;
    outline: none;
    margin: 40px auto;
    overflow: auto;
    border-left: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
    .scroll-able{
        position: relative;
        height: 100%;
        width: 100%;
    }
    .fixedtable{
        height: 100%;
        box-shadow: 3px 0 19px rgba(100, 100, 100, 0.6);
        position: relative;
        z-index: 88;
        &.alone{
            box-shadow: none;
            .thead{
                border-right: 1px solid #d9d9d9;
            }
        }
    }
    .maintable{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-right: 1px solid #d9d9d9;
        .scroll{
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            height: 10px;
            transition: background-color .2s linear, opacity .2s linear;
            z-index: 88;
            bottom: 0;
            // &:hover,:focus{
                background: rgba(1, 1, 1, 0.2);
            //     .scrollbar{
            //         opacity: 1;
            //     }
            // }
            .scrollbar{
                transition: background-color .2s linear, opacity .2s linear;
                width: 160px;
                position: absolute;
                left: 0;
                // border-radius: 4px;
                height: 6px;
                background-color: #eee;
                top: 2px;
                cursor: pointer;
                // opacity: 0;
            }
        }
    }
    .nav-icon{
        .icon-left{
            position: absolute;
            top: 85px;
            left: 350px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(1, 1, 1, 0.2);
            z-index: 89;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            &:hover{
                background: rgba(1, 1, 1, 0.3);
            }
            .arrow-dropleft{
                font-size: 0;
                width: 0;
                height: 0;
                border: 12px solid #fff;
                border-left: none;
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-right-width:14px;
                position: relative;
                left: -2px;
            }
        }
        .icon-right{
            position: absolute;
            top: 85px;
            right: 10px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(1, 1, 1, 0.2);
            z-index: 89;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            &:hover{
                background: rgba(1, 1, 1, 0.3);
            }
            .arrow-dropright{
                font-size: 0;
                width: 0;
                height: 0;
                border: 12px solid #fff;
                border-right: none;
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-right-width:14px;
                position: relative;
                left: 2px;
            }
        }

      
    }
    .search-table-fixed{
        .tbody{
            .row{
                &:nth-child(odd){
                    background-color: #f0f0f0;
                }
                &:nth-child(even){
                    background-color: #e4e4e4;
                }
            }
        }
        
    }
    .thead{
        box-shadow: 0 3px 9px rgba(100, 100, 100, 0.4);
        position: relative;
        z-index: 77;
        background-color: #f0f0f0;
        .item-th{
            min-width: 30px;
            min-height: 30px;
            font-size: 14px;
            font-weight: bold;
            float: left;
            height: 100%;
            text-align: center;
            border-right: 1px solid #d9d9d9;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:last-child{
                border-right: none;
            }
        }
        .hcol{
            height: 60px;
            line-height: 60px;
            background-color: @greenLight;
            float: left;
            border-right: 1px solid #d9d9d9;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            
        }
        .cross{
            border-bottom: 1px solid #d9d9d9;
            height: 40px;
            line-height: 40px;
        }
        .header-filters{
            position: absolute;
            top: 60px;
            left: 0px;
            background-color: #fff;
            background-clip: padding-box;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            white-space: nowrap;
            padding: 8px 0;
            &>li{
                font-size: 12px;
                line-height: 1.2;
                margin: 0;
                padding: 7px 16px;
                text-align: left;
                cursor: pointer;
                &:hover{
                    background: #f3f3f3;
                }
                &.active{
                    color: #fff;
                    background: rgba(68, 188, 183, 0.9);
                }
            }
        }
        .ivu-icon-funnel.active{
            color: @themeColor;
        }
    }
    .tbody{
        min-height: 20px;
        .row{
            &:nth-child(odd){
                background-color: @greenLight;
                &.active{
                    background-color:darken(@greenLight,5);
                }
            }
            &:nth-child(even){
                background-color: @green;
                &.active{
                    background-color: darken(@green,6);
                }
            }
            overflow: hidden;
            border-bottom: 1px solid #d9d9d9;
            box-sizing: border-box;
        }
        .item-cell{
            min-width: 30px;
            min-height: 30px;
            float: left;
            border-right: 1px solid #d9d9d9;
            padding: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &>div{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &:empty{
                    height: 18px;
                }
            }
            a{
                color: #44bcb7;
            }
        }
    }
}
</style>
<template>
    <div class="table-wrap" @keydown.left.prevent="onKeyLeftRight(-50)" @keydown.right.prevent="onKeyLeftRight(50)" tabindex="1">
        <div class="scroll-able">
            <div class="fixedtable" :style="fixedTableStyle" :class="{alone:alone}">
                <div class="search-table-fixed">
                    <div class="thead clearfix">
                        <div class="item-th" v-for="(item,index) in fixedTable.header" :style="item.style">
                            <rheader :index="index" :column="item" :render="item.render"></rheader>
                        </div>
                    </div>
                    <div class="tbody">
                        <div class="row clearfix" v-for="idata in data" :class="{active:idata.id==currIndex}" @mouseenter="onMouseEnter(idata)">
                            <div class="item-cell" v-for="(item,index) in fixedTable.body" :style="item.style">
                                <rheader :index="index" :column="item" :row="idata" :render="item.render"></rheader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="maintable" :style="mainStyle" v-if="!alone">
                <div class="search-table">
                    <div class="thead clearfix" :style="rowStyle">
                        <div class="item-th" v-for="(item,index) in mainTable.header" :style="item.style">
                            <rheader :index="index" :column="item" :render="item.render"></rheader>
                        </div>
                    </div>
                    <div class="tbody">
                        <div class="row clearfix" v-for="idata in data" :style="rowStyle" :class="{active:idata.id==currIndex}" @mouseenter="onMouseEnter(idata)">
                            <div class="item-cell" v-for="(item,index) in mainTable.body" :style="item.style">
                                <rheader :index="index" :column="item" :row="idata" :render="item.render"></rheader>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scroll" :style="{left:`${scroll.left}px`}"><div class="scrollbar" :style="{left:`${scroll.barleft}px`}"></div></div>
            </div>
            <div class="nav-icon" v-if="!alone">
                <div class="icon-left" :style="{left:`${fixedTableWidth+10}px`}" @click.stop.prevent="onKeyLeftRight(-500)"><i class="arrow-dropleft"></i></div>
                <div class="icon-right" @click.stop.prevent="onKeyLeftRight(500)"><i class="arrow-dropright"></i></div>
            </div>
            
        </div>
    </div>
    
    

</template>

<script>
import rheader from './header.js';
const barwidth = 160;
let moveTimer;
export default {
    props:{
        data:{
            type:Array,
            required:true,
        },
        ftable:{
            type:Object,
            required:true,
        },
        mtable:{
            type:Object,
        },
        alone:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            currIndex:'',
            fixedTable:this.ftable,
            mainTable:this.mtable,
            scroll:{
                left:0,
                barleft:0,
            },
            enable:false,
            speed:1.2,
            maintable:null,
            tableThead:null,
            bar:null,
        };
    },
    computed:{
        rowWidth(){
            let width = 0;
            this.mainTable.body.forEach((item,index)=>
            {
                const w = Number(item.style.width.replace('px',''));
                if(w){
                    width+=w;
                } else {
                    console.error('error width');
                }
            });
            return width;
        },
        rowStyle(){
            const s = {width:`${this.rowWidth}px`};
            return s;
        },
        fixedTableWidth(){
            let width = 0;
            this.fixedTable.body.forEach((item,index)=>
            {
                const w = Number(item.style.width.replace('px',''));
                if(w){
                    width+=w;
                } else {
                    console.error('error width');
                }
            });
            return width;
        },
        fixedTableStyle(){
            if(this.alone){
                return {width:'100%'}
            }
            const s = {width:`${this.fixedTableWidth}px`};
            return s;
        },
        mainStyle(){
            return {left:`${this.fixedTableWidth}px`};
        }
    },
    created(){
    },
    mounted(){
        if(!this.$el.querySelector){
            return
        }
        let speed = 1.2;
        this.maintable = this.$el.querySelector('.maintable');
        if(this.maintable){
            this.tableThead = this.maintable.querySelector('.thead');
            this.bar = this.maintable.querySelector('.scrollbar');
            this.initPage();
        }
        
    },
    components:{
        rheader,
    },
    methods:{
        initPage(){
            
            this.maintable.addEventListener('wheel',(e)=>{
                const width = this.tableThead.clientWidth;
                const fixedwidth = this.maintable.clientWidth;
                if(e.deltaX!==0 && Math.abs(e.deltaX)> Math.abs(e.deltaY) ){
                    this.maintable.scrollLeft += e.deltaX;
                    this.scroll.left = this.maintable.scrollLeft;
                    this.scroll.barleft = (fixedwidth-barwidth)*(this.maintable.scrollLeft/(width-fixedwidth));
                    e.preventDefault();
                }
            });
            

            this.bar.addEventListener('mousedown',()=>{
                this.enable = true;
                document.addEventListener('mousemove',this.mouseMove);
            });
            document.addEventListener('mouseup',this.mouseUp);
            window.addEventListener('resize',this.onResize);

        },
        onKeyLeftRight(dx=50){
            if(!this.mtable){
                return;
            }
            const width = this.tableThead.clientWidth;
            const fixedwidth = this.maintable.clientWidth;
            
            this.maintable.scrollLeft += dx;
            this.scroll.left = this.maintable.scrollLeft;
            
            this.scroll.barleft = (fixedwidth-barwidth)*(this.maintable.scrollLeft/(width-fixedwidth));
        },
        onResize(){
            const width = this.tableThead.clientWidth;
            const fixedwidth = this.maintable.clientWidth;
            if(this.maintable.scrollLeft>width-fixedwidth){
                this.maintable.scrollLeft = width-fixedwidth;
            }
            this.scroll.left = this.maintable.scrollLeft;
            
            this.scroll.barleft = (fixedwidth-barwidth)*(this.maintable.scrollLeft/(width-fixedwidth));
        },
        moveLeft(){
            this.stopMove();
            moveTimer = setInterval(()=>{
                this.onKeyLeftRight(-2);
            },20);
        },
        moveRight(){
            this.stopMove();
            moveTimer = setInterval(()=>{
                this.onKeyLeftRight(2);
            },20);
        },
        stopMove(){
            clearInterval(moveTimer);
        },
        mouseUp(){
            document.removeEventListener('mousemove',this.mouseMove);
        },
        mouseMove(e){
            if(!this.enable){
                return;
            }
            const width = this.tableThead.clientWidth;
            const fixedwidth = this.maintable.clientWidth;


            this.maintable.scrollLeft +=e.movementX*((width-fixedwidth)/(fixedwidth-barwidth));
            this.scroll.left = this.maintable.scrollLeft;
            
            
            this.scroll.barleft = (fixedwidth-barwidth)*(this.maintable.scrollLeft/(width-fixedwidth));
            
          
        },
        calc(h,params,title)
        {
            const body = this.mainTable.body;
            const ind = params.column.colIndex;
            const arr = [];
            let width = 0;
            for(let i = ind[0];i<ind[1];i++)
            {
                const curr = body[i];
                const style = curr.style;
                const w = Number(style.width.replace('px',''));
                if(w){
                    width += w;
                } else {
                    console.error('error width');
                }
                const item = curr.col;
                let st = {};
                let content ;
                if(typeof item =='string') {
                    content = item;
                } else {
                    content = item(h,curr,params);
                }
                arr.push(h('div',{class:'hcol',style:Object.assign({width:`${w}px`},st)},content));
            }
            params.column.style.width = `${width}px`;
            return h('div',{style:{width:`${width}px`}},[
                h('div',{class:'cross'},title),
                h('div',{class:'clearfix'},arr)
            ]);
        },
        onMouseEnter(idata){
            this.currIndex = idata.id;
            this.$el.focus();
        }
    },
    watch:{
        
    }
}
</script>


