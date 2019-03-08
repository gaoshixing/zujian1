<style lang="less">
.user-list-items{
    .li{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        &:hover{
            background-color: #f5f5f5;
            .ivu-icon{
                visibility: visible;
            }
        }
        .name{
            display: inline-block;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .ivu-icon{
            float: right;
            margin-top: 14px;
            margin-right: 20px;
            cursor: pointer;
            color: #999;
            visibility: hidden;
            &:hover{
                color: #495060;
            }
        }
    }
}
</style>

<template>
    <div class="user-list-items">
        <ul class="ul">
            <template v-for="item in userList">
                <li class="li"  v-if="actived(item)" :key="item.id">
                    <span class="name">{{item.name}}({{item.enName}})</span>
                    <Icon type="close" @click.native="removeItem(item)"></Icon>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        userList:{
            type: Array,
            default:function(){
                return [];
            }
        }
    },
    data(){
        return {
            removed:[]
        };
    },
    methods:{
        actived(item){
            return this.removed.indexOf(item.id) < 0;
        },
        removeItem(item){
            this.removed.push(item.id);
        },
        getCurrList(){
            return this.userList.filter(item=>{
                return this.removed.indexOf(item.id) < 0;
            });
        },
        reset(){
            this.removed= [];
        }
    }

}
</script>


