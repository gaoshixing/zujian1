<style lang="less" scoped>
.caseBarDate {
    position: relative;
    line-height: 32px;
    font-size: 12px;
    .titleBarWithAutoHeight {
        overflow: hidden;
        .tagTitle{
            float:left;
            width:78.5px;
            span{
                cursor: auto;
                color: #b8b8b8;
                padding: 0;
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
    .case-manage-timePicker {
        position: absolute;
        top: 0;
        left: 280px;
        float: left;
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
    }
}
</style>
<template>
    <div class="caseBarDate">
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
        <div class="case-manage-timePicker">
            <DatePicker type="date" placeholder="接案开始日期"  style="width: 120px" @on-change="beginDateChange"></DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker type="date" placeholder="接案结束日期"  style="width: 120px" @on-change="endDateChange"></DatePicker>
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
        },
        beginDateChange(date) {
            this.$emit('beginDateChange', date);
        },
        endDateChange(date) {
           this.$emit('endDateChange', date);
        }
	}
};
</script>


