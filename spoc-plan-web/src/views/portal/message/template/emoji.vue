<style lang="less">
.emoji-all{
    background-color: #fff;
    box-shadow: 0 0 5px rgba(1, 1, 1, 0.4);
    border-radius: 4px;    
    padding: 10px;
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
    >ul{
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 180px;
        >li{
            cursor: pointer;
            transition: all 0.1s ease;
            &:hover{
                transform: scale(1.1);
            }
            .icon{
                font-size: 30px;
            }
        }
    }
}
</style>
<template>
    <div class="emoji-all">
        <ul>
            <li v-for="(item,index) in emoji" :key="index" @click="choose(item)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#'+item"></use>
                </svg>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        var emoji = [];
        let k='icon-emoji-';
        emoji.push(k);
        for(let i=1;i<=29;i++){
            emoji.push(k+i);
        }
        return {
            emoji:emoji
        };
    },
    methods:{
        choose(item){
            this.$emit('choose',item);
        }
    }
}
</script>


