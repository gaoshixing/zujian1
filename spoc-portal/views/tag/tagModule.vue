<style lang='less'>
    .moduleGSX{
        .boxGsx{  
            width: 100%;  
            height: 100%;  
            list-style: none;  
            position: relative;
            .tagText {
                display: inline-block;
                width: 80px;
                overflow: hidden;
                text-align: left;
            }
            .active{  
                background: #44bcb7;
                color: #fff;
            }
            li {
                display: inline-block;
                margin-left: 10px;
                width: 120px;
                height: 34px;
                margin-top: 10px;
            }  
        }
    }
</style>

<template>
    <div class="moduleGSX">
        <ul ref="oBox" class="boxGsx">  
            <li v-for="(item, index) in littleTag" :key="index" @dragenter="handleDragEnter($event,item)"  draggable="true"  @dragend.prevent="handleDragEnd($event,item)">
                <Button style="height:34px;" type="ghost">
					<span class="tagText">{{item.title}}</span>
                    <Dropdown transfer @on-click='selectChange' >
                        <a href="javascript:void(0)">
                            <Icon style="" type="chevron-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="item.title+'|'+item.id+'|'+0">修改名称</DropdownItem>
                            <DropdownItem v-if="item.isSys !=1" :name="item.title+'|'+item.id+'|'+1">删除标签</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
				</Button>
            </li>  
        </ul>
        <Modal
            v-model="modal2"
            width=728
            :title="TagName"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div v-if="TagName === '修改标签'">
                <span style="float:left; line-height: 30px">标签名字：</span>
                <div style="margin-left: 60px">
                    <Input v-model="tagAddName" style="width: 100%"></Input>
                </div>
            </div>
            <div v-else>
                <p style="text-align: center">确定删除 <span style="color:red; font-size: 16px">{{parentTagName}} </span>吗?</p>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    props: {
        littleTag: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    
    data() {
        return {
            parentTagName: '',
            parentId: '',
            pTagName: '',
            tagId: '',
            oBoxWidth: '',
            modal2: false,
            TagName: '',
            tagAddName: '',
            state: {
                item: {},
                dragHoverItem: {}
            },
        }
    },

    mounted() {
    },

    methods: {
        selectChange(val) {
            val = val.split('|')
            this.parentTagName = this.tagAddName = val[0]
            this.parentId = val[1]
            this.TagName = val[2] == '0' ? '修改标签' : '删除标签'
            this.modal2 = true;
        },

        handleDragEnter(e, item) {
            this.state.dragHoverItem = item
        },

        handleDragEnd(e, item) {
            let resList = this.littleTag.concat([]);
            let index = this.getItemIndex(resList, this.state.dragHoverItem);
            let rindex = this.getItemIndex(resList, item);
            resList.splice(rindex, 1);
            resList.splice(index, 0, item);
            let menuList = [];
            resList.forEach((item, i) => {
                menuList.push({ id: item.id, sort: i+1 });
            });
            this.$emit('sortTag', menuList)
        },

        getItemIndex(arr,item) {
            for(let i in arr){
                if(arr[i].id==item.id){
                    return i;
                }
            }
            return -1;
        },

        ok1() {
            if(this.TagName == '修改标签') {
                this.$emit('upTagName', [this.parentId, this.tagAddName]) 
                this.tagAddName = ''
                return
            }
            this.$emit('deleteTag',[this.parentId] )
            
            // this.$Message.info('Clicked ok');
        },

        cancel1() {
            this.tagAddName = ''
            // this.$Message.info('Clicked cancel');
        },
    }
}
</script>

