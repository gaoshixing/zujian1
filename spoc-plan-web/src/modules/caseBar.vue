<style lang="less" scoped>
.analyseBar {
    line-height: 14px;
    font-size: 12px;
    margin-top: 5px;
    .title {
        padding: 5px 0;
        display: inline-block;
        margin-right:15px;
        margin-bottom: 5px;
        width: 60px;
        text-align: right;
        color: #b8b8b8;
    }
    .titleBar {
        padding: 5px 12px;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 5px;
        display: inline-block;
        &.active {
            background-color: #44bcb6;
            color: white;
        }
    }
    .titleBarWithAutoHeight {
        overflow: hidden;
        .tagTitle{
            float:left;
            width:78.5px;
        }
        .tagItem{
            float:left;
            overflow:hidden;
            width:80%;
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
</style>
<template>
    <div class="analyseBar">
        <div class="titleBarWithAutoHeight" v-if="typeKind=='man'">
            <div class="tagTitle">
                <span class="title">{{title}}：</span>
            </div>
            <div class="tagItem" :style="{height:tagList.length>20 && listfold?'30px':''}"> 
                <span class="titleBar"
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
        <div v-if="typeKind=='group'">
            <p>
                <span class="title" >{{title}}：</span>
                <span class="titleBar"
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitveGroup(index, item.id)">
                    {{item.name}}</span>
            </p>
        </div>
        <div v-if="typeKind=='controlled'">
            <p>
                <span class="title" >{{title}}：</span>
                <span class="titleBar"
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitveCon(index, item.id)">
                    {{item.companyName}}</span>
            </p>
        </div>
        <div v-if="typeKind=='remarks'">
            <p>
                <span class="title" >{{title}}：</span>
                <span class="titleBar"
                    v-for="(item, index) in tagList"
                    :key="index"
                    :class="{active:num === index}" 
                    @click="addAcitveCon(index, item.id)">
                    {{item.remarks}}</span>
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
            this.$emit('addAcitve', {id:id,index:index});
        },

        addAcitveGroup(index, id) {
            this.$emit('addAcitveGroup', {id:id,index:index});
        },

        addAcitveCon(index, id) {
            this.$emit('addAcitveCon', {id:id,index:index});
        }
	}
};
</script>


