<style lang="less">
    .docuModuleGSX {
        li {
            list-style: none;
        }
        .content {
            border-top: 1px solid #e5e5e5;
            padding: 20px 0;
            .title {
                .handle {
                    float: right;
                    margin-top: 10px;
                }
                b {
                    color: #44bcbc;
                    font-size: 18px;
                    font-weight: 400;
                }
                .tag {
                    display: inline-block;
                    padding: 2px 10px;
                    color: #fff;
                    margin-right: 10px;
                    background-color: #d0d0d0;
                    border-radius: 12px;
                }
            }
            .inform {
                .informUl {
                    margin-left: 30px;
                    li {
                        line-height: 26px;
                        >span {
                            color: #c3c3c3;
                            margin-right: 10px;
                        }
                    }
                }
            }
            
        }
    }
</style>

<template>
    <div class="docuModuleGSX">
        <div class="content" v-for="(item, index) in dataList" :key="index">
            <div class="title">
                <b>{{item.name}}</b>
                <span style="color:#999;margin:0 20px">({{item.teacherName}}|{{item.createDate}})</span>
                <span v-if="item.tags.length>0" class="tag" v-for="(item1, index) in item.tags" :key="index">{{item1.title}}</span>
                <Dropdown class="handle" @on-click="dropdownClick">
                    <span style="color:#44bcbc" class="iconfont icon-caozuo"></span>
                    <DropdownMenu slot="list" style="text-align:center">
                        <DropdownItem :name='"edit|"+item.id+"|"+index'>编辑</DropdownItem>
                        <DropdownItem :name='"dele|"+item.id+"|"+index'>删除</DropdownItem>
                    </DropdownMenu>
                </Dropdown> 
            </div>
            <div class="inform">
                <ul class="informUl" v-if="item.type == 9007">
                    <li><span>文书顾问：</span>{{item.teacherName}}</li>
                    <li><span>文书类型：</span>{{item.docType}}</li>
                    <li><span>学生姓名：</span>{{item.studentName}}</li>
                    <li v-if="item.schoolName"><span>申请学校：</span><a @click="routerGo(item.schoolId)">{{item.schoolName}}</a></li>
                    <li v-if="item.schoolMajorName"><span>专业项目：</span><a @click="routerGoSubj(item.schoolMajorId, item.applyType)">{{item.schoolMajorName}}</a></li>
                    <li v-if="item.applyTime"><span>　入学季：</span>{{item.applyTime}}</li>
                    <li v-if="item.applyPolicyName"><span>申请政策：</span>{{item.applyPolicyName}}</li>
                    <li v-if="item.applyResultName"><span>录取结果：</span>{{item.applyResultName}}</li>
                </ul>
                <ul class="informUl" v-else>
                    <li><span>文书顾问：</span>{{item.teacherName}}</li>
                    <li><span>文书类型：</span>{{item.docType}}</li>
                    <li><span>学生姓名：</span>{{item.studentName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dataList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data() {
        return  {
           
        }
    },

    methods: {
        dropdownClick(val) {
            this.$emit('handleModule', val)
        },

        routerGo(val) {
            this.$router.push({
                name: 'library.basicInfo',
                query: {
                    schoolId: val
                },
            })
        },

        routerGoSubj(val, type) {
            if(type > 1057) {
                this.$router.push({
                    name: 'library.graduateProgramInfo',
                    query: {
                        majorId: val
                    },
                })
                return
            }
            
            this.$router.push({
                name: 'library.UndergraduateProgramInfo',
                query: {
                    majorId: val
                },
            })
        }
    }
}
</script>


