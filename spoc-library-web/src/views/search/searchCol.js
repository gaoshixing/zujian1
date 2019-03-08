const style = {
    cursor:'pointer',
    marginLeft:'4px',
    fontSize:'16px',
}
const stylefilter={
    cursor:'pointer',
    marginLeft:'2px',
    fontSize:'12px'
};
const yn = (v)=>{
    return v==1?'Y':'N';
};
const ynr = (v)=>{
    return v==1?'Y':(v==0?'N':'recommend');
};
const sharp = (v)=>{
    return v?`#${v}`:'';
}
export const schoolCol = (self)=>{
    return {
        ftable:{
            header:[
                {
                    render:(h,params)=>{
                        return h('div',{style:{position:'relative'}},[
                            h('span','排名'),
                            h('Icon',{
                                style:stylefilter,
                                class:{active:params.column.filterData.value!=0},
                                props:{type:'funnel'},
                                nativeOn:{
                                    click(){
                                        params.column.filtershow = !params.column.filtershow;
                                    }
                                }
                            }),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange1(params.column.sort,'schoolRanking');
                                    }
                                }
                            }),
                            h('ul',{class:'header-filters',style:{
                                    display:params.column.filtershow?'inline-block':'none'
                                }},
                                ([{label:'全部',value:0}].concat(self.filterData)).map(item=>{return h('li',{
                                    class:{
                                        active:item&&(item.value===params.column.filterData.value)
                                    },
                                    on:{
                                        click(){
                                            params.column.filterData.value = item.value;
                                            params.column.filtershow = false;
                                            self.onFilter1(item);
                                        }
                                    }
                                },item?item.label:'')}) 
                            )
                        ]);
                    },
                    style:{
                        width:'80px',
                        height:'100px',
                        overflow:'visible',
                        'line-height':'100px',
                    },
                    sort:true,
                    filtershow:false,
                    filterData:{
                        value:0
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'学校');
                    },
                    style:{
                        width:'260px',
                        height:'100px',
                        'line-height':'100px',
                    }
                }
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.schoolRanking));
                    },
                    style:{
                        width:'80px'
                    }
                },
                {
                    render:(h,params)=>{
                        return h('a',{
                            attrs:{
                                title:params.row.schoolEnname
                            },
                            on:{
                                click(){
                                    self.$router.push({name:'library.basicInfo',query:{schoolId:params.row.id,edit:1}})
                                }
                            }
                        },params.row.schoolEnname);
                    },
                    style:{
                        width:'260px'
                    }
                }
            ],
        },
        mtable:{
            header:[
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'基本信息');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[0,6]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'学校信息');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[6,10]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'标准化考试');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[10,20]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'奖助学金');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[20,25]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'面试要求');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[25,31]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'其他');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[31,37]
                }
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.country);
                    },
                    style:{
                        width:'140px',
                        textAlign:'center'
                    },
                    col: '国家'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.region);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'地区',
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.state);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'州'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.isBusiness));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'有无本科商学院'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.isEngineering));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'有无本科工程学院'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.tuitionFee);
                    },
                    style:{
                        width:'100px'
                    },
                    col:(h,curr)=>{
                        return [
                            h('span','学费'),
                            h('Icon',{
                                style,
                                props:{type: curr.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        curr.sort = !curr.sort;
                                        self.onSortChange1(curr.sort,'tuitionFee');
                                    }
                                }
                            })
                        ];
                    },
                    sort:false,
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.earlyApply);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'早申请'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.regularApply);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'常规申请'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.applySystem);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'申请系统'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.applyFee);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'申请费'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.toeflMinScore);
                    },
                    style:{
                        width:'120px'
                    },
                    col:(h,curr)=>{
                        return [
                            h('span','托福最低分'),
                            h('Icon',{
                                style,
                                props:{type: curr.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        curr.sort = !curr.sort;
                                        self.onSortChange1(curr.sort,'toeflMinScore');
                                    }
                                }
                            })
                        ];
                    },
                    sort:false,
                    
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.ieltsMinScore);
                    },
                    style:{
                        width:'120px'
                    },
                    col:(h,curr)=>{
                        return [
                            h('span','雅思最低分'),
                            h('Icon',{
                                style,
                                props:{type: curr.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        curr.sort = !curr.sort;
                                        self.onSortChange1(curr.sort,'ieltsMinScore');
                                    }
                                }
                            })
                        ];
                    },
                    sort:false,
                },
                {
                    render:(h,params)=>{
                        return h('div',{},ynr(params.row.isReview));
                    },
                    style:{
                        width:'100px'
                    },
                    col:'SAT考试要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},ynr(params.row.actRequire));
                    },
                    style:{
                        width:'100px'
                    },
                    col:'ACT考试要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},ynr(params.row.satWrite));
                    },
                    style:{
                        width:'100px'
                    },
                    col:'SAT写作要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},ynr(params.row.actWrite));
                    },
                    style:{
                        width:'100px'
                    },
                    col:'ACT写作要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.actIsReplace));
                    },
                    style:{
                        width:'120px'
                    },
                    col:'ACT可替代SAT2'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.satCode);
                    },
                    style:{
                        width:'100px'
                    },
                    col:'SATcode'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.toeflCode);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'托福code'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.actCode);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'ACTcode'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.applyScholarships));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'国际生可申请奖学金？'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.applyFinancialAid));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'国际生可申请助学金？'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.needBased));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'奖学金need-based'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.needBlind));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'助学金need-blind'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.scholarshipsLink,target:'_blank'} },params.row.scholarshipsLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'奖助学金链接'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},ynr(params.row.isReview));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'是否必须面试'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.studentApplyReview);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学生主动申请'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.schoolApplyReview);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学校主动邀请'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.otherReview);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'第三方面试'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.studentReview);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'校友面试'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.reviewIntroduceLink,target:'_blank'} },params.row.reviewIntroduceLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'面试介绍链接'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.internationalRatio);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'国际生比例'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.isDobuleaccept));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'是否双录取'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.recomletterRequire);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'推荐信要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.financeRequre);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'财力证明要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},yn(params.row.isScorelist));
                    },
                    style:{
                        width:'140px'
                    },
                    col:'需要成绩单认证？'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.scorelistLink,target:'_blank'} },params.row.scorelistLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'成绩单认证链接'
                }



            ]
        }
    }
}

export const schoolGradeCol = (self) => {
    return {
        ftable:{
            header:[
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','研究生院排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange2(params.column.sort,'ranking');
                                    }
                                }
                            }),
                        ]);
                    },
                    style:{
                        width:'105px',
                        height:'100px',
                        overflow:'visible',
                        'line-height':'100px',
                    },
                    sort:true,
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'研究生院');
                    },
                    style:{
                        width:'115px',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','U.S.News排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange2(params.column.sort,'ranking');
                                    }
                                }
                            }),
                        ]);
                    },
                    style:{
                        width:'120px',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'隶属学校');
                    },
                    style:{
                        width:'120px',
                        height:'100px',
                        'line-height':'100px',
                    }
                },

            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.ranking));
                    },
                    style:{
                        width:'105px'
                    }
                },
                {
                    render:(h,params)=>{
                        return h('a',{
                            attrs:{
                                title:params.row.cnName
                            },
                            on:{
                                click(){
                                    self.$router.push({name:'library.academeBasicInfo',query:{schoolId:params.row.id,edit:1},params:{currentTitle:1,processStep:1}})
                                }
                            }
                        },params.row.cnName);
                    },
                    style:{
                        width:'115px'
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.schoolRanking));
                    },
                    style:{
                        width:'120px'
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',{
                            attrs:{
                                title:params.row.schoolEnname
                            },
                        },params.row.schoolEnname);
                    },
                    style:{
                        width:'120px'
                    }
                },
            ],
        },
        mtable:{
            header:[
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'基本信息');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[0,6]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'面试要求');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[6,10]
                },
               
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.country);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'国家'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.region);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'地区'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.state);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'州'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学院类型'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.degree);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学位类型'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.tuitionFee);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学费'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.graduationRatio);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'毕业率（整体）'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.minimumSalary);
                    },
                    style:{
                        width:'160px'
                    },
                    col:'国际毕业生最低基本薪资'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.averageSalary);
                    },
                    style:{
                        width:'160px'
                    },
                    col:'国际毕业生平均基本薪资'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.maxnumSalary);
                    },
                    style:{
                        width:'160px'
                    },
                    col:'国际毕业生最高基本薪资'
                },
               
            ],
        }
    };
}

export const majorCol = (self) => {
    return {
        ftable:{
            header:[
                {
                    render:(h,params)=>{
                        return h('div',{},'专业名称');
                    },
                    style:{
                        width:'24%',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','专业排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange3(params.column.sort,'majorRank');
                                    }
                                }
                            })
                        ]);
                    },
                    style:{
                        width:'10%',
                        height:'100px',
                        'line-height':'100px',
                    },
                    sort:true
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'隶属学校');
                    },
                    style:{
                        width:'20%',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','学校排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange3(params.column.sort,'schoolRanking');
                                    }
                                }
                            })
                        ]);
                    },
                    style:{
                        width:'10%',
                        height:'100px',
                        'line-height':'100px',
                    },
                    sort:true,
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'所属学院');
                    },
                    style:{
                        width:'20%',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'学院类型');
                    },
                    style:{
                        width:'16%',
                        height:'100px',
                        'line-height':'100px',
                    }
                },  
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('a',{
                            on:{
                                click(){
                                    self.$router.push({name:'library.UndergraduateProgramInfo',query:{majorId:params.row.id}});
                                }
                            }
                        },params.row.name);
                    },
                    style:{
                        width:'24%'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.majorRank));
                    },
                    style:{
                        width:'10%',
                        textAlign:'center'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.schoolEnname);
                    },
                    style:{
                        width:'20%'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.schoolRanking));
                    },
                    style:{
                        width:'10%',
                        textAlign:'center'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.collegeName);
                    },
                    style:{
                        width:'20%'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.collegeType);
                    },
                    style:{
                        width:'16%'
                    },
                },
            ],
        },
        mtable:{
            header:[],
            body:[],
        }
    };
}

export const majorGradeCol = (self) => {
    return {
        ftable:{
            header:[
                {
                    render:(h,params)=>{
                        return h('div',{},'专业名称');
                    },
                    style:{
                        width:'140px',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','专业排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange4(params.column.sort,'majorRank');
                                    }
                                }
                            })
                        ]);
                    },
                    style:{
                        width:'120px',
                        height:'100px',
                        'line-height':'100px',
                    },
                    sort:true,
                },
                {
                    render:(h,params)=>{
                        return h('div',{},'隶属学校');
                    },
                    style:{
                        width:'140px',
                        height:'100px',
                        'line-height':'100px',
                    }
                },
                {
                    render:(h,params)=>{
                        return h('div',[
                            h('span','学校排名'),
                            h('Icon',{
                                style,
                                props:{type: params.column.sort?'ios-arrow-up':'ios-arrow-down'},
                                nativeOn:{
                                    click(){
                                        params.column.sort = !params.column.sort;
                                        self.onSortChange4(params.column.sort,'schoolRanking');
                                    }
                                }
                            })
                        ]);
                    },
                    style:{
                        width:'100px',
                        height:'100px',
                        'line-height':'100px',
                    },
                    sort:true,
                } 
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('a',{
                            on:{
                                click(){
                                    self.$router.push({name:'library.graduateProgramInfo',query:{majorId:params.row.id}});
                                }
                            }
                        },params.row.name);
                    },
                    style:{
                        width:'140px'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.majorRank));
                    },
                    style:{
                        width:'120px'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.schoolEnname);
                    },
                    style:{
                        width:'140px'
                    },
                },
                {
                    render:(h,params)=>{
                        return h('div',{},sharp(params.row.schoolRanking));
                    },
                    style:{
                        width:'100px'
                    },
                },
            ],
        },
        mtable:{
            header:[
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'基本信息');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[0,4]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'申请信息');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[4,8]
                },
                {
                    render:(h,params,ctx)=>{
                        return ctx.calc(h,params,'标化考试');
                    },
                    style:{
                        height:'100px'
                    },
                    colIndex:[8,14]
                },
            ],
            body:[
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.gradeschoolName);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'研究生院'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.levelType);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'学位类型'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.majorLink,target:'_blank'} },params.row.majorLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'Program Link'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.majorBranchLink,target:'_blank'} },params.row.majorBranchLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'Program Concentration'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.springDeadline);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'Deadline(Spring)'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.springDeadline);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'Deadline(Fall)'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.postAddress);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'邮寄地址'
                },
                {
                    render:(h,params)=>{
                        return h('a',{ attrs:{href:params.row.checklistLink,target:'_blank'} },params.row.checklistLink);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'Checklist'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'托福最低分'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'雅思最低分'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'GRE考试要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'GMAT考试要求'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'托福/雅思code'
                },
                {
                    render:(h,params)=>{
                        return h('div',{},params.row.type);
                    },
                    style:{
                        width:'140px'
                    },
                    col:'GRE/GMAT code'
                },
            ],
        }
    };
}