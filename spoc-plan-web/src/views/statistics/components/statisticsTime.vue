<style lang="less">
    .statisticsTime {
        font-size: 12px;
        p{
             line-height: 32px;
            span {
                padding: 4px 8px;
                cursor: pointer;
                margin-right: 6px;
            }
            span:first-child {
                cursor: auto;
                color: #b8b8b8;
                padding: 0;
                margin-right: 19px;
            }
            .active {
                background-color: #44bcb6;
                color: white;
            }
        }
        .ivu-input {
            height: 26px;
            
        }
        .ivu-input-icon {
            height: 26px;
            line-height: 26px;            
        }
    }

</style>
<template>
    <div class="statisticsTime">
        <p>
            <span>{{timeTitle}}：</span><span :class="{active:num === index}" ref="hasActive" @click="addAcitve(index)" v-for="(item, index) in statisticsTimeList">{{item}}</span>
            <DatePicker v-model="startTime" @on-change="beforeChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
				——
		    <DatePicker v-model="endTime" @on-change="afterChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
            
        </p>
    </div>
</template>
<script>
export default {
    props: {
        isFuture: {
            type: Boolean,
            default: false
        },

        currentTime: {
            type: String,
            default: '2018-01'
        },

        timeTitle: {
            type: String,
            default: '统计时间'
        },

        statisticsTimeList: {
            type: Array,
			default: function() {
				return ['当前月', '未来3个月', '未来6个月' ]
			}
        },
        placeholder: {
            type: String,
            default: '接案时间'
        },
        isAll: {
            type: Boolean,
            default: false,
        }

    },

    data() {
        return {
            num: 0,
            startTime: '',
            endTime: '',
            titleContent: ''
        }
    },

    methods: {
        addAcitve(index) {
            this.num = index
            if (this.isAll) index -= 1
            if (this.isAll && index<0) {
                this.$emit('upDateAnalyseSellDetail', ['', ''])
                return
            }
            this.startTime = ''
            this.endTime = ''
            if(this.isFuture) {
               this.agoDateList(index)
            } else { 
                this.futureDateList(index)
            }
        },

        beforeChange(val) {
            if(!this.endTime) {
                this.$emit('clearStartTime', val, '1' )
            }else {
                this.$emit('clearStartTime', val, '')
            }
            
            this.startTime = val
            this.judgeTime()
        },

        afterChange(val) {
             if(!this.startTime) {
                this.$emit('clearStartTime', val, '1')
            }else {
                this.$emit('clearEndTime', val, '')
            }
            
            this.endTime = val
            this.judgeTime()
        },

		judgeTime() {
            if(!this.startTime && !this.endTime) {
                this.futureDateList(0)
                return
            } 
            if(!this.startTime || !this.endTime) {
                this.num = ''
                return
            }
            this.startTime = new Date(this.startTime).format('yyyy-MM')
            this.endTime = new Date(this.endTime).format('yyyy-MM')
            let [year, month] = this.endTime.match(/\d+/g);
                let re = /-/g
                let endTime = this.endTime.replace(re,'')
                let startTime = this.startTime.replace(re,'')
                if(endTime - startTime < 0) {
                    this.$Message.info("开始时间不能大于结束时间")
                    return
                }
             
            this.$emit('upDateAnalyseSellDetail', [`${this.startTime}-01`, `${year}-${month}-01`])
		},

        agoDateList(index) {
            let endTime, startTime
			let agoMonth = 3 * index-1;
			let [year, month] = this.currentTime.match(/\d+/g);
			let [originYear, originMonth] = this.currentTime.match(/\d+/g);
			if (month - agoMonth <= 0) {
				month -= agoMonth;
				month += 12;
				year -= 1;
			}else {
				month -= agoMonth;
			}
            month = month < 10 ? `0${month}` : month
			if (index) {
				startTime = `${year}-${month}`
			}else {
				startTime = `${originYear}-${originMonth}`
			}

			endTime = `${originYear}-${originMonth}`
            this.$emit('upDateAnalyseSellDetail', [`${startTime}-01`, `${endTime}-01`, index])
		},

		futureDateList(index) {
            let startTime, endTime
			let agoMonth = 3 * index +1;
			let [year, month] = this.currentTime.match(/\d+/g);
			let [originYear, originMonth] = this.currentTime.match(/\d+/g);
            month = month/1
            year = year/1
			if (month + agoMonth > 12) {
				month += agoMonth;
				month -= 12;
				year += 1;
			}else {
				month += agoMonth;
			}
			month = month < 10 ? `0${month}` : month
			endTime = `${year}-${month}`
            
			startTime = `${originYear}-${originMonth}`
			this.$emit('upDateAnalyseSellDetail', [`${startTime}-01`, `${endTime}-01`, index])
            
		},

    }
}
</script>
