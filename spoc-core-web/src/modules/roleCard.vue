<style lang="less">
@green:#44bcb7;

.role-item-box{
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    width: 190px;
    height: 46px;
    box-sizing: border-box;
    padding: 0 5px;
    position: relative;
    font-size: 14px;
    float: left;
    &:hover,&.active{
        border-color: @green;
        cursor: pointer;
    }
    .circle-box{
        display: inline-block;
        overflow: hidden;
        height: 100%;
        margin: 0 2px;
        .n{
            display: inline-block;
            background-color: @green;
            border-radius: 50%;
            color: #fff;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            margin-left: 5px;
            margin-right: 5px;
            text-transform: uppercase;
            margin-top: 11px;
        }
    }
    .name{
        line-height: 46px;
        height: 100%;        
        display: inline-block;
        max-width: 110px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .dropdown{
        display: none;
        position: absolute;
        z-index: 22;
        top: 22px;
        left: -70px;
        padding: 10px 4px;
        width: 120px;
        box-sizing: border-box;
        box-shadow: 0 0 18px 2px rgba(4, 0, 0, 0.2);
        border-radius: 4px;
        font-size: 14px;
        background-color: #fff;
        color: #000;
        .litem{
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            text-align: center;
            &:hover{
                color: @green;
                background-color:rgb(233, 247, 247);
            }
        }
    }
    .iconfont{
        position: absolute;
        right: 9px;
        top: 0;
        cursor: pointer;
        color: #ccc;
        &:hover{
            color: @green;
            .dropdown{
                display: block;
            }
        }
    }
}
</style>
<template>
<div class="role-item-box">
    <div class="circle-box">
        <span class="n">{{item.name|first}}</span>
    </div>
    <span class="name">{{item.name}} ({{item.num||0}})</span>
    <i class="iconfont icon-xia" v-if="edit">
        <div class="dropdown">
            <p class="litem" @click.stop="$emit('ongive',item)">授权</p>
            <p class="litem" @click.stop="$emit('onpeople',item)" v-if="item.groupFlag==0">分配人员</p>
            <p class="litem" @click.stop="$emit('onupdate',item)">编辑角色</p>
            <p class="litem" @click.stop="$emit('ondel',item)">删除角色</p>
            <p class="litem" @click.stop="$emit('onSync',item)">同步用户</p>
        </div>
    </i>
</div>
</template>
<script>
export default {
    props:{
        item:{
            type:Object,
            required:true,
        },
        edit:{
            type:Boolean,
            default:true,
        },
        disabled:{
            type:Function,
            default:function(){}
        }
    },
    data(){
        return {

        };
    },
    methods:{

    },
    filters:{
        first(text){
            return text.substr(0,1);
        }
    }
}
</script>


