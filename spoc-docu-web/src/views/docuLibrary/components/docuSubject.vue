<style lang="less">
    .docuSubjectGSX {
        .content {
            border-top: 1px solid #e5e5e5;
            padding: 20px 0;
            .title {
                .handle {
                    float: right;
                    margin-top: 10px;
                }
                b {
                    color: #44b8b8;
                    font-size: 18px;
                    font-weight: 400;
                }
            }
            .inform {
                .informUl {
                    li {
                        list-style: none;
                        line-height: 26px;
                        .loadMore {
                            margin-left: 30px;
                            cursor: pointer;
                            color: #68b4b4;
                        }
                        >span {
                            color: #c3c3c3;
                            margin-right: 10px;
                            display: inline-block;
                            width: 90px;
                            text-align: right;
                        }
                    }
                    
                }
            }
            
        }
    }
</style>

<template>
    <div class="docuSubjectGSX" v-if="dataList">
        <div class="content" v-for="(item, index) in dataList" :key="index">
            <div class="title">
                <b>{{item.schoolName}}</b>
                <Dropdown class="handle" @on-click="dropdownClick">
                    <span style="color:#44bcbc" class="iconfont icon-caozuo"></span>
                    <DropdownMenu slot="list" style="text-align:center">
                        <DropdownItem :name='"edit|"+item.id+"|"+index'>编辑</DropdownItem>
                        <DropdownItem v-if="item.num" :name='"dele|"+item.id+"|"+index'>删除</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button @click="routerGo(item.id, item.schoolId)" type="primary" style="float:right; margin-right:96px">
                    题目管理
                </Button> 
            </div>
            <div class="inform">
                <ul class="informUl">
                    <li><span>申请阶段：</span>{{item.phase == 0 ? '中学' : item.phase == 1 ? '本科': '研究生'}}</li>
                     <li v-if="item.majorName"><span>专业项目：</span><a @click="routerGoSubj(item.schoolMajorId, item.phase)">{{item.majorName}}</a></li>
                    <li><span>入学季：</span>{{item.applyTime}}</li>

                    <li><span>题目数量：</span>{{item.num}}</li>
                    <li v-if="item.docs">
                        <span>相关文书范本：</span>{{item.docs.length}}
                        <span v-if="item.docs.length >= 3" class="loadMore" @click="loadMore(index)">
                            {{item.flag ? '收起' : '展开'}}
                        </span>
                         <ul v-else style="margin-left:50px"> 
                            <li v-for="(item1, index) in item.docs" :key="index">
                                <a>{{item1.NAME}}</a>
                            </li>
                        </ul>
                        <ul v-if="item.flag&&item.docs" style="margin-left:50px"> 
                            <li v-for="(item1, index) in item.docs" :key="index">
                                <a>{{item1.NAME}}</a>
                            </li>
                        </ul>
                    </li>
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
            this.$emit('handleModule1', val, )
        },

        routerGo(id, schoolId) {
            this.$router.push({
                name: 'docu.docuSubManage',
                query: {
                    id: id,
                    scId: schoolId,
                }
            })
        },

        loadMore(index) {
            this.dataList[index].flag = !this.dataList[index].flag
        },

        routerGoSubj(val, type) {
            if(type > 1) {
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


