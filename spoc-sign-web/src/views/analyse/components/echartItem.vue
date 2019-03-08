<style lang="less">
.e-chart-section{
    display: inline-block;
    text-align: center;
    margin: 0 auto; 
    width: 100%;
    .chart {
        width: 100%;
        margin: 0 auto; 
        text-align: center;
    }
}
</style>
<template>
    <div class="e-chart-section">
        <div class="chart" :style="mstyle">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
    props:{
        data:{
            type:Object,
            required:true,
        },
        mstyle:{
            type:Object,
            default:()=>{
                return {width:'500px',height:'400px'};
            }
        }
    },
    data(){
        return {
            chart:null
        };
    },
    mounted(){
        let dom = this.$el.querySelector('.chart');
        this.chart = echarts.init(dom);
        this.chart.on('click',this.onClick);
        this.setOption(this.data);
    },
    beforeDestory(){
        this.chart.dispose();
    },
    methods:{
        setOption(option){
            if(this.chart && option){
                this.chart.setOption(option,true);
            }
        },
        onClick(params){
            this.$emit('on-click',params,this.chart.getOption());
        }
    },
    watch:{
        data(val){
            this.setOption(val)
        }
    }
}
</script>


