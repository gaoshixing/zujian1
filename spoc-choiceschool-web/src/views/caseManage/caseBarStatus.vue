<style lang="less" scoped>
.caseBarStatus {
    line-height: 32px;
    margin-top: 5px;
    font-size: 12px;
    .titleBarWithAutoHeight {
        overflow: hidden;
        .tagTitle{
            float:left;
            width:78.5px;
            span{
                text-align: right;
                float:right;
                cursor: auto;
                color: #b8b8b8;
                padding: 0;
                padding-right: 4px;
                width: 64px;
                margin-right: 15px;
            }
        }
        .tagItem{
            float:left;
            span {
                padding: 5px 12px;
                cursor: pointer;
                margin-right: 10px;
            }
            .active {
                background-color: #44bcb6;
                color: white;
            }
        }
    }
}
</style>
<template>
    <div class="caseBarStatus">
        <div class="titleBarWithAutoHeight">
            <div class="tagTitle">
                <span>{{title}}：</span>
            </div>
            <div class="tagItem" :style="{height:tagList.length>20 && listfold?'30px':''}"> 
                <span  
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitve(index, item.id)">
                    {{item.name}}</span>
            </div>
        </div>
     </div>
</template>
<script>
export default {
  	props: {
		title: {
			type: String
        },
		tagList: {
			type: Array,
			default: function() {
				return [];
			}
        }
  	},
  	data() {
		return {
            listfold:true,
            num:0
        };
  	},
	methods: {
		addAcitve(index, id) {
            this.num = index
            this.$emit('addAcitve', {id:id,index:index});
        }
	}
};
</script>


