<style lang="less">
    .signAllTagManage {
        p {
            margin-top: 0;
            font-size: 12px;
            line-height: 32px;
            i {
                font-style: normal;
                width: 60px;
                display: inline-block;
                text-align: right;
                color: #b8b8b8;
                margin-right: 15px;
            }

            span {
                margin-right: 10px;
                cursor: pointer;
                padding: 4px 8px;
                .inside {
                    display: inline-block;
                    min-width: 60px;
                    position: relative; 
                    padding: 0 15px;
                    text-align: center;
                }

            }
            .active {
                color: #fff;
                background-color: #44bcb6;
            }
        }
    }
</style>

<template>
    <div v-if="signList.length" class="signAllTagManage"> 
        <p v-for="(item,index) in signList" :key="index">
            <i>{{item.title}}：</i><span v-for="(child, index) in item.children" :class="{active:arrId.indexOf(child.id)!=-1}"  @click="clickEvent( child, item, index)" class="inside">
                {{child.title}}
            </span>
        </p>
    </div>
</template>

<script>
//  
import valid, { errors, SIGNTAGMANAGE } from "../../../libs/request";
export default {
    props: {
        arrIds: {
            type: Array,
            default: function () {
                return []
            }
        }
    },

    data (){
		return {
            signList: [],
            tagId: [],
            obj: {
              id: '',
              tag: []  
            }
		}
    },

    computed: {
		arrId() {
			return this.arrIds
        }		
    },
    
    mounted() {
        this.getSignTagBuildTree()
    },

	methods:{
        getSignTagBuildTree() {
            SIGNTAGMANAGE.signTagBuildTree().then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.signList = res.data.data.children
                    res.data.data.children.forEach((item, key) => {
                      // this.selectArr[key]=item.id
                      // console.log(this.selectArr)
                    })
                } 
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        clickEvent(child, item, index) {
            child.checked=!child.checked
            this.addActive(child)
            let obj = []
            this.signList.forEach((item, key1) => {
                obj[key1] = {}
                obj[key1].id = item.id
                obj[key1].childTags = []
                item.children.forEach((item, key) => {
                    if(item.checked) {
                        obj[key1].childTags.push({'id':item.id})
                    }
                })
            })
            
            for(let i = 0; i < obj.length; i++) {
                if(!obj[i].childTags.length) {
                    obj.splice(i, 1)
                    i--
                }
            }
           
            this.getAllTages(obj)
        },

        addActive(child) {
            if(this.arrId.includes(child.id)) {
				var index = this.arrId.indexOf(child.id);
				this.arrId.splice(index, 1);
			}else {
				this.arrId.push(child.id)
            }
        },

        getAllTages(obj) {
			this.$emit('on-select-item', obj);
		},
	}
};
</script>

