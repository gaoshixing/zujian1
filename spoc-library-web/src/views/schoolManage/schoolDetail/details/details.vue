<style lang="less">
	.details{
		font-size: 14px;
		.width504{
			width: 500px;
		}
		.width560{
			width: 560px;
		}
		.fl{
			float: left;
		}
		.fr{
			float: right;
		}
		.width362{
			width: 360px;
		}
		.width376{
			width: 376px;
		}
		.tc{
			text-align: center;
		}
		.of{
			overflow: hidden;
		}
		.ivu-form{
			.ivu-form-item-label{
				color: #999999;
				font-size: 14px;
			}
			.ivu-form-item-content{
				font-size: 14px;
			}
		}
		.ivu-table-wrapper{    
			border: 1px solid #dddee1 !important;
		    border-bottom: 0;
		    border-right: 0;
		}
		.title{
			width: 100%;
			height:40px;
			border: 1px #e0e0e0 solid;
			border-radius:4px;
			overflow:hidden;
			margin:20px 0;
			i{
				float: left;
				width: 5px;height: 38px;
				background: #44bcb7;
			}
			span{
				line-height: 38px;
				float: left;
				padding-left: 18px;
				color: #666666;
				font-size: 14px;
			}
			p{
				float: right;
				padding-right: 30px;
				font-size: 16px;
				cursor: pointer;
				line-height: 38px;
				&.on{
					color: #0D70B0;
				}
				&.off{
					color: #e71f1d;
				}
			}
		}
		.detailsBox{
			width: 886px;
			padding-left: 16px;
			margin-left: 80px;
			.probablyForm{
				.probably{
					padding-left: 30px;
					button{
						margin-left: 30px;
						background: #999999;
						border: none;
					}
				}
			}
			.tit{
				font-size:16px;
				font-weight: normal;
				line-height: 36px;
			}
			.intro{
				p{
					text-indent: 2em;
					margin-bottom: 10px;
				}
				.alumnus{
					li{
						text-indent: 2em;
					}
				}
			}
			.rankBox{
				width: 100%;
				position: relative;
				.rank{
					overflow: hidden;
					width: 700px;
					height: 150px;
					margin-left:2em;
					ul{
						overflow: hidden;
						&.animate{
							transition:margin-left 0.6s ease-in-out;
						}
						li{
							width: 100px;
							float: left;
							margin-right: 100px;
							text-align: center;
							p{
								width: 100px;
								height: 100px;
								line-height: 100px;
								font-size: 20px;
								color: #FFFFFF;
								position: relative;
								margin-bottom: 5px;
								span{
									position: absolute;
									left: 0;
									right: 0;
									z-index: 9;
								}
							}
							p:before{ 
								content:"";
								background-color: rgba(0,0,0,0.1);
								width: 100px;
								height: 100px;
								position: absolute;
								left: 0;
								right: 0;
							}
						}
					}
				}
				.next{
					position: absolute;
					top: 30px;
					right: 20px;
					width: 22px;
					height: 40px;
					cursor: pointer;
				}
			}
			.criminalNumber{
				width: 100%;
				padding: 10px 26px;
				overflow: hidden;
				dl{
					float: left;
					margin-right: 60px;
					dt{
						float:left;
						img{
							width: 44px;
							height: auto;
							vertical-align: middle;
						}
					}
					dd{
						float: left;
					}
				}
			}
			.club{
				width: 100%;
				overflow: hidden;
				position: relative;
				.clubInfo{
					color: #999999;
					float: right;
					width: 100%;
				}
				.clubList{
					width: 810px;
					float: right;
					li{
						width: 306px;
						list-style-position: outside;
						list-style-type: disc;
						float: left;
						line-height: 40px;
					}
					li:nth-child(even){
						float: right;
					}
				}
				.arrow{
					position: absolute;
					right: 0;
					bottom: 0;
					cursor: pointer;
				}
				.down{
					transform: rotate(180deg);
				}
			}
			.lifeTit{
				width: 100%;
				overflow: hidden;
				dl{
					float: left;
					padding:0 50px 0 20px;
					dt{
						float:left;
						img{
							width: 44px;
							height: auto;
						}
					}
					dd{
						float: left;
						padding-left: 10px;
						span{
							display: block;
						}
					}
				}
			}
			.lifeRatio{
				padding: 15px 0;
				.ratioForm{
					overflow: hidden;
					.ivu-form-item-content{
						display: inline-block;
						vertical-align: middle;					}
				}
			}
		}
		.major{
			width: 700px;	
			ul{
				width: 100%;
				padding:14px 0 14px 26px;
				li{
					width: 100%;
					overflow: hidden;
					span{
						display: inline-block;
						float: right;
						width: 144px;
					}
				}
			}
			.title{
				.rank{
					padding-right: 50px;
				}
			}
			.rankList{
				.title{
					margin-bottom: 0;
				}
				.pro{
					ul{
						line-height: 30px;
					}
				}
			}
		}
		.info{
			.infoTit{
				width: 100%;
				overflow: hidden;
				dl{
					float: left;
					padding:0 50px 0 20px;
					dt{
						float:left;
						img{
							width: 44px;
							height: auto;
						}
					}
					dd{
						float: left;
						padding-left: 10px;
						span{
							display: block;
						}
					}
				}
			}
			.infoTable{
				padding: 20px 10px;
				width: 100%;
				p{
					line-height: 40px;
					text-align: center;
					border: 1px #e0e0e0 solid;
					b{
						display: inline-block;
						float: left;
						width: 180px;
						background: #e6e6e6;
						border-right: 1px #e0e0e0 solid;
						font-weight: normal;
					}
					span{
						width: 660px;
						display: inline-block;
						background: #f1f1f1;
					}
				}
			}
			.imDate{
				.of{
					.imDate-row{
						padding-left: 170px;
					}
					.inline{
						.ivu-form-item-content{
							margin-left: 100px !important;
						}
						.imtime{
							width: 150px;
							padding-left: 20px;
						}
					}
				}
			}
			.test{
				overflow: hidden;
				padding: 0 10px 16px 0;
				button{
					width: 80px;
					height: 30px;
					background: #999999;
					border:none;
					.fr;
				}
				.left{
					padding-left: 26px;
					.fl;
					li{
						margin-bottom: 10px;
						width: 160px;
						overflow: hidden;
						cursor: pointer;
					}
				}
				.right{
					.fr;
					position: relative;
					background: #f1f1f1;
					width: 620px;
					line-height: 28px;
					padding:6px 20px;	
					.tri{
						width:0; height:0;
						border-width:10px 20px; 
						border-style:solid; 
						border-color:#ffffff #f1f1f1 #ffffff #ffffff;
						position: absolute;
						top: 50%;
						margin-top: -10px;
						left: -40px;
					}
				}
			}
			.interBox{
				overflow: hidden;
				padding-right: 10px;
				.inter{
					float: left;
					width: 560px;
					padding-top:14px;
					.ivu-form-item-label{
						padding: 3px 12px 3px 0;
					}
					a,p{
						padding-left: 14px;
						line-height: 20px;
						text-align: left;
						display: block;
					}
				}
				.school-video{
					float: right;
					width: 250px;
					height: auto;
				}
			}
			.budget{
				padding-bottom: 10px;
				dt{
					font-size: 16px;
				}
				dd{
					.ivu-form-item{
						margin-bottom: 14px;
					}
				}
			}
			.circle{
				float: left;
				margin-top: 12px;
				.total{
					p{
						line-height: 24px;
					}
				}
			}
			.money{
				 width:310px; 
				 float: right;
				 p{
				 	padding-left: 14px;
				 }
			}
			.burse{
				a,p{
					padding-left: 14px;
				}
				.baseType{
					.ivu-form-item-content{
						position:relative;
						.proTit{
							display: block;
							line-height: 1em;
						}
						.progress{
							width: 260px;
							position: absolute;
							top:-16px;
							left: 100px;
							.ivu-progress-bg{
								background: #44bcb7;
							}
						}
					}
				}
			}
		}
		.case{
			.studentInfo{
				overflow: hidden;
				padding-left: 20px;
				dt{
					.fl;
					img{
						width: 120px;
						height: auto;
					}
				}
				dd{
					.fl;
					padding-left: 18px;
					line-height: 28px;
					span{
						line-height: 36px;
					}
				}
			}
			.tit{
				font-weight: normal;
				font-size: 16px;
				line-height: 40px;
			}
			.label{
				font-size: 14px;
				color: #b8b8b8;
			}
			.ivu-table-wrapper{
				margin-bottom: 20px;
				table{
					font-size: 14px;
				}
				.ivu-table{
					th{
						background-color: #e6e6e6;
					}
				}
				.ivu-table-tbody{
					tr{
						td{
							background-color: #f1f1f1;
							&.tit-table{
								background-color: #e6e6e6
							}
						}
					}
				}
			}
			.undergo{
				padding-bottom: 30px;
				position: relative;
				.text{
					text-indent: 2em;
				}
				.unfold{
					position: absolute;
					right: 10px;
					bottom: 0px;
					.down{
						transform: rotate(180deg);
					}
				}
			}
			.admissionOfficer{
				overflow: hidden;
				padding-left: 20px;
				dt{
					.fl;
					img{
						width: 160px;
						height: auto;
					}
					p{
						font-size:16px;
						text-align: center;
						font-weight: 400;
						line-height: 30px;
					}
				}
				dd{
					.fl;
					padding-left: 18px;
					line-height: 28px;
					span{
						line-height: 36px;
					}
					p{
						padding-left: 24px;
					}
				}
			}
			.academy{
				overflow: hidden;
				width: 870px;
				ul{
					width: 1600px;
					li{
						width: 316px;
						padding-left: 26px;
						.fl;
						padding-right: 180px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="details">
		<div class="title"><i></i><span>学校介绍</span><p class="on" @click="IIB(0)" v-show="!toggle[0].tit">打开</p><p class="off" @click="IIB(0)" v-show="toggle[0].tit">关闭</p></div>
		<div class="detailsBox prospectus" v-show="toggle[0].tit">
			<Form :label-width="68" class="probablyForm">
				<FormItem label="招生学位" class="width504 inline">
	            	<p class="probably">{{dataList.degree}}</p>
	        	</FormItem>
				<FormItem label="学校类型" class="width362 inline">
	            	<p class="probably">{{dataList.schoolType}}</p>
	        	</FormItem>
				<FormItem label="地理位置" class="width504 inline">
	            	<p class="probably"><span>{{dataList.located}}</span><Button type="primary">{{dataList.setting}}</Button></p>
	        	</FormItem>
				<FormItem label="在校生" class="width362 inline">
	            	<p class="probably">{{dataList.located}}</p>
	        	</FormItem>
				<FormItem label="学校官网" class="width504 inline">
	            	<p class="probably"><a :href="dataList.officeSite">{{dataList.officeSite}}</a></p>
	        	</FormItem>
        	</Form>
        	<h3 class="tit">简介</h3>
        	<div class="intro">
        	<img :src="schoolImg" style="float: right;width: 414px;height: auto;padding:0 0 10px 10px;"/>
        	&emsp;&emsp;{{dataList.overview}}<br /><br /><b>&emsp;&emsp; {{dataList.profile}}</b><br /><b>&emsp;&emsp; {{dataList.remarks}}</b><br /><br />
        	<p>{{dataList.schoolName}}-{{dataList.located}}知名企业包括：</p>
        	<p>{{dataList.companys}}</p>
        	<h3 class="tit">杰出校友</h3>
        	<ul class="alumnus">
        		<li>詹姆斯·麦迪逊 - 第4任美国总统。</li>
        		<li>伍德罗·威尔逊 - 第28任美国总统，曾任普林斯顿大学校长及新泽西州州长。</li>
        		<li>约翰·F·肯尼迪 - 第35任美国总统。</li>
        		<li>艾伦·图灵博士 - 计算机科学家、密码学家。</li>
        		<li>盖瑞·贝克 - 1992年诺贝尔经济学奖得主。</li>
        		<li>皮特·康拉德 - 宇航员，第三个踏上月球的人。</li>
        		<li>田长霖 - 柏克莱加州大学校长。</li>
        	</ul>
			</div>
        	<h3 class="tit">学校排名</h3>
        	<div class="rankBox">
        		<div class="rank">
		        	<ul :style="{width:2*schoolRank.length*200+'px',marginLeft:-rankml+'px'}" :class="[rankml!=0? 'animate' : '']">
		        		<li v-for="item in schoolRank"><p :style="{backgroundImage: 'url('+schoolImg+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span>{{item.type}}</span>
		        		</li>
		        		<li v-for="item in schoolRank" v-if="schoolRank.length>4"><p :style="{backgroundImage: 'url('+schoolImg+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span>{{item.type}}</span>
		        		</li>
		        	</ul>
        		</div>
        		<img class="next" :src="nextImg" @click="nextRank()"/>
        	</div>
        	<h3 class="tit">校园安全</h3>
        	<div class="criminalNumber">
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/circle.svg"/></dt>
        			<dd>
        				<h4>82起</h4>
						<p>校园犯罪数量</p>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/circle.svg"/></dt>
        			<dd>
        				<h4>49起</h4>
						<p>宿舍犯罪数量</p>
        			</dd>
        		</dl>
        	</div>
        	
        	
        	<h3 class="tit">学生社团</h3>
        	<div class="club">
        		<p class="clubInfo">Student activities：（21）</p>
        		<ul class="clubList">
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        			<li>Choral groups</li>
        		</ul>
        		<img src="../../../../assets/images/schoolManage/schoolDetail/arrow.png" class="arrow"/>
        		<img src="../../../../assets/images/schoolManage/schoolDetail/arrow.png" class="arrow down"/>
        	</div>
		
        	<h3 class="tit">学生生活</h3>
        	<div class="lifeTit">
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/man.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/man.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        	</div>
			<div class="lifeRatio">
				<Form :label-width="70" class="ratioForm">
					<FormItem label="男生占比" class="width376 fl">55%</FormItem>
					<FormItem label="女生占比" class="width376 fr">55%</FormItem>
					<FormItem label="国际学生主要国家分布" class="fl">Canada (2%), South Korea (1%), China (1%), United Kingdom (1%), Australia (5%), India (5%)。</FormItem>
				</Form>
			</div>
		</div>
		
		<div class="title"><i></i><span>专业项目</span><p class="on" @click="IIB(1)" v-show="!toggle[1].tit">打开</p><p class="off" @click="IIB(1)" v-show="toggle[1].tit">关闭</p></div>
		<div class="detailsBox major" v-show="toggle[1].tit">
        	<h3 class="tit">最受毕业生欢迎的专业</h3>
			<ul >
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
			</ul>
        	<h3 class="tit">毕业生职业中期薪资</h3>
			<ul >
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
			</ul>
        	<h3 class="tit">本校专业及排名</h3>
        	<div class="rankList">
        		<div v-for="(item,index) in gradeList" :key="item.id">
        			<div class="title"><i></i><span>{{item.cnName}}</span><p class="on" @click="IIB2(1,index)" v-show="!toggle[1].son[index]">打开</p><p class="off" @click="IIB2(1,index)" v-show="toggle[1].son[index]">关闭</p><p class="rank">#{{item.ranking}}</p></div>
	        		<div class="pro" v-show="toggle[1].son[index]">
						<ul >
							<li v-for="v in item.ssSchoolMajorList"><span @click="majorItem(v.majorId)">{{v.name}}</span> <span>#{v.majorRank}</span></li>
						</ul>
	        		</div>	
        		</div>
        		
        	</div>
		</div>
	
		<div class="title"><i></i><span>申请介绍（本科）</span><p class="on" @click="IIB(2)" v-show="!toggle[2].tit">打开</p><p class="off" @click="IIB(2)" v-show="toggle[2].tit">关闭</p></div>
		<div class="detailsBox info" v-show="toggle[2].tit">
			<div class="infoTit">
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/man2.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../../assets/images/schoolManage/schoolDetail/dollar.svg"/></dt>
        			<dd>
        				<b>21000人</b>
        				<span>在校生总人数</span>
        			</dd>
        		</dl>
        	</div>
			<div class="infoTable">
				<p><b>申请系统</b><span>{{dataList.ssApplyRequireList[0].system}}</span></p>
				<p><b>推荐信</b><span>{{dataList.ssApplyRequireList[0].recomletterRequire}}</span></p>
				<p><b>财力证明</b><span>{{dataList.ssApplyRequireList[0].financeRequre}}</span></p>
				<p><b>成绩认证</b><span>{{dataList.ssApplyRequireList[0].scorelistLink}}</span></p>
			</div>
			<h3 class="tit">重要日期</h3>
			<Form :label-width="74" class="imDate">
				<FormItem :label="item.type" class="of" v-for="item in dataList.ssApplyRequireList[0].ssApplytypeList" :key="item.id">
					<p class="imDate-row">
						<FormItem :label-width="100" label="申请截止日期" class="inline"><p class="imtime">{{item.deadline}}</p></FormItem>
						<FormItem :label-width="100" label="结果发放日期" class="inline"><p class="imtime">{{item.noticed}}</p></FormItem>
					</p>
				</FormItem>
			</Form>
			<h3 class="tit" v-if="dataList.ssEaxminfoRequireList.length">考试&成绩</h3>
			<div class="test" v-if="dataList.ssEaxminfoRequireList.length">
				<ul class="left">
					<li @click="exam(index)" v-for="(item,index) in dataList.ssEaxminfoRequireList"><span style="float: left;">{{item.examType||item.name}}</span><Button type="primary">{{item.isMust}}</Button></li>
				</ul>
				<ul class="right" >
					<li> 托福最低分：{{dataList.ssEaxminfoRequireList[testScore].scoreRequire}}</li>
					<li> 托福送分代码：{{dataList.ssEaxminfoRequireList[testScore].sendscoreCode}}</li>
					<li>TOEFL wavie条件：{{dataList.ssEaxminfoRequireList[testScore].wavieCondition}}</li>
					<li>早期申请托福考试时间要求：{{dataList.ssEaxminfoRequireList[testScore].earlyDatetime}}</li>
					<li>常规申请托福考试时间要求：{{dataList.ssEaxminfoRequireList[testScore].regularDatetime}}</li>
					<div class="tri"></div>
				</ul>{{dataList.ssEaxminfoRequireList[testScore]}}
			</div>
			<h3 class="tit" v-if="dataList.ssApplyRequireList.length">关于面试</h3>
			<div class="interBox" v-if="dataList.ssApplyRequireList.length">
				<Form :label-width="74" class="inter">
					<FormItem label="面试是否必须"><p>{{dataList.ssApplyRequireList[0].isReview}}</p></FormItem>
					<FormItem label="面试类型">
						<p v-if="dataList.ssApplyRequireList[0].isStudentApplyReview">学生主动申请（{{dataList.ssApplyRequireList[0].studentApplyReviewRemarks}}）</p>
						<p v-if="dataList.ssApplyRequireList[0].isSchoolApplyReview">学校主动申请（{{dataList.ssApplyRequireList[0].schoolApplyReviewRemarks}}）</p>
						<p v-if="dataList.ssApplyRequireList[0].isStudentReview">校友面试（{{dataList.ssApplyRequireList[0].studentReviewRemarks}}）</p>
						<p v-if="dataList.ssApplyRequireList[0].isOtherReview">是否第三方面试（{{dataList.ssApplyRequireList[0].otherReviewRemarks}}）</p>
					</FormItem>
					<FormItem label="面试介绍链接">
						<a>{{dataList.ssApplyRequireList[0].reviewLink}}</a>
					</FormItem>
				</Form>
				<img src="../../../../assets/images/schoolManage/schoolDetail/school.jpg" class="school-video"/>
			</div>
			
			<h3 class="tit">开销预算</h3>
			<dl class="budget width560	 of">
				<dt>高于美国<b>80%</b>的学校</dt>
				<dd>
				    <i-circle :size="160" :trail-width="12" :stroke-width="12" :percent="80" stroke-linecap="square" stroke-color="#44bcb7" class="circle">
				        <div class="total">
				            <h3>64610$</h3>
				            <p>预估总预算</p>
				        </div>
				    </i-circle>
					<Form :label-width="154" class="money">
					<FormItem label="学费/年"><p>$45500是</p></FormItem>
					<FormItem label=" 住宿费">
						<p>$15610（2017-18）</p>
					</FormItem>
					<FormItem label="书本费（预估）">
						<p>$1050</p>
					</FormItem>
					<FormItem label="个人生活费（预估）">
						<p>$2450</p>
					</FormItem>
				</Form>
				</dd>
			</dl>
			
			<h3 class="tit">奖助学金</h3>
			<Form :label-width="168" class="of burse">
				<FormItem label="国际生是否可申请奖学金">
					<p>{{dataList.ssScholarshipsList.isScholarships}}</p>
				</FormItem>
				<FormItem label="国际生是否可申请助学金" class="inline">
					<p>{{dataList.ssScholarshipsList.isFinancialaid}}</p>
				</FormItem>
				<FormItem label="助学金类型" class="baseType inline">
					<p class="fl" v-if="dataList.ssScholarshipsList.isNeedBased">Need-based</p>
					<p class="fl" else-if="dataList.ssScholarshipsList.isNeedBlind">Need-Blind</p>
					<p class="fl progress"><span class="proTit">（国际生获得资助的人数比）</span><Progress :percent="25" :stroke-width="14" status="normal"></Progress></p>
				</FormItem>
				<FormItem label="奖/助学金介绍链接（学校官网）" :label-width="216" class="of">
					<a>{{dataList.ssScholarshipsList.link}}</a>
				</FormItem>
			</Form>
		</div>
		<div class="title"><i></i><span>藤门案例</span><p class="on" @click="IIB(3)" v-show="!toggle[3].tit">打开</p><p class="off" @click="IIB(3)" v-show="toggle[3].tit">关闭</p></div>
		<div class="detailsBox case" v-show="toggle[3].tit">
			<dl class="studentInfo">
				<dt><img src="../../../../assets/images/schoolManage/schoolDetail/people.jpg"/></dt>
				<dd>
					<span>Lei</span>
					<p>深圳-深圳中学</p>
					<p>留学学校/专业：普林斯顿大学/数学专业</p>
					<p>学生背景：深圳中学-广东省国家级示范校国际班</p>
				</dd>
			</dl>
			<h3 class="tit">TA的分享</h3>
			<p class="label">标准成绩</p>
    		<Table border :width="848" :columns="caseTable.caseCol" :data="caseTable.caseData"></Table>
    		
			<p class="label inline">开始时间</p>
			<p class="inline" style="margin: 0 0 20px 30px;">高一上学期（2014年9月）开始规划。</p>
			
			<p class="label">学校申请</p>
    		<Table border :show-header="false" :width="850" :columns="caseApply.caseCol" :data="caseApply.caseData"></Table>
			<p class="label">留学经历分享</p>
			<div class="undergo"> <p class="text">中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………中考完成后，非常想脱离应试体系，于是想去地球的另一端感受不同的教育制度和氛围…………………………………………………………</p>
				<p class="unfold"><img src="../../../../assets/images/schoolManage/schoolDetail/arrow.png" class="fl"/>展开更多案例</p>
				<p class="unfold"><img src="../../../../assets/images/schoolManage/schoolDetail/arrow.png" class="fl down "/>合起更多案例</p>
			</div>
			
			<h3 class="tit">TA的招生官</h3>
			<dl class="admissionOfficer">
				<dt><img src="../../../../assets/images/schoolManage/schoolDetail/people.jpg"/><p>吉利安女士</p></dt>
				<dd>
					<span>招生经历：</span>
					<p>杜克大学助理招办主任；</p>
					<span>教育背景：</span>
					<p>盖茨堡学院政治学学士</p>
					<p>瓦尔登大学教育学硕士</p>
				</dd>
			</dl>
			<h3 class="tit">相关院校</h3>
			<div class="academy">
				<ul>
					<li>
						<dl>
							<dt><img src="../../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><img src="../../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><img src="../../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

//<script>
	import schoolimg from '../../../../assets/images/schoolManage/schoolDetail/school.jpg';
	import next from '../../../../assets/images/schoolManage/schoolDetail/next.png';
	import valid,{
		errors,
	    school,
	    usnews,
	} from '../../../../libs/request';
	export default {
		data(){
			return {
				testScore:0,
				schoolImg:schoolimg,
				nextImg:next,
				dataList:{
					ssApplyRequireList:[
						{
							system:'',
							recomletterRequire:'',
							financeRequre:'',
							scorelistLink:'',
						}
					],
					ssEaxminfoRequireList:[
						{
							scoreRequire:'',
							sendscoreCode:'',
							wavieCondition:'',
							earlyDatetime:'',
							regularDatetime:''
						}
					],
					ssScholarshipsList:{
						isScholarships:"",
						isFinancialaid:'',
						isNeedBased:'',
						isNeedBlind:'',
						link:''
						
					}
				},
				rankml:0,
				toggle:[
					{tit:true},
					{tit:false,son:[true,false,false,false]},
					{tit:false},
					{tit:false},
				],
				caseApply:{
					caseCol:[
	                    {
	                        key: 'name',
	                        align:'center',
	                        width:180,
	                        className:'tit-table'
	                    },
	                    {
	                        key: 'cont',
	                        width:668,
	                    },
                    ],
                    caseData:[
                    	{name:'开始准备文书时间',cont:'2016年8月1日，3-5个月'},
                    	{name:'申请院校',cont:'普林斯顿'},
                    	{name:'被录取院校',cont:'普林斯顿'},
                    	{name:'录取时间',cont:'2017年3月31日'},
                    	{name:'申请成功原因',cont:'充分展示出了对自己向往的东西（无人机、足球、机器人）所表现出来的强烈热情。'}
                    ]
				},
				caseTable:{
					caseCol:[
	                    {
	                        title: '项目',
	                        key: 'name',
	                        align:'center',
	                        width:180,
	                    },
	                    {
	                        title: '初测成绩',
	                        key: 'earlyResults',
	                        align:'center',
	                        width:330,
	                    },
	                    {
	                        title: '最后成绩',
	                        key: 'netResult',
	                        align:'center',
	                        width:336,
	                    }
                    ],
                    caseData:[
                    	{name:'托福/雅思',earlyResults:96,netResult:107},
                    	{name:'托福/雅思',earlyResults:96,netResult:107},
                    	{name:'托福/雅思',earlyResults:96,netResult:107},
                    	{name:'托福/雅思',earlyResults:96,netResult:107}
                    ]
				},
				criminal:{
					type:[ 
						{
	                        title: '犯罪类型',
	                        key: 'cType',
	                        width:'244px',
	                        align:'center',
	                        render: (h, params) => {
	                            return h('div' ,[
	                                h('span', {
	                                	style:{
	                                		display:'inline-block',
	                                		width:'20px',
	                                		height:'16px',
	                                		background:'#'+params.row.color
	                                	}
	                                }),
	                                h('span', {
	                                	style:{
	                                		display:'inline-block',
		                                	width:'90px',
		                                	textAlign:'center',
	                                	}
	                                } , params.row.cType)
	                            ]);
	                        }
	                    },
	                    {
	                        title: '犯罪统计',
	                        key: 'cNum',
	                        width:'154px',
	                        align:'center',
	                    },
					],
					data:[
						{cType:'谋杀罪',cNum:'0',color:'999999'},
						{cType:'过失杀人罪',cNum:'0',color:'f0aa45'},
						{cType:'强奸罪',cNum:'34',color:'e66d2d'},
						{cType:'抢劫罪',cNum:'1',color:'cdd430'},
						{cType:'窃案',cNum:'43',color:'706659'},
						{cType:'车辆盗窃',cNum:'4',color:'5fbbb3'},
						{cType:'纵火案',cNum:'0',color:'999999'}
					],
					type1:[ 
						{
	                        title: '犯罪类型',
	                        key: 'cType',
	                        width:'244px',
	                        align:'center',
	                        render: (h, params) => {
	                            return h('div' ,[
	                                h('span', {
	                                	style:{
	                                		display:'inline-block',
	                                		width:'20px',
	                                		height:'16px',
	                                		background:'#'+params.row.color
	                                	}
	                                }),
	                                h('span', {
	                                	style:{
	                                		display:'inline-block',
		                                	width:'90px',
		                                	textAlign:'center',
	                                	}
	                                } , params.row.cType)
	                            ]);
	                        }
	                    },
	                    {
	                        title: '犯罪统计',
	                        key: 'cNum',
	                        width:'154px',
	                        align:'center',
	                    },
					],
					data1:[
						{cType:'谋杀罪',cNum:'0',color:'999999'},
						{cType:'过失杀人罪',cNum:'0',color:'f0aa45'},
						{cType:'强奸罪',cNum:'33',color:'e66d2d'},
						{cType:'抢劫罪',cNum:'0',color:'cdd430'},
						{cType:'窃案',cNum:'16',color:'706659'},
						{cType:'车辆盗窃',cNum:'0',color:'5fbbb3'},
						{cType:'纵火案',cNum:'0',color:'999999'}
					]
				},
				schoolRank:[
					{src:schoolimg,rank:'1',info:'U.S.News美国综合性大学排名'},
					{src:schoolimg,rank:'2',info:'U.S.News美国综合性大学排名'},
					{src:schoolimg,rank:'3',info:'U.S.News美国综合性大学排名'},
					{src:schoolimg,rank:'4',info:'U.S.News美国综合性大学排名'},
					{src:schoolimg,rank:'5',info:'U.S.News美国综合性大学排名'},
					{src:schoolimg,rank:'6',info:'U.S.News美国综合性大学排名'}
				],
				datacollection:{
					labels:['谋杀罪','过失杀人罪','强奸罪','抢劫罪','窃案','车辆盗窃','纵火案'],
			        datasets: [{
		        	  label:"校园犯罪数量",
		              backgroundColor:["#999999","#f0aa45","#e66d2d","#cdd430","#706659","#5fbbb3","#999999",],
		              pointBorderColor: '#000',
		              borderWidth:0,
		              data: [0, 0, 34, 1, 43, 4, 0]
			        }]
			      },	
			    'options':{
			        legend: {
			            display: false
			        },
			        title:{
			        	display:true,
            			text: '校园犯罪数量',
            			position:"bottom",
            			fontStyle:'nomail',
            			fontSize:16,
            			fontColor:"#323232",
			        },
			        responsive: true,
			        maintainAspectRatio: false
			    },
				datacollection1:{
					labels:['谋杀罪','过失杀人罪','强奸罪','抢劫罪','窃案','车辆盗窃','纵火案'],
			        datasets: [{
		        	  label:"校园犯罪数量",
		              backgroundColor:["#999999","#f0aa45","#e66d2d","#cdd430","#706659","#5fbbb3","#999999",],
		              pointBorderColor: '#000',
		              borderWidth:0,
		              data: [0, 0, 33, 0, 16, 0, 0]
			        }]
			      },	
			    'options1':{
			        legend: {
			            display: false
			        },
			        title:{
			        	display:true,
            			position:"bottom",
            			fontStyle:'nomail',
            			fontSize:16,
            			fontColor:"#323232",
            			text: '宿舍犯罪数量',
			        },
			        responsive: true,
			        maintainAspectRatio: false
			    },
			    gradeList:[],
			    usnewsList:[]
			}
		},
		components:{
		},
		created(){
			let params={
				id:this.$route.query.schoolId
			}
	    	school.formdetails(params).then(valid.call(this)).then(res => {
	    		this.$set(this,'dataList',res.data.data)
//	    		this.dataList=res.data.data;
	    		this.schoolRank=res.data.data.ssRankList
	    		this.gradeList=res.data.data.SsGradeschool
	    		
				let params1={
					usnewsId:res.data.data.usnewsId
				}
		    	usnews.school(params1).then(valid.call(this)).then(res => {
		    		console.log(res)
		    		
		    		this.$set(this,'usnewsList',res.data.data)
			    }).catch(errors.call(this)).finally(()=>{
			    });
		    }).catch(errors.call(this)).finally(()=>{
		    });
		},
		methods:{
			IIB:function(val){
				var isShow=!this.toggle[val].tit;
				console.log(isShow)
				this.$set(this.toggle[val],'tit',isShow);
			},
			IIB2:function(val1,val2){
				var isShow=!this.toggle[val1].son[val2];
				console.log(isShow)
				this.$set(this.toggle[val1].son,val2,isShow);
			},
			nextRank:function(){
			   var e = document.getElementsByClassName('rank')[0].getElementsByTagName('ul')[0];
			   function whichTransitionEvent(){
			   var t,
			       el = document.createElement('surface'),
			       transitions = {
			         'transition':'transitionend',
			         'OTransition':'oTransitionEnd',
			         'MozTransition':'transitionend',
			         'WebkitTransition':'webkitTransitionEnd'
			        }
			 
			       for(t in transitions){
			           if( el.style[t] !== undefined ){
			               return transitions[t];
			            }
			        }
			    } 
			    var transitionEvent = whichTransitionEvent();
				var ml=this.rankml;
				ml+=200;this.$set(this,'rankml',ml);
				var _this=this;
			   transitionEvent && e.addEventListener(transitionEvent, function back() {
			   	
					if(_this.rankml>=_this.schoolRank.length*200) _this.$set(_this,'rankml',0);
                    e. removeEventListener(transitionEvent,back,false);//销毁事件
			                                 
			    });
			},
			exam:function(e){
			}
		}
	}
</script>