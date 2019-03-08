<style lang="less">
.us-section-item{
    margin: 20px 0;
    .section-title{
        height:40px;
        border: 1px #e0e0e0 solid;
        border-radius:4px;
        border-left: 4px solid #44bcb7;
        line-height: 40px;
        padding-left: 15px;
        cursor: pointer;
        .ctl{
            float: right;
            padding-right: 15px;
            &.red{
                color: #f88;
            }
        }
    }
    .section-body{
        min-height: 100px;
        overflow: auto;
        .i-n{
            width: 190px;
            font-size: 14px;
            color: #b8b7b8;
            float: left;
            text-align: right;
            padding-right: 10px;
        }
        .i-v{
            color: #495060;
            font-size: 14px;
            padding-left: 200px;
        }
        .level2{
            &.i-text{
                margin-top: 5px;
                margin-bottom: 5px;
            }
        }
        .full{
            margin-top: 15px !important;
            margin-bottom: 15px !important;
            width: 100%;
            clear: both;
            overflow: auto;
        }
        .i-text{
            margin: 10px 0;
            &.half{
                width: 50%;
                float: left;
                height: 63px;
                overflow: hidden;
            }
        }
        .level1-title{
            margin: 20px 0;
            font-size: 20px;
            color: #495060;
            clear: both;
        }
        .level2-title{
            margin: 20px 0;
            font-size: 18px;
            color: #495060;
            clear: both;
        }
        .level3-title{
            margin: 20px 0;
            font-size: 16px;
            color: #495060;
            clear: both;
        }
        .d-item-list{
            &.sm{
                width:600px;
            }
            .span4,.span6{
                float:left;
                width:40%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .span6{
                width:60%;
            }
        }
        .fontw{
            font-size:16px;
            color:#333;
        }
        .ul-wrap{
            margin:10px 0;
            &>ul{
                padding-left: 40px;
                &>li{
                    list-style: circle;
                }
            }
        }
        .i-v-table{
            overflow: hidden;
            width: 400px;
            .i-v-item{
                overflow: hidden;
                margin: 5px 0;
            }
            .label{
                float: left;
                width: 50%;
            }
            .value{
                float: left;
                width: 50%;
            }
        }
        .mtable{
            display: inline-block;
            .thead{
                overflow: hidden;
                .th{
                    float: left;
                    width: 100px;
                    padding: 10px 2px;
                    &:first-child{
                        width: 360px;
                    }
                }
            }
            .tbody{
                .tr{
                    border-top: 1px solid #f6f6f6;
                }
                .td{
                    float: left;
                    width: 100px;
                    padding: 6px 2px;
                    &:first-child{
                        width: 360px;
                    }
                }
            }
        }
    }

}
</style>
<template>
    <div class="us-section-item">
        <div class="section-title" @click="titleClick">
            <span class="name" v-text="k"></span>
            <span class="ctl red" v-if="show">关闭</span>
            <span class="ctl" v-else>开启</span>
        </div>
        <div class="section-body" v-if="show">
            <template v-if="k=='overview'">
                <div class="f1" v-for="(item1,index1) in data" :key="index1">
                    <template v-if="typeof item1 =='object'">

                        <div class="level2-title" v-text="item1.label?item1.label:index1"></div>
                        <div v-for="(item2,index2) in item1" :key="index2">
                            <template v-if="typeof item2 == 'object'">
                                <div class="level1 i-text" :class="layout(item2.label,item2.value)">
                                    <div class="i-n" v-text="item2.label"></div>
                                    <div class="i-v" v-text="item2.value"></div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="level1 i-text" :class="layout(index2,item2)">
                                    <div class="i-n" v-text="index2"></div>
                                    <div class="i-v" v-text="item2"></div>
                                </div>
                            </template>
                        </div>
                    </template>
                    <div v-else class="level1 i-text" :class="layout(index1,item1)">
                        <div class="i-n" v-text="index1"></div>
                        <div class="i-v" v-text="item1"></div>
                    </div>
                </div>
            </template>
            <template v-if="k=='ranking'">
                <div v-for="(item,index) in data" :key="index" class="ranking level1 i-text" :class="layout(item.label,item.rank)">
                    <div class="i-n" v-text="item.label"></div>
                    <div class="i-v" v-text="item.rank"></div>
                </div>
            </template>
            <template v-if="k=='applying'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div v-for="(item1,index1) in item" :key="index1">
                        <template v-if="index1!='label'">
                            <div class="level2-title" v-text="item1.label"></div>
                            <div v-for="(item2,index2) in item1" :key="index2" class="level3 i-text" v-if="item2.label" :class="layout(item2.label,item2.display_value)">
                                <div class="i-n" v-text="item2.label"></div>
                                <div class="i-v" v-html="Array.isArray(item2.display_value)?item2.display_value.join('<br>'):item2.display_value"></div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="k=='paying'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div v-for="(item1,index1) in item" :key="index1">
                        <template v-if="index1!='label'">
                            <div class="level2-title" v-text="item1.label"></div>
                            <div v-for="(item2,index2) in item1" :key="index2" class="level3 i-text" v-if="item2.label" :class="layout(item2.label,item2.display_value)">
                                <div class="i-n" v-text="item2.label"></div>
                                <div class="i-v" v-html="Array.isArray(item2.display_value)?item2.display_value.join('<br>'):item2.display_value"></div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="k=='academics'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div v-for="(item1,index1) in item" :key="index1">
                        <template v-if="index1!='label'">
                            <div class="level2-title" v-text="item1.label"></div>
                            <template v-for="(item2,index2) in item1">
                                <template v-if="index2 !='label'">
                                    <div v-if="typeof item2.display_value =='string' " class="level3 i-text" :class="layout(item2.label,item2.display_value)">
                                        <div class="i-n" v-text="item2.label"></div>
                                        <div class="i-v" v-text="item2.display_value"></div>
                                    </div>
                                    <template v-else>
                                        <div class="level3 i-text full" >
                                            <div class="i-n" v-text="item2.label"></div>
                                            <div class="i-v">
                                                <template v-if="Array.isArray(item2.display_value)">
                                                    <template v-if="Array.isArray(item2.display_value[0])">
                                                        <div v-for="(itemv,index) in item2.display_value" class="d-item-list clearfix sm">
                                                            <div v-text="itemv[0]" class="span6"></div>
                                                            <div v-text="itemv[1]" class="span4"></div>
                                                        </div> 
                                                    </template>
                                                    <div v-else-if="typeof item2.display_value[0] == 'object' " v-for="(itemv,indexv) in item2.display_value" class=" clearfix " :key="indexv">
                                                        <div v-text="itemv.label" class="fontw"></div>
                                                        <div class="ul-wrap" v-html="Array.isArray(itemv.value)?('<ul><li>'+itemv.value.join('</li><li>')+'</li></ul>'):itemv.value"></div>
                                                    </div>
                                                    <template v-else>
                                                        <div v-html="item2.display_value.join('<br>')"></div>
                                                    </template>
                                                </template>
                                                <div rel="sp" v-else-if="typeof item2.display_value=='object'" v-for="(itemv,indexv) in item2.display_value" class="d-item-list clearfix sm" :key="indexv">
                                                    <div v-text="itemv[0]" class="span6"></div>
                                                    <div v-text="itemv[1]" class="span4"></div>
                                                </div>
                                                <template v-else>
                                                    {{item2.display_value}}
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                    
                                </template>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="k=='student-life'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div v-for="(item1,index1) in item" :key="index1">
                        <template v-if="index1!='label'">
                            <div class="level2-title" v-text="item1.label"></div>
                            <template v-for="(item2,index2) in item1">
                                <div v-if="typeof item2.display_value=='string'" class="level3 i-text" :class="layout(item2.label,item2.display_value)">
                                    <div class="i-n" v-text="item2.label"></div>
                                    <div class="i-v" v-html="item2.display_value"></div>
                                </div>
                                <template v-else-if="Array.isArray(item2.display_value)">
                                    <div class="level3 i-text full" v-if="typeof item2.display_value[0]=='object'">
                                        <div class="i-n" v-text="item2.label"></div>
                                        <div class="i-v">
                                            <div v-for="item in item2.display_value" class=" i-v-item">
                                                <div class="label" v-text="item.label"></div>
                                                <div class="value" v-text="item.value"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="i-n" v-html="item2.label"></div>
                                        <div class="i-v" v-html="item2.display_value.join('<br>')"></div>
                                    </div> 
                                </template>
                                <template v-else>
                                    <div class="i-n" :rel="JSON.stringify(item2)" v-text="item2.label"></div>
                                    <div class="i-v" rel="obj" v-html="item2.display_value"></div>
                                </template>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="k=='campus-info'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div v-for="(item1,index1) in item" :key="index1">
                        <template v-if="index1!='label'">
                            <div>
                            </div>
                            <div class="level2-title" v-text="item1.label"></div>
                            <div v-for="(item2,index2) in item1" :key="index2" class="level3 i-text clearfix">
                                <div class="i-n" v-text="item2.label"></div>
                                <div class="i-v" v-html="Array.isArray(item2.display_value)?item2.display_value.join('<br>'):item2.display_value"></div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="k=='campus-safety'">
                <div v-for="(item,index) in data" :key="index">
                    <div class="level1-title" v-text="item.label"></div>
                    <div class="mtable">
                        <div class="thead">
                            <div class="th" v-for="titem in item.thead" v-text="titem">
                            </div>
                        </div>
                        <div class="tbody">
                            <div class="tr clearfix" v-for="titem in item.tbody">
                                <div class="td" v-for="t in titem" v-text="t"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            
            <template v-if="k=='rankings_indicator'">
                <div v-for="(item,index) in data" :key="index" class="level1">
                    <template v-if="typeof item == 'object'">
                        <div class="level1-title" v-text="item.label"></div>
                        <div v-for="(item1,index1) in item" :key="index1" class="level2">
                            <div class="i-text clearfix">
                                <div class="i-n" v-text="item1.label"></div>
                                <div class="i-v" v-html="item1.display_value"></div>
                            </div>
                        </div>
                    </template> 
                    <div v-else>
                        <div class="level1-title" v-text="index"></div>
                        <div v-html="item"></div>
                    </div>
                </div>
            </template>

            

        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            required:true,
        },
        k:{
            type:String,
        },
        show:{
            type:Boolean,
        }
    },
    data(){
        return {};
    },
    methods:{
        titleClick(){
            this.$emit('show',this.k);
        },
        layout(...v){
            let l = 0;
            v.forEach(item=>{
                if(item){
                    console.info(item);
                    if(typeof item =='object') {
                        item = JSON.stringify(item);
                    }
                    l+=item.length;
                }
            });
            if(l<100){
                return {half:true};
            }
            return {full:true};
        }
    }
}
</script>


