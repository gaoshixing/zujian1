<style lang="less">
@mainColor:#00fdff;
.sign-dashboard{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../assets/images/board-bg.png") no-repeat center;
    background-size: cover;
    min-width: 800px;
    min-height: 600px;
    .tit-bg{
        width: 335px;
        height: 31px;
        background: url("../assets/images/tit-bg.png") no-repeat center;
        background-size: cover;
        margin: 20px auto ;
        .time{
            text-align: center;
            color: #fff;
            font-size: 24px;
            margin: 0;
            position: relative;
            top: -3px;
            left: -2px;
        }
        .date{
            text-align: center;
            color: #fff;
            font-size: 12px;
            margin: 0px 0 10px;
            position: relative;
            top: -4px;
        }
        .msg{
            color: @mainColor;
            text-align: center;
        }
        .wrapper-show{
            height: 18px;
            overflow: hidden;
        }
    }
    .main-bg{
        background: url("../assets/images/main-bg.png") no-repeat center;
        background-size: 100% 100%;
        position: fixed;
        top: 120px;
        left: 80px;
        right: 80px;
        bottom: 60px;
        .c1{
            position: absolute;
            left: 2%;
            top: 3%;
            height: 35%;
            width: 96%;
        }
        .c2{
            position: absolute;
            left: 2%;
            top: 50%;
            width: 44%;
            height: 45%;
        }
        .c3{
            position: absolute;
            right: 3%;
            height: 45%;
            width: 44%;
            top: 50%;
        }
        .c1,.c2,.c3{
            // box-shadow: 0 0 1px #f00;
        }
        .c2-title{
            color: #48b4f9;
            font-size: 14px;
            position: absolute;
            left: 15px;
            top: -14px;
        }
        .c3-title{
            color: #48b4f9;
            font-size: 14px;
            position: absolute;
            right: 0;
            top: -14px;
        }
        .c1-inner{
            padding: 20px 20px 20px 60px;
            height: 100%;
            overflow: hidden;
        }
        .c2-inner{
            padding: 20px 2px 20px 2px;
            height: 100%;
            overflow: hidden;
        }
        .c3-inner{
            padding: 2px;
            height: 100%;
            overflow: hidden;
        }
        .c1-left{
            position: absolute;
            width: 60px;
            padding: 20px 0 20px 20px;
            .left-label{
                margin-top: 23px;
                .ff{
                    color: @mainColor;
                    font-size: 14px;
                }
            }
        }
        .thead{
            &.flex{
                display: flex;
                justify-content: space-between;
            }
            &.six{
                .td{
                    width: 16.66%;
                    float: left;
                    text-align: center;
                }
            }
            &.eig{
                .td{
                    width: 12.5%;
                    float: left;
                    text-align: center;
                }
            }
            .td{
                color: @mainColor;
                font-size: 14px;
            }
        }
       
        .tbody{
            color: #fff;
            font-size: 12px;
            &.flex{
                display: flex;
                justify-content: space-between;
            }
            .six{
                .td{
                    width: 16.66%;
                    float: left;
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .eig{
                .td{
                    width: 12.5%;
                    float: left;
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;   
                }
            }
        }
    }
}
</style>
<template>
<div class="sign-dashboard">
    <div class="tit-bg">
        <p class="time">{{timeHour}}</p>
        <p class="date">{{timeDate}}</p>
        <div class="wrapper-show" v-show="newInfo.ctId">
            <div class="wrapper-s" :style="wstyle">
                <p class="msg" v-if="oldMsg" v-text="oldMsg"></p>
                <p class="msg" v-text="mainMsg"></p>
            </div>
        </div>
        
    </div>
    <div class="main-bg">
        <div class="c1">
            <div class="c1-left">
                <div class="left-label">
                    <div class="ff" :style="c1leftstyle">本月</div>
                    <div class="ff" :style="c1leftstyle">同比</div>
                    <div class="ff" :style="c1leftstyle">环比</div>
                    <div class="ff" :style="c1leftstyle">预计</div>
                </div>
            </div>
            <div class="c1-inner">
                <div class="thead eig clearfix">
                    <div class="td">销售目标</div>
                    <div class="td">销售业绩</div>
                    <div class="td">签单量</div>
                    <div class="td">签约金额</div>
                    <div class="td">折扣金额</div>
                    <div class="td">赠送成本</div>
                    <div class="td">尾款</div>
                    <div class="td">退款</div>
                </div>
                    
                <div class="tbody m-left">
                    <div class="eig clearfix" :style="c1style">
                        <div class="td">{{countSign.currentMonth.sellObjectValue | toWan}}</div>
                        <div class="td">{{countSign.currentMonth.signAchieve | toWan}}</div>
                        <div class="td">{{countSign.currentMonth.signCount | hasCount }}</div>
                        <div class="td">{{countSign.currentMonth.signAmount | toWan}}</div>
                        <div class="td">{{countSign.currentMonth.deratePrice | toWan}}</div>
                        <div class="td">{{countSign.currentMonth.presentPriceCost | toWan}}</div>
                        <div class="td">{{countSign.currentMonth.collectBalanceAmount | toWanT('待收') }}</div>
                        <div class="td">{{countSign.currentMonth.refundAmount | toWan}}</div>
                    </div>
                    <div class="eig clearfix" :style="c1style">
                        <div class="td">{{countSign.lastYear.sellObjectValue | toWan}}</div>
                        <div class="td">{{countSign.lastYear.signAchieve | toWan}}</div>
                        <div class="td">{{countSign.lastYear.signCount | hasCount}}</div>
                        <div class="td">{{countSign.lastYear.signAmount | toWan}}</div>
                        <div class="td">{{countSign.lastYear.deratePrice | toWan}}</div>
                        <div class="td">{{countSign.lastYear.presentPriceCost | toWan}}</div>
                        <div class="td">{{countSign.lastYear.actualBalanceAmount | toWanT('实收') }}</div>
                        <div class="td">{{countSign.lastYear.refundAmount | toWan}}</div>
                    </div>
                    <div class="eig clearfix" :style="c1style">
                        <div class="td">{{countSign.lastMonth.sellObjectValue | toWan}}</div>
                        <div class="td">{{countSign.lastMonth.signAchieve | toWan}}</div>
                        <div class="td">{{countSign.lastMonth.signCount | hasCount}}</div>
                        <div class="td">{{countSign.lastMonth.signAmount | toWan}}</div>
                        <div class="td">{{countSign.lastMonth.deratePrice | toWan}}</div>
                        <div class="td">{{countSign.lastMonth.presentPriceCost | toWan}}</div>
                        <div class="td">{{countSign.lastMonth.actualBalanceAmount | toWanT('实收') }}</div>
                        <div class="td">{{countSign.lastMonth.refundAmount | toWan}}</div>
                    </div>
                    <div class="eig clearfix" :style="c1style">
                        <div class="td">
                            {{countSign.forecastMonth.sellObjectValue | toWan}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.sellObjectValue,countSign.lastMonth.sellObjectValue)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.sellObjectValue,countSign.lastMonth.sellObjectValue)<0" color="#0f0"></Icon>
                        </div>
                        <div class="td">
                            {{countSign.forecastMonth.signAchieve | toWan}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.signAchieve,countSign.lastMonth.signAchieve)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.signAchieve,countSign.lastMonth.signAchieve)<0" color="#0f0"></Icon>
                        </div>
                        <div class="td">
                            {{countSign.forecastMonth.signCount | hasCount}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.signCount,countSign.lastMonth.signCount)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.signCount,countSign.lastMonth.signCount)<0" color="#0f0"></Icon>
                        </div>
                        <div class="td">
                            {{countSign.forecastMonth.signAmount | toWan}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.signAmount,countSign.lastMonth.signAmount)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.signAmount,countSign.lastMonth.signAmount)<0" color="#0f0"></Icon>

                        </div>
                        <div class="td">
                            {{countSign.forecastMonth.deratePrice | toWan}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.deratePrice,countSign.lastMonth.deratePrice)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.deratePrice,countSign.lastMonth.deratePrice)<0" color="#0f0"></Icon>
                        </div>
                        <div class="td">
                            {{countSign.forecastMonth.presentPriceCost | toWan}}
                            <Icon type="arrow-up-a" v-if="trend(countSign.forecastMonth.presentPriceCost,countSign.lastMonth.presentPriceCost)>0" color="#f00"></Icon>
                            <Icon type="arrow-down-a" v-if="trend(countSign.forecastMonth.presentPriceCost,countSign.lastMonth.presentPriceCost)<0" color="#0f0"></Icon>
                        </div>
                        <div class="td">{{countSign.forecastMonth.receivebalanceAmount | toWanT('应收') }}</div>
                        <div class="td">{{countSign.forecastMonth.refundAmount | toWan}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c2">
            <span class="c2-title">英雄榜</span>
            <div class="c2-inner">
                <div class="thead six clearfix">
                    <div class="td">排行</div>
                    <div class="td">姓名</div>
                    <div class="td">分公司</div>
                    <div class="td">销售业绩</div>
                    <div class="td">销售目标</div>
                    <div class="td">完成率</div>
                </div>
                <div class="tbody">
                    <div class="six clearfix" :style="{paddingTop:c2padding}"  v-for="(item,index) in topRankList" :key="'rank'+index">
                        <div class="td">{{item.rank}}</div>
                        <div class="td">{{item.saleName}}</div>
                        <div class="td">{{item.companyName}}</div>
                        <div class="td">{{item.achieve | toWan}} </div>
                        <div class="td">{{item.sellObjectValue | toWan}} </div>
                        <div class="td">{{item.finishRatio==''?'--':(`${item.finishRatio}%`)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c3">
            <span class="c3-title">分公司业绩</span>
            <div class="c3-inner">
                <echart-item ref="chart1" v-if="chart.ready" :data="chart1data" :mstyle="chart.style"></echart-item>
            </div>
        </div>
    </div>
</div>
</template>
<script>

let timer,timer2,t;
const route = 'sign.index'; // 签约的顶级路由

import { MENUIDS, } from '@public/libs/config';
import valid ,{ errors, ANALYSE } from '../libs/request.js';
import { toWan, waitUntil } from '../libs/util';
import echartItem from './analyse/components/echartItem.vue';
import { mapGetters,mapState } from 'vuex';


export default {
    data(){
        return {
            index:0,
            pId: null,
            rankList:[],
            countSign:{
                currentMonth:{},
                forecastMonth:{},
                lastMonth:{},
                lastYear:{}
            },
            countSignDetail:[],
            countSignCompanyDetail:[],
            time:new Date(),
            chart:{
                style:{},
                ready:false
            },
            c1inner:{},
            c2inner:{},
            newInfo:{},
            wstyle:{},
            oldMsg:''
        };
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
        roleId(){
            return this.userInfo.roleMap[this.pId];
        },
        hasRights(){
            if(this.isBranchOfficeLeader || this.userInfo.admin || this.roleId==607){ // 总裁
                return true;
            }
            return false;
        },
        isBranchOfficeLeader(){
            return this.roleId==603;
        },
        timeDate(){
            return this.time.format('yyyy-MM-dd');
        },
        timeHour(){
            return this.time.format('hh:mm');
        },
        topRankList(){
            const num = 8;
            const l = this.rankList.length;
            if(l<=num){
                return this.rankList;
            }
            const a = Math.ceil(l/num)
            const start = (this.index%a)*num;
            return this.rankList.slice(start,start+num);
        },
        c1style(){
            const h = this.c1inner.height;
            const p = `${(h-40-72-21)/4}px`;
            return {
                paddingTop:p
            };
        },
        c1leftstyle(){
            const h = this.c1inner.height;
            const p = `${(h-40-84-21)/4}px`;
            return {
                paddingTop:p
            };
        },
        c2padding(){
            const h = this.c2inner.height;
            return `${(h-40-144)/8}px`;
        },
        chart1data(){
            const dataAxis=[];
            const data=[];
            const dataShadow=[];
            let d;
            let rotate;
            if(this.isBranchOfficeLeader){
                d = this.countSignCompanyDetail;
            } else {
                d = this.countSignDetail;
                rotate=60;
            }
            d.forEach(item=>{
                const name = item.object;
                dataAxis.push(name);
                const n1 = item.sellObjectValue/10000;
                const n1f = parseFloat(n1.toFixed(1));
                dataShadow.push(n1==n1f?n1:n1f);
                const n2 = item.achieve/10000;
                const n2f = parseFloat(n2.toFixed(1)); 
                data.push(n2==n2f?n2:n2f);
            })
            return this.makeOption(dataAxis,data,dataShadow,rotate);
        },
        mainMsg(){
            const time = (new Date(this.newInfo.optTime)).format('hh:mm');
            const name = this.newInfo.sellerName;
            const money = toWan(this.newInfo.signPrice);
            return `${time} ${name}签约成功，签约金额${money}万元`;
        }
    },
    created(){
        this.loadData();
        this.startTimer();
        this.pId = MENUIDS.SIGN;
    },
    mounted(){
        window.addEventListener('resize',this.onResize);
        this.onResize();
        clearInterval(t)
        t=setInterval(()=>{
            this.index++;
        },5000)
    },
    beforeRouteLeave(to, from, next){
        clearInterval(timer2)
        clearInterval(timer)
        window.removeEventListener('resize',this.onResize);
        next();
    },
    components:{
        echartItem
    },
    methods:{
        onResize(){
            const dom = this.$el.querySelector('.c3-inner');
            this.chart.style={
                width:`${dom.clientWidth-4}px`,
                height:`${dom.clientHeight-4}px`
            };
            this.$nextTick(()=>{
                this.$refs.chart1&&this.$refs.chart1.chart.resize();
            });
            const c1inner = this.$el.querySelector('.c1-inner');
            this.c1inner={
                width:c1inner.clientWidth,
                height:c1inner.clientHeight
            };
            const c2inner = this.$el.querySelector('.c2-inner');
            this.c2inner={
                width:c2inner.clientWidth,
                height:c2inner.clientHeight
            };
        },
        startTimer(){
            clearInterval(timer)
            timer = setInterval(()=>{
                this.time = new Date();
                // this.newInfo={
                //     ctId:+new Date(),
                //     sellerName:'苏聪厚',
                //     signPrice:140000*Math.random(),
                //     optTime:(new Date()).format('yyyy-MM-dd hh:mm:ss')
                // };
            },5000);

            clearInterval(timer2)
            timer2 = setInterval(this.loadData,60000);
        },
        loadData(){
            
            waitUntil(()=>{
                //return this.userInfo.id && this.appMenuList.length;
                return this.userInfo.id && this.appMenuList.length && this.userInfo.roleMap && this.pId;
            },()=>{
                if(!this.hasRights){
                    return;
                }
                let param = this.isBranchOfficeLeader ? {companyId:this.userInfo.officeId}:{};
                
                this.getNews(param);
                
                ANALYSE.saleHeroRank(param).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        this.rankList = res.data.data;
                    }
                }).catch(errors.call(this));
                ANALYSE.countSign(param).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        this.countSign = res.data.data;
                    }
                }).catch(errors.call(this));

                if(this.isBranchOfficeLeader){
                    ANALYSE.countSignCompanyDetail(param).then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.countSignCompanyDetail = res.data.data;
                            this.chart.ready = true;
                        }
                    }).catch(errors.call(this));
                } else {
                    ANALYSE.countSignDetail().then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.countSignDetail = res.data.data;
                            this.chart.ready = true;
                        }
                    }).catch(errors.call(this));
                }
            },(times)=>{console.log('加载信息失败,等待次数=' + times)},null,1000000)
           
        },
        trend(a,b){
            return a-b;
        },
        makeOption(dataAxis,data,dataShadow,rotate){
            let option = {
                color:['#50cc52','#ddd'],
                legend:{
                    show:true,
                    selectedMode:false,
                    top:'top',
                    data:['销售目标(万元)','销售业绩(万元)'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                grid:{
                    left:60,
                    top:40,
                    bottom:60,
                    right:20,
                },
                xAxis: {
                    data: dataAxis,
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        color:'#fff',
                        rotate,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#124b6e',
                            width:2,
                        }
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{
                            color:'#124b6e',
                            opacity:0.2
                        }
                    },
                },
                yAxis: {
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        color:'#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#124b6e',
                            width:2,
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#124b6e',
                            opacity:0.2
                        }
                    }
                },
                series: [
                    {
                        type: 'bar',
                        name:'销售目标(万元)',
                        itemStyle: {
                            normal: {color: 'rgba(200,200,200,0.2)'}
                        },
                        barGap:'-100%',
                        barCategoryGap:'60%',
                        data: dataShadow,
                        animation: true,
                        label:{
                            show:false,
                        }
                    },
                    {
                        type: 'bar',
                        name:'销售业绩(万元)',
                        label:{
                            normal:{
                                show:true,
                            	position:'top'
                            },
                        },
                        data: data,
                        // label:{
                        //     show:true,
                        //     rotate:-90
                        // }
                    }
                ]
            };
            return option;
        },
        getNews(param){
            ANALYSE.findLatestSign(param).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.newInfo = res.data.data;
                }
            }).catch(errors.call(this));
        }
    },
    filters:{
        toWan(v){
            const n = toWan(v)
            if(n===0){
                return '--';
            }
            return `${n} 万`;
        },
        toWanT(v,t){
            const n = toWan(v)
            if(n===0){
                return '--';
            }
            return `${t}：${n} 万`;
        },
        company(v){
            return v.split(' ')[0].replace('分公司','');
        },
        hasCount(v){
            if(v==''){
                return '--';
            }
            return v;
        }

    },
    watch:{
        mainMsg(cur,old){
            this.oldMsg = old;
            this.wstyle={
                marginTop:'-18px',
                transition:' all 0.8s ease'
            }
            setTimeout(()=>{
                this.wstyle={};
                this.oldMsg='';
            },1000)
        }
    }

}
</script>


