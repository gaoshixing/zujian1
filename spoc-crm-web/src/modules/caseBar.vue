<style lang="less" scoped>
.analyseBar {
    line-height: 32px;
    .titleBar {
        font-size: 12px;
        span {
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 10px;
        }
        span:first-child {
            cursor: auto;
            color: #b8b8b8;
            padding: 0;
            margin-right: 15px;
        }
        .active {
            background-color: #44bcb6;
            color: white;
            user-select: none;
        }
        .titleC {
            display: inline-block;
            margin-right:15px;
            width: 60px;
            text-align: right;
        }
    }
    .titleBarWithAutoHeight {
        font-size: 12px;
        span {
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 10px;
        }
        .active {
            background-color: #44bcb6;
            color: white;
        }
        .titleC {
            display: inline-block;
            margin-right:15px;
            width: 60px;
            text-align: right;
        }
        .tagsContent{
            overflow: hidden;
            .tagTitle{
                float:left;
                width:78.5px;
                 span:first-child {
                    cursor: auto;
                    color: #b8b8b8;
                    padding: 0;
                    margin-right: 15px;
                }
            }
            .tagItem{
                float:left;
                overflow:hidden;
                width:80%;
                span {
                    padding: 5px 10px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                .active {
                    background-color: #44bcb6;
                    color: white;
                }
            }
            .tagButton{
                float:left;
                width:50px;
                span{
                    padding: 0;
                }
                .foldbtn{
                    color: #44bcb7;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
<template>
    <div class="analyseBar">
        <div class="titleBarWithAutoHeight" v-if="typeKind=='man'">
            <div class="tagsContent">
                <div class="tagTitle">
                    <span class="titleC" >{{title}}：</span>
                </div>
                <div class="tagItem" :style="{height:tagList.length>20 && listfold?'30px':''}"> 
                    <span  
                        v-for="(item, index) in tagList"
                        :key="index"
                        :class="{active:num === index}" 
                        @click="addAcitve(index, item.userId)">
                        {{item.userName}} {{item.num}}
                    </span>
                </div>
                <div class="tagButton">
                     <a href="javascript:void(0)"><span v-if="tagList.length>20" :class="{'foldbtn':1,'folded':listfold}" @click="listfold=!listfold">{{listfold?'展开':'收起'}}</span></a>
                </div>
            </div>
        </div>
        <div class="titleBar" v-if="typeKind=='group'">
            <p>
                <span class="titleC" >{{title}}：</span>
                <span  
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitveGroup(index, item.id)">
                    {{item.name}}
                </span>
            </p>
        </div>
        <div class="titleBar" v-if="typeKind=='controlled'">
            <p>
                <span class="titleC" >{{title}}：</span>
                <span  
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitveCon(index, item.id)">
                    {{item.companyName}}
                </span>
            </p>
        </div>
     </div>
</template>
<script>
export default {
  	props: {
		title: {
			type: String,
			default: '中方顾问'
        },
        
        typeKind: {
            type: String,
			default: 'man'
        },

		tagList: {
			type: Array,
			default: function() {
				return [];
			}
        },
        num: {
            type: Number,
			default: 0
        },
  	},
  	data() {
		return {
            listfold:true
        };
  	},
	methods: {
		addAcitve(index, id) {
            //this.num = index
            this.$emit('addAcitve', {id:id,index:index});
        },

        addAcitveGroup(index, id) {
            //this.num = index
            this.$emit('addAcitveGroup', {id:id,index:index});
        },

        addAcitveCon(index, id) {
            //this.num = index
            this.$emit('addAcitveCon', {id:id,index:index});
        }
	}
};
</script>


