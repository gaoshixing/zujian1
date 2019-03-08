<style lang="less">
@themeGreen: #44bcb7;

.leftMenu {
  .popmenu {
    position: absolute;
    top: 0;
    right: -190px;
    width: 230px;
    background-color: #fff;
    box-shadow: 0 0 9px rgba(200, 200, 200, 0.5);
    padding: 1.8em 0;
    z-index: 80;
    ul {
      & > li {
        text-indent: 2em;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          background-color: #e6e6e6;
        }
      }
    }
  }
  .main-re-item {
    padding: 0 15px;
    .name {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .iconfont {
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      &:hover {
        color: #000;
      }
    }
  }
  .res-list {
    .res-item {
      height: 46px;
      line-height: 46px;
      cursor: pointer;
      overflow: hidden;
      &:hover,
      &.active {
        background-color: #fff;
      }
      &:hover {
        .img-caozuo {
          display: block;
        }
        .fav{
          display: inline-block;
        }
      }
      .fav{
        color: #000;
        display: none;
        &.icon-biaoqian2{
          color: #44bcb7;
          display: inline-block;
        }
      }
      .icon {
        display: block;
        float: left;
        width: 50px;
        height: 46px;
        padding-left: 15px;
        &-img {
          width: 24px;
          height: 24px;
          display: inline-block;
          vertical-align: middle;
          padding: 3px;
        }
      }
      .name {
        display: block;
        float: left;
        font-size: 12px;
        width: 126px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .reswrapper {
    .img-caozuo {
      background: url("../assets/svg/leftmenu/dots.svg") no-repeat left center;
      width: 20px;
      height: 46px;
      float: right;
      background-size: contain;
      margin-right: 10px;
      display: none;
    }
  }
  .tabs {
    margin: 15px;
    height: 26px;
    border: 1px solid @themeGreen;
    border-radius: 4px;
    .itemone {
      float: left;
      width: 33.33%;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
      &.active {
        color: @themeGreen;
      }
      & + .itemone {
        border-left: 1px solid @themeGreen;
      }
    }
    &.noshow {
      visibility: hidden;
      margin: 0;
    }
  }
}
.addmodulemask {
  .module-icon {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    display: inline-block;
    margin-right: 20px;
    background-color: #f1f1f1;
    margin-top: -2px;
  }
  .uploaddiv {
    height: 80px;
    label {
      margin-top: 54px;
    }
    .ivu-upload {
      transform: translate(0, -10px);
    }
    .tip {
      transform: translate(-100px, 0);
      display: inline-block;
    }
    .ivu-form-item-error-tip{
      padding-top: 0;
    }
  }
  .ivu-upload {
    border: none;
    color: #fff;
    background-color: transparent;
    border-radius: 5px;
    height: 28px;
    line-height: 28px;
    .ivu-upload-drag {
      background-color: @themeGreen;
      top: -5px;
    }
  }
}
</style>
<template>
<div class="leftMenu">
    <user-banner :info="userInfo"></user-banner>
    <div class="main-re-item">
        <div>
            <span class="name">资源管理</span>
            <i class="iconfont icon-tianjiajigou" @click.stop="addRes" v-if="resource_edit"></i>
        </div>
    </div>
    <div class="tabs noshow">
    </div>
    <div class="item-wrapper reswrapper" ref="scrollWrap">
        <ul class="res-list">
            <li v-for="item in appMenuList" :key="item.id" class="res-item" @click="resClick(item)" :class="{active:state.item.id==item.id}" draggable="true" @dragenter="handleDragEnter($event,item)" @dragend.prevent="handleDragEnd($event,item)">
                <i class="icon">
                    <img v-if="item.icon" :src="item.icon" class="icon-img" :style="{backgroundColor:item.colour}">
                </i>
                <span class="name" v-text="item.name"></span>

                <i class="iconfont" v-if="item.isQuick=='1'"></i>
                <i class="iconfont fav" v-else :class="{'icon-biaoqian2':item.isFav,'icon-biaoqian3':!item.isFav}" @click.stop="addFav(item)"></i>

                <i class="img-caozuo" @click.stop="showPopMenu($event,item)" v-if="resource_edit"></i>
            </li>
        </ul>
        <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="resource_edit">
            <ul>
                <li @click.stop="modify">修改</li>
                <li @click.stop="delres">删除</li>
            </ul>
        </div>
    </div>
    <Modal v-if="resource_edit" class-name="vertical-center-modal addmodulemask" v-model="addModuleItem.show" :title="addModuleItem.add?addModuleItem.addtitle:addModuleItem.edittitle">
        <div>
            <i-form ref="addmodule" :model="addModuleItem" :rules="addModuleItem.ruleValidate" :label-width="75">
            <form-item label="应用logo" prop="icon" class="uploaddiv">
                <i-input v-model="addModuleItem.icon" v-show="false"></i-input>
                <img :src="addModuleItem.icon" alt="" class="module-icon">
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png','svg']"
                    :max-size="100"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="uploadurl"
                    name= "avatar"
                    style="display: inline-block;width:94px;">
                    上传logo
                  </Upload>
                <div class="tip">* 文件最大为 100KB ( .png, .jpg )</div>
            </form-item>
            <form-item label="背景颜色" prop="color">
                 <ColorPicker v-model="addModuleItem.color" />
            </form-item>

            <form-item label="应用名称" prop="name">
                <i-input v-model="addModuleItem.name" placeholder="请输入十个字以内应用名称"></i-input>
            </form-item>
            <form-item label="应用地址" prop="href">
                <i-input v-model="addModuleItem.href" placeholder="在后台该应用的跳转地址"></i-input>
            </form-item>
            <form-item label="排序" prop="sort">
                <InputNumber v-model="addModuleItem.sort"></InputNumber>
            </form-item>
            <form-item label="状态" prop="isShow">
                <i-switch size="large" v-model="addModuleItem.isShow">
                    <span slot="open">显示</span>
                    <span slot="close">隐藏</span>
                </i-switch>
            </form-item>
            <form-item label="是否免审" prop="checkFlag" v-if="addModuleItem.checkFlag">
	            <RadioGroup v-model="addModuleItem.checkFlag">
	                <Radio label="1">是</Radio>
	                <Radio label="0">否</Radio>
	            </RadioGroup>
            </form-item>
            <form-item label="快捷菜单" prop="isQuick">
              <i-switch size="large" v-model="addModuleItem.isQuick">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
              </i-switch>
            </form-item>
            <form-item label="权限">
                <i-input v-model="addModuleItem.permission" placeholder="控制器中定义的权限标识，如：@RequiresPermissions“权限标识”"></i-input>
            </form-item>
            <form-item label="功能介绍" prop="remarks" class="last-child">
                <i-input v-model="addModuleItem.remarks" type="textarea" placeholder="请输入功能介绍" :rows="2" ></i-input>
            </form-item>
            </i-form>
        </div>
        <div slot="footer">
            <Button @click="addModuleClose" style="width:100px">取消</Button>
            <Button type="primary" @click="addModuleOk" style="width:100px">确定</Button>
        </div>
            
    </Modal>

</div>
</template>
<script>
import userBanner from "@/common/userBanner";
import { mapState,mapMutations,mapGetters } from "vuex";
import valid, {
  errors,
  saveResItem,
  uploadUrl,
  delRes,
  getResItemInfo,
  sortMenu,
  saveQuickMenu,
} from "../libs/request";
import { getItemIndex } from "../libs/util.js";

export default {
  data() {
    return {
      isready:false,
      state: {
        menuitem: {},
        item: {
          id: this.$route.query.id
        },
        dragHoverItem: {}
      },
      menu: {
        show: false,
        top: 0
      },
      addModuleItem: {
        show: false,
        add: true,
        addtitle: "添加应用",
        edittitle: "设置应用",
        name: "",
        href: "",
        color: "#19be6b",
        permission:"",
        icon: "",
        sort: 0,
        isShow: true,
        isQuick: false,
        remarks: "",
        checkFlag:"",
        ruleValidate: {
          name: [
            { required: true, message: "应用名称不能为空", trigger: "blur" },
            {
              required: true,
              pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,
              message: "最大10个汉字或20个字母，不能有特殊字符",
              trigger: "blur"
            }
          ],
          icon: [{ required: true, message: "图标必须上传" }],
          color: [{ required: true, message: '请选择背景颜色' }],
          href: [{ required: true, message: "应用地址不能为空" }],
          checkFlag: [{ required: true, message: "是否免审不能为空" }], 
          sort: [{ required: true }],
          isShow: [{ required: true }],
          remarks: [
            {
              required: false,
              type: "string",
              max: 100,
              message: "描述最大100个字符",
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapState(['userInfo','asideApp','appMenuList']),
    ...mapGetters('core',['resource_edit']),
    uploadurl() {
      return uploadUrl();
    },
  },
  components: {
    userBanner
  },
  created() {
    this.$watch('appMenuList',this.menuListReady,{immediate:true});
  },
  mounted() {
    document.addEventListener("click", this.hideMenu, false);
    this.$refs.scrollWrap.addEventListener("scroll", this.hideMenu);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideMenu);
    this.$refs.scrollWrap.removeEventListener("scroll", this.hideMenu);
  },
  methods: {
    update(payload) {},
    hideMenu() {
      this.menu.show = false;
    },
    menuListReady(){
      if(!this.isready && this.appMenuList.length>0){
        if(!this.state.item.id){
          this.resClick(this.appMenuList[0]);
          this.isready = true;
        }
      }
    },
    addRes() {
      this.$refs.addmodule.resetFields();
      this.addModuleItem.show = true;
      this.addModuleItem.add = true;
    },
    resClick(item) {
      this.state.item = item;
      this.$router.push({ name: "core.resource", query: { id: item.id } });
    },
    addModuleClose() {
      this.addModuleItem.show = false;
      this.$refs.addmodule.resetFields();
    },
    addModuleOk() {
      this.$refs.addmodule.validate(validok => {
        if (validok) {
          let info = {
            name: this.addModuleItem.name,
            colour: this.addModuleItem.color,
            href: this.addModuleItem.href,
            remarks: this.addModuleItem.remarks,
            permission: this.addModuleItem.permission,
            icon: this.addModuleItem.icon,
            sort: this.addModuleItem.sort,
            isShow: this.addModuleItem.isShow ? 1 : 0,
            isQuick: this.addModuleItem.isQuick? 1:0 , 
            "parent.id": 0
          };
          if (!this.addModuleItem.add) {
            info.id = this.state.menuitem.id;
          }
          if(this.addModuleItem.checkFlag){
            info.checkFlag = this.addModuleItem.checkFlag;
          }
          saveResItem(info)
            .then(valid.call(this))
            .then(res => {
              if (res.ok) {
                this.addModuleClose();
                this.$store.dispatch('portal/updateAppMenu');
              }
            })
            .catch(errors.call(this));
        }
      });
    },
    handleSuccess(data) {
      if (data.status == "success") {
        this.addModuleItem.icon = data.data.filePath;
      } else {
        this.$Message.error(data.message);
      }
      console.info(data);
    },
    handleFormatError() {
      this.$Message.error("需使用jpg、jpeg、png、svg格式图片");
    },
    handleMaxSize() {
      this.$Message.error("图标大小不能超过100KB");
    },
    showPopMenu(e, item) {
      this.state.menuitem = item;
      let top = e.pageY;
      if (document.body.offsetHeight - top < 120) {
        top = top - 120;
      }
      this.menu = {
        top: `${top + 15}px`,
        show: true
      };
    },
    modify() {
      this.$refs.addmodule.resetFields();
      this.menu.show = false;
      this.addModuleItem.add = false;
      this.addModuleItem.show = true;
      getResItemInfo(this.state.menuitem.id)
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            let d = res.data.data;
            this.addModuleItem.name = d.name;
            this.addModuleItem.remarks = d.remarks;
            this.addModuleItem.icon = d.icon;
            this.addModuleItem.isShow = d.isShow == '1' ? true : false;
            this.addModuleItem.isQuick = d.isQuick == '1'? true: false;
            this.addModuleItem.sort = d.sort;
            this.addModuleItem.color = d.colour;
            this.addModuleItem.href = d.href;
            this.addModuleItem.permission = d.permission;
            this.addModuleItem.checkFlag = d.checkFlag;
          }
        })
        .catch(errors.call(this));
    },
    delres() {
      this.menu.show = false;
      this.$Modal.confirm({
        title: "删除模块",
        content: "您确定要删除所选内容吗？删除后将无法恢复",
        onOk: () => {
          this.delresOk(this.state.menuitem.id);
        }
      });
    },
    delresOk(id) {
      delRes(id)
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            this.$store.dispatch('portal/updateAppMenu');
          }
        })
        .catch(errors.call(this));
    },
    handleDragEnter(e, item) {
      this.state.dragHoverItem = item;
    },
    handleDragEnd(e, item) {
      let resList = this.appMenuList.concat([]);
      let index = getItemIndex(resList, this.state.dragHoverItem);
      let rindex = getItemIndex(resList, item);
      resList.splice(rindex, 1);
      resList.splice(index, 0, item);

      let menuList = [];
      resList.forEach((item, i) => {
        menuList.push({ id: item.id, sort: i });
      });
      sortMenu(JSON.stringify(menuList))
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            this.$store.dispatch('portal/updateAppMenu');
          }
        })
        .catch(errors.call(this));
    },
    addFav(item){
      saveQuickMenu(item.id,item.isFav?'0':'1').then(valid.call(this)).then(res=>{
        if(res.ok){
          this.$store.dispatch('portal/updateAppMenu');
          this.$store.dispatch('portal/updateAside');
        }
      }).catch(errors.call(this));
    }
  }
};
</script>



