<style lang="less">
@green:#3cb4ae;

.chat-atbox{
    box-shadow: 0 0 5px rgba(1, 1, 1, 0.4);
    padding: 10px 0;
    background-color: #fff;
    border-radius: 4px;
    .scrollable{
        max-height: 300px;
        overflow-x: auto;
    }
    .user-list{
        .user-item{
            height: 26px;
            line-height: 26px;
            text-indent: 15px;
            width: 160px;
            cursor: pointer;
            font-size: 14px;
            &:hover,&.active{
                background-color: @green;
                color: #fff;
            }
        }
    }
    &.angle{
        &:after{
            content: " ";
            border: 6px solid #fff;
            border-left-color: transparent;
            border-bottom-color: transparent;
            display: block;
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%) rotate(135deg);
            box-shadow: 2px -2px 2px rgba(1, 1, 1, 0.12);
        }
    }
}
</style>
<template>
    <div class="chat-atbox">
        <div class="user-list">
            <div class="scrollable">
                <div class="user-item" v-for="(user,index) in group.members" :key="user.id" :class="{active:user.name==active.name}" @mouseenter.stop="onMouseEnter(user,index)"  @click.stop="onClick(user,index)">{{user.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
let el;
export default {
    props:{
        group:{
            type:Object,
            required:true,
        },
        active:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
        }
    },
    mounted(){
        el = this.$el.querySelector('.user-list');
    },
    updated(){
        const a = el.querySelector('.active');
        if(a&&a.scrollIntoViewIfNeeded){
            a.scrollIntoViewIfNeeded();
        }
    },
    methods:{
        onMouseEnter(user,index){
            this.$emit('hover',user,index);
        },
        onClick(user,index){
            this.$emit('choose',user,index);
        }
    }
}
</script>


