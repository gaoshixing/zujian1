<style lang="less">
.main-types-list{
    margin: 10px;
    .types-section{
        &-title{
            font-weight: 500;
            font-size: 16px;
            margin: 10px 0;
            padding: 5px;
        }
        &-wrap{
            overflow: hidden;
        }
        &-one{
            float: left;
            width: 50%;
            padding: 5px;
            box-sizing: border-box;
        }
        &-item{
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            cursor: move;
        }
    }
}
</style>
<template>
    <div class="main-types-list">
        <div class="types-section" v-for="(section,index) in typeslist" :key="'c'+index">
            <div v-text="section.label" class="types-section-title"></div>
            <div class="types-section-wrap">
                <div class="types-section-one" v-for="(item,ind) in section.children" :key="'item'+ind" >
                    <typesitem class="types-section-item" :label="item.label" :model="item.model" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import typesitem from './types/typesitem';
import typeslist from './types/typeslist';

export default {
    data(){
        return {
            typeslist:typeslist.lists()
        }
    },
    components:{
        typesitem
    }
}
</script>


