<style lang="less">
.hint{
	min-width: 870px;
	.stepContent{
	    margin:10px 0px 28px;
	    background: #fff;
	    border:1px solid #e0e0e0;
	    border-radius: 4px;
	    padding: 15px;
	    .title{
	        text-align: center;
	        font-size: 20px;
	        line-height: 40px;
	        span{
	            color: #e71f1d;
	        }
	    }
	    .progressBox{
	        position: relative;
	        margin-top: 10px;
	        .lineBox{
	            position: absolute;
	            top: 22px;
	            z-index: 1;
	            width:100%;
	            height: 10px;
	            border-radius: 10px;
	            background: #cccccc;
	            .line{
	            	background: #44bcb7;
	            	border-radius: 10px;
	            	height: 10px;
	            	width: 15%;
	            }
	        }
	        .stepBox{
	            position: relative;
	            z-index: 10;
	            .stepList{
	                float:left;
	                width:20%;
	                .stepInfo{
	                    cursor: pointer;
	                    display: block;
	                    margin:0px auto;
	                    width:55px;
	                    height: 55px;
	                    text-align: center;
	                    line-height: 45px;
	                    border-width:5px;
	                    border-style: solid;
	                    border-radius: 100%;
	                    font-size: 20px;
	                    color: #343535;
	                    background: #fff;
	                    box-sizing: border-box;
	                }
	                .tit{
	                    width:100%;
	                    height: 30px;
	                    text-align: center;
	                    font-size: 12px;
	                    line-height: 30px;
	                    text-overflow:ellipsis;
	                    overflow: hidden;
	                    white-space: nowrap;
	                }
	            }
	            .stepList .stepInfo{
	                border-color: #ccc;
	            }
	            .stepList .active{
	                border-color: #44bcb7;
	            }
	            .stepList:first-child,
	            .stepList:last-child{
	                width:15%;
	            }
	            .stepList:nth-child(2n){
	                width:25%;
	            }
	        }
	    }
	    .totalSixStep{
	        .stepBox{
	            .stepList{
	                width: 16.66%;
	            }
	            .stepList:nth-child(2n){
	                width:17.66%;
	            }
	            .stepList:first-child,
	            .stepList:last-child{
	                width:15.66%;
	            }
	        }
	    }
	}


	.tipContent{
	    padding: 10px 0px;
	    position: relative;
	    .tipInfo{
	        position: absolute;
	        top: 10px;
	        left:60px;
	        right:0px;
	        color: #505050;
	        div{
	        	font-size: 14px;
		        span{
		            color: #e71f1d;
		        }
				p{
					line-height: 50px;
				}
	        }
	    }

		.iconBox{
		    width:50px;
		    height: 50px;
		    background: #3b9ad1;
		    background-repeat: no-repeat;
		    background-position: center;
		    border-radius: 4px;
		}

		.tipIcon{
		    background-image: url("../assets/images/schoolManage/addSchool/icon_tipInfo.png");
		}
	}
		
}
</style>

<template>
	<div class="hint">
        <div class="tipContent clearfix">
            <div class="iconBox tipIcon"></div>
            <div class="tipInfo">
            	<slot name='hintTit'></slot>
            </div>
        </div>
        <div class="stepContent">
        	<div class="title">
            	<slot name="stepTips"></slot>
        	</div>
            <div class="progressBox" :class="[totalNum > 5 ? 'totalSixStep':'']">
            	<div class="lineBox">
            		<div class="line"></div>
            	</div>
                <div class="stepBox clearfix">
                    <div class="stepList" :style="stepWidth" v-for="(item,index) in stepHeadList" :key="index">
                        <a class="stepInfo" :class="[index < showNum ? 'active' : '']" @click="scrollToIndex(index)" href="javascript:void(0)" >{{index+1}}</a>
                        <div class="tit">{{item.label}}</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default{
		props:{
			'stepList':{
				type:Array,
				default:function(){
					return [
						{label:'基本信息'},
						{label:'排名信息'},
						{label:'学术信息'},
						{label:'申请信息'},
						{label:'奖助学金'},
					]
				}
			},
			'num':{
				type:[Number,String],
        		default:1
			},
			'url':{
				type:Array,
				default:function(){
					return ['apply.basicInfo','apply.SpecRankInfo','apply.academic','apply.applyInfo','apply.bonus','apply.replenish']
				}
			}
		},
		data(){
			return {
//      		urlNmae:['library.basicInfo','library.SpecRankInfo','library.academic','library.applyInfo','library.bonus']
			}
		},
		computed:{
			urlNmae:function(){
				return this.url;
			},
			stepWidth:function(){
				if(this.totalNum<5) return {width:(100/this.totalNum)+'%'}
				else return ''
		    },
		    showNum(){
		        return this.num
		    },
		    stepHeadList(){
		       return this.stepList
		    },
		    totalNum(){
		       return this.stepHeadList.length
		    }
		},
		mounted(){
			this.$nextTick(
				function lineWidth(){
          var stepList=document.getElementsByClassName('stepList');
					var stepBox=document.getElementsByClassName('stepBox')[0];
					var line=document.getElementsByClassName('line')[0];
					var Width=0;
					for (var i=0;i<this.showNum;i++) {
						Width+=stepList[i].offsetWidth;
					}
					Width=Width/stepBox.offsetWidth*100;
          			line.style.width=Width+'%';
				}
			)
    },
    updated () {
       var stepList=document.getElementsByClassName('stepList');
					var stepBox=document.getElementsByClassName('stepBox')[0];
					var line=document.getElementsByClassName('line')[0];
					var Width=0;
					for (var i=0;i<this.showNum;i++) {
						Width+=stepList[i].offsetWidth;
					}
					Width=Width/stepBox.offsetWidth*100;
          line.style.width=Width+'%';
    },
    methods:{
    	scrollToIndex:function(num){
            this.$emit('jump',num+1,this.urlNmae[num],this.$route.query.schoolId,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
    	}
    },
	watch:{
		showNum: function(newnum){
			var stepList=document.getElementsByClassName('stepList');
			var stepBox=document.getElementsByClassName('stepBox')[0];
			var line=document.getElementsByClassName('line')[0];
			var Width=0;
			for (var i=0;i<this.showNum;i++) {
				Width+=stepList[i].offsetWidth;
			}
			Width=Width/stepBox.offsetWidth*100;
			line.style.width=Width+'%';
		}
    },
	}
</script>

