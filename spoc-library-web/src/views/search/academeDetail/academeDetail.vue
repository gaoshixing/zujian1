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
					// height: 150px;
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
				width: auto !important;
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
					margin-left: 19px;
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
    		.fl{
			float: left;
		}
		.fr{
			float: right;
		}
		.inline{
			display: inline-block;
		}
		.header{
			padding: 20px 20px 0px;
			overflow:hidden;
			.logo{
				.fl
			}
			.referral{
				.fl;
				width: 292px;
				box-sizing: border-box;
				padding-left: 30px;
				font-size:12px;
				.ref1{
					line-height: 36px;
					font-size: 20px;
					font-weight: 400;
				}
				.ref2{
					line-height: 16px;
				}
				.ref3{
					line-height: 54px;
					font-size: 14px;
				}
			}
			.tag{
				padding: 8px;
				button{
					margin-right: 20px;
					width: 93px;
					height: 30px;
				}
			}
		}
		.tabs{
			line-height: 29px;
			font-size: 14px;
			.ivu-tabs-bar{
				padding: 0 10px;
			}
		}
    .intro{
      >div {
        display: inline-block;
        &:nth-of-type(odd){
          width: 500px;
        }
      }
    }
    .salary{
      >div{
        display: flex;
        >.ivu-form-item{
          display: flex;
          &:first-of-type{
            width: 300px;
          }
        }
      }
    }
    ._process{
      >div{
        width: 200px;
      }
      >sapn{
        margin-left: 10px;

      }
      display: flex;
    }
	}
</style>

<template>
	<div class="details">
    	<div class="schoolDetail">
		<div class="header">
			<div class="logo">
				<img :src="imgLogo"/>
			</div>
			<div class="referral">
				<p class="ref1">{{dataList.cnName}}</p>
				<!-- <p class="ref2">Princeton University</p> -->
				<p class="ref3">{{dataList.source}}美国综合大学排名</p>
			</div>
			<div class="tag">
				<Button type="primary">美国-北美</Button>
				<Button type="primary">私立学校</Button>
			</div>
		</div>
	</div>
  	    <Tabs size="small" class="tabs" :animated="false">
	        <TabPane name="details" label="学院详情">
	<div class="title"><i></i><span>学院介绍</span><p class="on" @click="IIB(0)" v-show="!toggle[0].tit">打开</p><p class="off" @click="IIB(0)" v-show="toggle[0].tit">关闭</p></div>
		<div class="detailsBox prospectus" v-show="toggle[0].tit">
			<Form :label-width="68" class="probablyForm intro">
				<FormItem label="隶属学校" class="inline">
	            	<p class="probably">{{dataList.schoolEnname }}</p>
	        	</FormItem>
				<FormItem label="招生学位" class="inline">
	            	<p class="probably">{{dataList.degree}}</p>
	        	</FormItem>
				<FormItem label="地理位置" class="width504 inline">
	            	<p class="probably"><span>{{dataList.located}}</span><Button type="primary" v-show="dataList.located">{{dataList.located}}</Button></p>
	        	</FormItem>
				<FormItem label="U.S.News学院排名" class="inline">
	            	<p class="probably">{{dataList.ranking}}</p>
	        	</FormItem>
				<FormItem label="学费" class=" inline">
	            	<p class="probably"></p>
	        	</FormItem>
        <FormItem label="师生比" class="inline">
	            	<p class="probably">https://www.princeton.edu/</p>
	        	</FormItem>
          <FormItem label="在校生" class=" inline">
                          <p class="probably">https://www.princeton.edu/</p>
           </FormItem>
          <FormItem label="国际生占比" class="inline">
                          <p class="probably">https://www.princeton.edu/</p>
            </FormItem>
          <FormItem label="男生占比" class="inline">
                          <p class="probably">https://www.princeton.edu/</p>
          </FormItem>
          <FormItem label="女生占比" class="inline">
                          <p class="probably">https://www.princeton.edu/</p>
          </FormItem>
          <FormItem label="国际学生代表国际" class="inline">
                          <p class="probably">https://www.princeton.edu/</p>
          </FormItem>
      </Form>
        	<h3 class="tit">简介</h3>
        	<div class="intro">
        	<!-- <img :src="schoolImg" style="float: right;width: 414px;height: auto;padding:0 0 10px 10px;"/> -->
        	&emsp;&emsp;普林斯顿大学（英语：Princeton University），又译普林斯敦大学，常被直接称为普林斯顿，是一所位于美国新泽西州普林斯顿的私立研究型大学，现为八所常春藤盟校之一。<br /><br />&emsp;&emsp;普林斯顿历史悠久。它成立于1746年，是九所在美国革命前成立的殖民地学院之一，同时也是美国第四古老的高等教育机构。其在1747年移至纽瓦克，最终在1756年搬到了现在的普林斯顿，并于1896年正式改名为“普林斯顿大学”。虽然其旧校名是“新泽西学院”，但它与今天位于邻近的尤因镇（Ewing Township）的“新泽西学院”没有任何关联。此外虽然它最初是长老制的教育机构，但学校从没有跟任何宗教机构有直接的联系，而现在对学生亦无任何宗教上的要求。<br /><br />&emsp;&emsp;普林斯顿现提供各种有关人文、自然科学、社会科学及工程学的本科及研究生课程；它并没有医学院、法学院、神学院及商学院，但能在政治及工程上提供专业课程。大学也与普林斯顿高等研究院及普林斯顿宗教学校有联谊。至今，已经有41位诺贝尔奖得主、17名美国国家科学奖章得主，14名菲尔兹奖得主，10名图灵奖得主，及3名美国国家人文奖章夺得人曾经或现为普林斯顿大学的毕业生或教职员。另外，普林斯顿也是获得最多捐款的学术机构之一。
        	<br /><br /><b>&emsp;&emsp; 普林斯顿大学偏爱理科学生，特别是有大奖及专利的学生。普林斯顿大学对中国理科生有着独特的爱，特别是物理数学，如果你在这方面有天赋，尽管去申请。</b><br /><b>&emsp;&emsp; 申请普林斯顿大学，除了考试分数，最重要的就是课外活动背景和论文的质量，两者都要有个性，与众不同才会被看中。申请者可以利用暑假参加一些能体现自身独特性的课外活动，积累丰富的论文素材。</b><br /><br />
        	<p>普林斯顿大学所在城市-新泽西州普林斯顿市知名企业包括：</p>
          <p v-html="dataList.intro"></p>
        	<!-- <h3 class="tit">杰出校友</h3>
        	<ul class="alumnus">
        		<li>詹姆斯·麦迪逊 - 第4任美国总统。</li>
        		<li>伍德罗·威尔逊 - 第28任美国总统，曾任普林斯顿大学校长及新泽西州州长。</li>
        		<li>约翰·F·肯尼迪 - 第35任美国总统。</li>
        		<li>艾伦·图灵博士 - 计算机科学家、密码学家。</li>
        		<li>盖瑞·贝克 - 1992年诺贝尔经济学奖得主。</li>
        		<li>皮特·康拉德 - 宇航员，第三个踏上月球的人。</li>
        		<li>田长霖 - 柏克莱加州大学校长。</li>
        	</ul> -->
         <h3 class="tit">就业情况</h3>
        <div class="lifeTit">
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/man.svg"/></dt>
        			<dd>
        				<b>97%</b>
        				<span>就业率</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/man.svg"/></dt>
        			<dd>
        				<b>${{dataList.minimumSalary}}42,500</b>
        				<span>最低薪资</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>${{dataList.averageSalary}}134,071</b>
        				<span>平均薪资</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>${{dataList.maxnumSalary}}500,000</b>
        				<span>最高薪资</span>
        			</dd>
        		</dl>
        	</div>

			  </div>
        <Form class="salary">
           <div>
            <FormItem label="国际生最低薪资">
                 ${{dataList.maxnumSalary}}
            </FormItem>
            <FormItem>
              <div class="_process">
                <div>
                <Progress :percent="68" hide-info :stroke-width="14" status="normal"></Progress>
                </div>
                <span>高于68%的学校</span>
              </div>
            </FormItem>
          </div>
         <div> 
            <FormItem label="国际生平均薪资">
                ${{dataList.maxnumSalary}}
            </FormItem>
            <FormItem>
              <div class="_process">
                <div>
                <Progress :percent="60" hide-info :stroke-width="14" status="normal"></Progress>
                </div>
                <span>高于60%的学校</span>
              </div>
            </FormItem>
          </div>
          <div>
            <FormItem label="国际生最高薪资">
                ${{dataList.maxnumSalary}}
            </FormItem>
            <FormItem>
                <div class="_process">
                <div>
                <Progress :percent="80" hide-info :stroke-width="14" status="normal"></Progress>
                </div>
                <span>高于80%的学校</span>
              </div>
            </FormItem>
          </div>
        </Form>
        	<h3 class="tit">不同职业基本薪资</h3>
        	<div class="rankBox">
        		<div class="rank">
		        	<ul id="rankml" :style="{width:2*schoolRank.length*200+'px',marginLeft:-rankml+'px'}" :class="[rankml!=0? 'animate' : '']">
		        		<li v-for="item in schoolRank"><p :style="{backgroundImage: 'url('+item.src+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span v-html="item.info"></span>
		        		</li>
		        		<li v-for="item in schoolRank"><p :style="{backgroundImage: 'url('+item.src+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span v-html="item.info"></span>
		        		</li>
		        	</ul>
        		</div>
        		<img class="next" :src="nextImg" @click="nextRank('rankml')"/>
        	</div>
          <h3 class="tit">不同行业基本薪资</h3>
        	<div class="rankBox">
        		<div class="rank">
		        	<ul id="rankml2" :style="{width:2*schoolRank.length*200+'px',marginLeft:-rankml2+'px'}" :class="[rankml2!=0? 'animate' : '']">
		        		<li v-for="item in schoolRank"><p :style="{backgroundImage: 'url('+item.src+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span v-html="item.info"></span>
		        		</li>
		        		<li v-for="item in schoolRank"><p :style="{backgroundImage: 'url('+item.src+')',backgroundSize:'cover'}"><span>#{{item.rank}}</span></p>
		        			<span v-html="item.info"></span>
		        		</li>
		        	</ul>
        		</div>
        		<img class="next" :src="nextImg" @click="nextRank('rankml2')"/>
        	</div>
          
        	<!-- <h3 class="tit">校园安全</h3>
        	<div class="criminalNumber">
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/circle.svg"/></dt>
        			<dd>
        				<h4>82起</h4>
						<p>校园犯罪数量</p>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/circle.svg"/></dt>
        			<dd>
        				<h4>49起</h4>
						<p>宿舍犯罪数量</p>
        			</dd>
        		</dl>
        	</div>
        	<Row>
        		<Col span="9" offset="1"><chart1 :odata="datacollection" :option="options" style="width: 200px;height: 276px;padding-top: 76px;"></chart1></Col>
        		<Col span="14"><Table border :width="400" :columns="criminal.type" :data="criminal.data"></Table></Col>
        	</Row>
        	<Row style="margin-top: 60px;">
        		<Col span="9" offset="1"><chart1 :odata="datacollection1" :option="options1" style="width: 200px;height: 276px;padding-top: 76px;"></chart1></Col>
        		<Col span="14"><Table border :width="400" :columns="criminal.type1" :data="criminal.data1"></Table></Col>
        	</Row>
        	
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
        		<img src="../../../assets/images/schoolManage/schoolDetail/arrow.png" class="arrow"/>
        		<img src="../../../assets/images/schoolManage/schoolDetail/arrow.png" class="arrow down"/>
        	</div>
		
			<div class="lifeRatio">
				<Form :label-width="70" class="ratioForm">
					<FormItem label="男生占比" class="width376 fl">55%</FormItem>
					<FormItem label="女生占比" class="width376 fr">55%</FormItem>
					<FormItem label="国际学生主要国家分布" class="fl">Canada (2%), South Korea (1%), China (1%), United Kingdom (1%), Australia (5%), India (5%)。</FormItem>
				</Form>
			</div> -->
		</div>
		
		<div class="title"><i></i><span>专业项目</span><p class="on" @click="IIB(1)" v-show="!toggle[1].tit">打开</p><p class="off" @click="IIB(1)" v-show="toggle[1].tit">关闭</p></div>
		<div class="detailsBox major" v-show="toggle[1].tit">
        	<h3 class="tit">热门专业</h3>
			<ul >
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
			</ul>
        	<h3 class="tit">哈弗商学院开设专业</h3>
			<ul >
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
				<li>Public Policy Analysis, General, <span>11%</span></li>
			</ul>
        	<!-- <h3 class="tit">本校专业及排名</h3> -->
        	<!-- <div class="rankList">
        		<div class="title"><i></i><span>工程学院</span><p class="on" @click="IIB2(1,0)" v-show="!toggle[1].son[0]">打开</p><p class="off" @click="IIB2(1,0)" v-show="toggle[1].son[0]">关闭</p><p class="rank">#11</p></div>
        		<div class="pro" v-show="toggle[1].son[0]">
					<ul >
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
					</ul>
	        	</div>
        		<div class="title"><i></i><span>工程学院</span><p class="on" @click="IIB2(1,1)" v-show="!toggle[1].son[1]">打开</p><p class="off" @click="IIB2(1,1)" v-show="toggle[1].son[1]">关闭</p><p class="rank">#11</p></div>
        		<div class="pro" v-show="toggle[1].son[1]">
					<ul >
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
					</ul>
	        	</div>
	        	<div class="title"><i></i><span>工程学院</span><p class="on" @click="IIB2(1,2)" v-show="!toggle[1].son[2]">打开</p><p class="off" @click="IIB2(1,2)" v-show="toggle[1].son[2]">关闭</p><p class="rank">#11</p></div>
        		<div class="pro" v-show="toggle[1].son[2]">
					<ul >
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
					</ul>
	        	</div>
	        	<div class="title"><i></i><span>工程学院</span><p class="on" @click="IIB2(1,3)" v-show="!toggle[1].son[3]">打开</p><p class="off" @click="IIB2(1,3)" v-show="toggle[1].son[3]">关闭</p><p class="rank">#11</p></div>
        		<div class="pro" v-show="toggle[1].son[3]">
					<ul >
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
						<li>Public Policy Analysis, General, <span>11%</span></li>
					</ul>
	        	</div>
        	</div> -->
		</div>
	
		<div class="title"><i></i><span>申请介绍（本科）</span><p class="on" @click="IIB(2)" v-show="!toggle[2].tit">打开</p><p class="off" @click="IIB(2)" v-show="toggle[2].tit">关闭</p></div>
		<div class="detailsBox info" v-show="toggle[2].tit">
			<div class="infoTit">
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>{{dataList.graduateAcceptRate}}%</b>
        				<span>硕士录取率</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/man2.svg"/></dt>
        			<dd>
        				<b>{{dataList.doctorAcceptRate}}</b>
        				<span>博士录取率</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/percent.svg"/></dt>
        			<dd>
        				<b>{{}}月</b>
        				<span>申请截止时间</span>
        			</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../../assets/images/schoolManage/schoolDetail/dollar.svg"/></dt>
        			<dd>
        				<b>$250</b>
        				<span>申请费用</span>
        			</dd>
        		</dl>
        	</div>
          <Form>
            <FormItem  label="硕士申请情况">

            </FormItem >
            <FormItem  label="博士申请情况">
                
            </FormItem >
          </Form>
			<!-- <div class="infoTable">
				<p><b>申请系统</b><span>Common、CAAS、独立系统（https://www.princeton.edu/）</span></p>
				<p><b>申请系统</b><span>Common、CAAS、独立系统（https://www.princeton.edu/）</span></p>
				<p><b>申请系统</b><span>Common、CAAS、独立系统（https://www.princeton.edu/）</span></p>
				<p><b>申请系统</b><span>Common、CAAS、独立系统（https://www.princeton.edu/）</span></p>
			</div> -->
			<!-- <h3 class="tit">重要日期</h3>
			<Form :label-width="74" class="imDate">
				<FormItem label="ED" class="of">
					<p class="imDate-row">
					<FormItem :label-width="100" label="申请截止日期" class="inline"><p class="imtime">11月1日</p></FormItem>
					<FormItem :label-width="100" label="结果发放日期" class="inline"><p class="imtime">12月中旬</p></FormItem>
					</p>
				</FormItem>
				<FormItem label="REA" class="of">
					<p class="imDate-row">
					<FormItem :label-width="100" label="申请截止日期" class="inline"><p class="imtime">11月1日</p></FormItem>
					<FormItem :label-width="100" label="结果发放日期" class="inline"><p class="imtime">12月中旬</p></FormItem>
					</p>
				</FormItem>
				<FormItem label="RD/Rolling" class="of">
					<p class="imDate-row">
					<FormItem :label-width="100" label="申请截止日期" class="inline"><p class="imtime">11月1日</p></FormItem>
					<FormItem :label-width="100" label="结果发放日期" class="inline"><p class="imtime">12月中旬</p></FormItem>
					</p>
				</FormItem>
			</Form> -->
			<h3 class="tit">考试&成绩</h3>
			<div class="test">
				<ul class="left">
					<li @click="exam()">托福/雅思<Button type="primary">推荐考</Button></li>
					<li>GRE<Button type="primary">接受</Button></li>
					<li>GMAT<Button type="primary">必须考</Button></li>
					<li>GPA<Button type="primary">推荐考</Button></li>
				</ul>
				<ul class="right">
					<li>托福最低分：107</li>
					<li> 托福送分代码：4532</li>
					<li>TOEFL wavie条件：xxxxxx</li>
					<li>早期申请托福考试时间要求：2017/11/11</li>
					<li>常规申请托福考试时间要求：2017/11/11</li>
					<div class="tri"></div>
				</ul>
			</div>
			<!-- <h3 class="tit">关于面试</h3> -->
			<!-- <div class="interBox">
				<Form :label-width="74" class="inter">
					<FormItem label="面试是否必须"><p>是</p></FormItem>
					<FormItem label="面试类型">
						<p>学生主动申请（xxxx备注信息xxxxx）</p>
						<p>校友面试（xxxx备注信息xxxxx）</p>
					</FormItem>
					<FormItem label="面试介绍链接">
						<a>http://www.wm.edu/admission/undergraduateadmission/how-to-apply/freshmanapplicants/application-checklist/oncampusinterviews/</a>
					</FormItem>
				</Form>
				<img src="../../../assets/images/schoolManage/schoolDetail/school.jpg" class="school-video"/>
			</div> -->
			
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
			<!-- <Form :label-width="168" class="of burse"> -->
				<!-- <FormItem label="国际生是否可申请奖学金">
					<p>否</p>
				</FormItem>
				<FormItem label="国际生是否可申请助学金" class="inline">
					<p>否</p>
				</FormItem> -->
				<!-- <FormItem label="助学金类型" class="baseType inline"> -->
					<!-- <p class="fl">Need-based</p> -->
					<p class="fl progress"><span class="proTit">（国际生获得资助的人数比）</span><Progress :percent="25" :stroke-width="14" status="normal"></Progress></p>
				<!-- </FormItem> -->
				<!-- <FormItem label="奖/助学金介绍链接（学校官网）" :label-width="216" class="of">
					<a>https://www.princeton.edu/</a>
				</FormItem> -->
			<!-- </Form> -->
		</div>
		<div class="title"><i></i><span>藤门案例</span><p class="on" @click="IIB(3)" v-show="!toggle[3].tit">打开</p><p class="off" @click="IIB(3)" v-show="toggle[3].tit">关闭</p></div>
		<div class="detailsBox case" >
			<dl class="studentInfo">
				<dt><img src="../../../assets/images/schoolManage/schoolDetail/people.jpg"/></dt>
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
				<p class="unfold"><img src="../../../assets/images/schoolManage/schoolDetail/arrow.png" class="fl"/>展开更多案例</p>
				<p class="unfold"><img src="../../../assets/images/schoolManage/schoolDetail/arrow.png" class="fl down "/>合起更多案例</p>
			</div>
			
			<h3 class="tit">TA的招生官</h3>
			<dl class="admissionOfficer">
				<dt><img src="../../../assets/images/schoolManage/schoolDetail/people.jpg"/><p>吉利安女士</p></dt>
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
							<dt><img src="../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><img src="../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><img src="../../../assets/images/schoolManage/schoolDetail/logo.png"/></dt>
							<dd>
								<span>普林斯顿大学</span>
								<p>普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学普林斯顿大学</p>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
  </TabPane>
	<TabPane name="replenish" label="U.S.News补充信息"></TabPane>
	</Tabs>
	</div>
</template>

<script>
  import school from '../../../assets/images/schoolManage/schoolDetail/school.jpg';
  	import logo from '../../../assets/images/schoolManage/schoolDetail/logo.png';
  import next from '../../../assets/images/schoolManage/schoolDetail/next.png';
  import valid,{errors,fillAcademeMajor } from "../../../libs/request";
  import { mapMutations } from "vuex";

	export default {
		data(){
			return {
        imgLogo:logo,
        dataList:[],
        name:'academeDetail',
				schoolImg:school,
				nextImg:next,
        rankml:0,
        rankml2:0,
				options:{},
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
					{src:school,rank:'1',info:'最低    $51,500<br/>平均    $81,500<br/>最高    $151,500'},
					{src:school,rank:'2',info:'最低    $51,500'},
					{src:school,rank:'3',info:'最低    $51,500'},
					{src:school,rank:'4',info:'最低    $51,500'},
					{src:school,rank:'5',info:'最低    $51,500'},
					{src:school,rank:'6',info:'最低    $51,500'}
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
			    }
			}
		},
		computed:{
		},
		components:{
    },
    created () {
      this.fetchAcademeDetail();
    },
		mounted(){
			
		},
		methods:{
      ...mapMutations(['updateLoadingStatus']),
      //获取学远详情
      fetchAcademeDetail(){
        this.updateLoadingStatus({ isLoading: false });
        fillAcademeMajor.fetchAcademeDetail(this.$route.query.gradeSchoolId).then(valid.call(this)).then(res => {
          if (res.ok) {
              console.log(res);
              this.dataList = res.data.data;
              
          }
          })
          .catch(errors.call(this))
          .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });     
      },
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
			nextRank:function(dom){
        // var e = document.getElementsByClassName('rank')[0].getElementsByTagName('ul')[0];
        var e = document.getElementById(dom);
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
          
				var ml=this[dom];
				ml+=200;this.$set(this,dom,ml);
				var _this=this;
			   transitionEvent && e.addEventListener(transitionEvent, function back() {
			   	
					if(_this[dom]>=_this.schoolRank.length*200) _this.$set(_this,dom,0);
                    e. removeEventListener(transitionEvent,back,false);//销毁事件
			                                 
			    });
			},
			exam:function(e){
			}
		}
	}
</script>