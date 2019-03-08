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
    }
    .case-manage-timePicker {
        position: absolute;
        top: 0;
        left: 77px;
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
        </div>
        <div class="case-manage-timePicker">
            <DatePicker type="date" :placeholder="beginPlaceholder"  style="width: 120px" @on-change="beginDateChange"></DatePicker>
            <div class="case-manage-line-div"></div>
            <DatePicker type="date" :placeholder="endPlaceholder"  style="width: 120px" @on-change="endDateChange"></DatePicker>
        </div>
     </div>
</template>
<script>
export default {
  	props: {
		title: {
			type: String
        },
		beginPlaceholder: {
			type: String
        },
		endPlaceholder: {
			type: String
        }
  	},
  	data() {
		return {
            listfold:true,
            num:0
        };
  	},
	methods: {
        beginDateChange(date) {
            this.$emit('beginDateChange', date);
        },
        endDateChange(date) {
           this.$emit('endDateChange', date);
        }
	}
};
</script>


