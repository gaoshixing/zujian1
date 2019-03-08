<style lang="less">
@borderColor: #73cdc9;
@themeGreen: #44bcb7;
.resource-administration {
  margin-left: 16px;
  margin-right: 16px;
  .tabs-sw{
    height: 30px;
    line-height: 29px;
    font-size: 14px;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
    &>span{
      display: inline-block;
      padding: 0 20px;
      margin: 0 6px;
      cursor: pointer;
      &.active,&:hover{
        border-bottom: 1px solid @themeGreen;
        color: @themeGreen;
      }
    }
  }
  .menulist-table {
    max-height: ~"calc(100vh - 180px)";
    overflow: auto;
    .linkbtn {
      color: #2d83bb;
      & + .linkbtn {
        margin-left: 8px;
      }
    }
    .nodata {
      padding: 40px 0;
      text-align: center;
    }
    .thead {
      color: #000;
      font-weight: bold;
      overflow: hidden;
      border-bottom: 1px solid #e5e5e5;
      [class^="item-"] {
        line-height: 40px;
      }
    }
    [class^="item-"] {
      float: left;
      min-height: 40px;
      min-width: 1%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .menu-item-lists{
      border-bottom: 1px solid #e5e5e5;
      .menu-item{
        &:first-child{
          .menu-list-item{
            border: none;
          }
        }
      }
    }
    
    .item-foldable {
      width: 2%;
      text-align: right;
      cursor: pointer;
      &:hover {
        .iconfont {
          color: #888;
        }
      }
    }
    .item-name {
      width: 20%;
    }
    .item-href {
      width: 20%;
    }
    .item-sort {
      width: 10%;
    }
    .item-visible {
      width: 6%;
    }
    .item-permission {
      width: 25%;
    }
    .item-ctrls {
      width: 17%;
    }
  }
  .search {
    margin: 10px 0;
  }
  .resourceTd .ivu-table-cell {
    white-space: nowrap;
  }
  .head {
    height: 55px;
    line-height: 55px;
    // border-bottom: 1px solid #e0e0e0;
    .t1,
    .t2,
    .headIcon {
      display: inline-block;
    }
    .set {
      float: right;
      margin-right: 20px;
    }
    .t2 {
      color: @borderColor;
    }
    .ivu-icon-chevron-right {
      margin: 0 7px;
    }
  }
  .listMsg {
    .btnlist {
      border: 1px solid #e0e0e0;
      background: #fafafa;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      position: relative;
      text-indent: 20px;
      .btnright {
        position: absolute;
        top: -1px;
        right: 20px;
      }
      button {
        height: 30px;
        border-color: transparent;
      }
      .lineSide {
        position: absolute;
        top: -1px;
        left: -1px;
        height: 40px;
        width: 5px;
        background: #43bbb6;
        border-radius: 2px 0 0 2px;
      }
      .altersort {
        border-color: #888;
        color: #000;
      }
      .savesort {
        border-color: @borderColor;
        color: @borderColor;
      }
      .bt1 {
        color: #fff;
        background: #44bcb7;
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
}
</style>
<template>
    <div class="resource-administration">
        <div class="head">
            <div class="t1" v-text="$route.meta.title"></div>
            <Icon type="chevron-right" v-if='currMenu.name'></Icon>
            <div class="t2" v-text="currMenu.name"></div>
            <div class="set" v-if="0"><i class="iconfont icon-shezhi"></i></div>
        </div>
        <div class="tabs-sw">
          <span :class="{active:isMenu}" @click="isMenu=true">菜单</span>
          <span :class="{active:!isMenu}" @click="isMenu=false">角色</span>
        </div>
        <div v-if="isMenu">
          <div class="search">
            <Input icon="search" placeholder="请输入要搜索的菜单名称" style="width: 396px" @on-click="onSearch" @on-enter="onSearch" v-model="search.text"></Input>
          </div>
          <div class="listMsg">
              <div class="btnlist">
                  <div class="lineSide"></div>
                  <span class="xx">选校-菜单</span>
                  <div class="btnright" v-if="resource_edit">
                      <Button type="ghost" class="altersort" @click="showSort" v-if="!state.issort">调整排序</Button>
                      <Button type="ghost" class="savesort" @click="saveSorted" v-else>保存排序</Button>
                      <Button @click="showAddMenu" class="bt1">添加菜单</Button>
                  </div>
              </div>
          </div>
          <div class="menulist-table">
              <div class="thead">
                  <div class="item-foldable"></div>  
                  <div class="item-name">名称</div>
                  <div class="item-href">链接</div>
                  <div class="item-sort">排序</div>
                  <div class="item-visible">可见</div>
                  <div class="item-permission">权限标识</div>
                  <div class="item-ctrls">操作</div>
              </div>
              <div class="menu-item-lists" v-if="currSubMenu.length">
                  <tabmenu-item class="menu-item" v-for="item in currSubMenu" :data="item" :key="item.id" :sortinfo="state" @onupdate="showUpdateMenu" @ondel="showDelMenu" @onaddsubmenu="showAddSubMenu" :edit="resource_edit"></tabmenu-item>
              </div>
              <div v-else class="nodata">
                  <p>暂无数据</p>
              </div>
          </div>
          <Modal v-if="resource_edit" class-name='vertical-center-modal addmodulemask' v-model="addModuleItem.visible" :title="formTitle">
              <div>
                <i-form ref="addmodule" :model="addModuleItem" :rules="addModuleItem.ruleValidate" :label-width="75">
                    <form-item label="菜单logo" prop="icon" class="uploaddiv">
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
                            :action="uploadUrl"
                            name= "avatar"
                            style="display: inline-block;width:94px;">
                            上传logo
                          </Upload>
                        <div class="tip">* 文件最大为 100KB ( .png, .jpg, .svg )</div>
                    </form-item>
                    <form-item label="背景颜色" prop="color">
                        <ColorPicker v-model="addModuleItem.color" />
                    </form-item>
                    <form-item label="名称" prop="name">
                        <i-input v-model="addModuleItem.name" placeholder="请输入菜单名称"></i-input>
                    </form-item>
                    <form-item label="上级菜单">
                        <span v-text="addModuleItem.parent.name"></span>
                    </form-item>
                    <form-item label="链接" prop="href">
                        <i-input v-model="addModuleItem.href" placeholder="请输入菜单链接"></i-input>
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
                    <form-item label="快捷菜单" prop="isQuick" v-if="!addModuleItem.issub">
                      <i-switch size="large" v-model="addModuleItem.isQuick">
                          <span slot="open">是</span>
                          <span slot="close">否</span>
                      </i-switch>
                    </form-item>
                    <form-item label="权限" prop="permission">
                        <i-input v-model="addModuleItem.permission" placeholder="控制器中定义的权限标识，如：@RequiresPermissions“权限标识”"></i-input>
                    </form-item>
                    <form-item label="描述" prop="remarks" class="last-child">
                        <i-input v-model="addModuleItem.remarks" type="textarea" placeholder="描述内容" :rows="2"></i-input>
                    </form-item>
                </i-form>
              </div>
              <div slot="footer">
                  <Button @click="addModuleClose" style="width:100px">取消</Button>
                  <Button type="primary" @click="addModuleOk" style="width:100px">确定</Button>
              </div>
          </Modal>
        </div>
        <div v-else>
          <rolemanage :appmenu="currMenu" :edit="resource_edit" :menuId='currMenu.id'></rolemanage>
        </div>
    </div>
</template>
<script>
import valid, {
  errors,
  getSubMenu,
  getMenuById,
  sortMenu,
  uploadUrl,
  addMenu,
  deleteMenu
} from "../libs/request";
import expandRow from "../modules/expandRow.vue";
import tabmenuItem from "../modules/menuItem.vue";
import rolemanage from "../modules/rolemanage.vue";
import { mapMutations,mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      currMenu: {},
      search: {
        text: ""
      },
      menuId: '',
      pageConfig:{
          pageSize:10,
      },
      currSubMenu: [],
      addModuleItem: {
        visible: false,
        update: false,
        issub: false,
        addtitle: "添加菜单",
        addsubtitle: "添加下级菜单",
        edittitle: "修改菜单",
        parent: {},

        name: "",
        icon: "",
        color:"#19be6b",
        href: "",
        sort: 0,
        permission: "",
        isShow: false,
        isQuick: false,
        remarks: "",

        ruleValidate: {
          name: [{ required: true, message: "模块名称不能为空", trigger: "blur" }],
          icon: [{ required: true, message:'请选择菜单logo' }],
          color: [{ required: true, message: '请选择背景颜色' }],
          href: [{ required: true, message: "请输入链接", trigger: "blur" }],
          sort: [{ required: true }],
          isShow: [{ required: true }],
          isQuick:[{required:true}],
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
      },
      state: {
        issort: false
      },
      isMenu:true,
    };
  },
  computed: {
    ...mapGetters('core',['resource_edit']),
    uploadUrl() {
      return uploadUrl();
    },
    formTitle() {
      if (this.addModuleItem.update) {
        return this.addModuleItem.edittitle;
      } else if (this.addModuleItem.issub) {
        return this.addModuleItem.addsubtitle;
      }
      return this.addModuleItem.addtitle;
    }
  },
  components: {
    expandRow,
    tabmenuItem,
    rolemanage
  },
  created() {
    this.initPage();
  },
  methods: {
    ...mapMutations(["updateLoadingStatus"]),
    ...mapActions('portal',['updateAside']),
    initPage() {
      let id = this.$route.query.id;
      if (!id) return;
      this.currMenu.id = id;
      this.getCurrentMenu(id);
      this.getCurrrentSubMenu(id);
      this.isMenu=true;
    },
    getCurrentMenu(id) {
      this.updateLoadingStatus({ isLoading: true });
      getMenuById(id)
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            this.currMenu = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    getCurrrentSubMenu(id) {
      this.updateLoadingStatus({ isLoading: true });
      let param = {
        "parent.id": id,
        pageSize:50
      };
      if (this.search.text) {
        param.name = this.search.text;
      }
      getSubMenu(param)
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            this.currSubMenu = res.data.data.list;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    onSearch() {
      this.getCurrrentSubMenu(this.currMenu.id);
    },
    showAddMenu() {
      this.$refs.addmodule.resetFields();
      this.addModuleItem.parent = this.currMenu;
      this.addModuleItem.visible = true;
      this.addModuleItem.update = false;
      this.addModuleItem.issub = false;
    },
    showAddSubMenu(item) {
      this.$refs.addmodule.resetFields();
      this.addModuleItem.parent = item;
      this.addModuleItem.visible = true;
      this.addModuleItem.update = false;
      this.addModuleItem.issub = true;
    },
    showUpdateMenu(item) {
      this.$refs.addmodule.resetFields();
      this.addModuleItem.visible = true;
      this.addModuleItem.update = item;
      this.addModuleItem.issub = false;

      this.addModuleItem.parent = this.currMenu;
      this.addModuleItem.icon = item.icon;
      this.addModuleItem.color = item.colour;
      this.addModuleItem.name = item.name;
      this.addModuleItem.href = item.href;
      this.addModuleItem.sort = item.sort;
      this.addModuleItem.isShow = item.isShow == "1" ? true : false;
      this.addModuleItem.isQuick = item.isQuick == '1'? true: false;
      this.addModuleItem.permission = item.permission;
      this.addModuleItem.remarks = item.remarks;
    },
    showDelMenu(item) {
      let id = item.id;
      this.$Modal.confirm({
        title: "删除资源",
        content: "您确定要删除所选内容吗？删除后将无法恢复",
        onOk: () => {
          this.updateLoadingStatus({ isLoading: true });
          deleteMenu(id)
            .then(valid.call(this))
            .then(res => {
              if (res.ok) {
                this.getCurrrentSubMenu(this.currMenu.id);
              }
            })
            .catch(errors.call(this))
            .finally(() => {
              this.updateLoadingStatus({ isLoading: false });
            });
        }
      });
    },
    addModuleClose() {
      this.addModuleItem.visible = false;
    },
    addModuleOk() {
      this.$refs.addmodule.validate(vad => {
        if (vad) {
          let info = {
            icon: this.addModuleItem.icon,
            colour: this.addModuleItem.color,
            name: this.addModuleItem.name,
            remarks: this.addModuleItem.remarks,
            sort: this.addModuleItem.sort,
            href: this.addModuleItem.href,
            permission: this.addModuleItem.permission,
            isShow: this.addModuleItem.isShow ? 1:0,
            isQuick: this.addModuleItem.isQuick? 1:0
          };
          if (this.addModuleItem.update) {
            info.id = this.addModuleItem.update.id;
          } else {
            info["parent.id"] = this.addModuleItem.parent.id;
          }
          if(this.addModuleItem.issub){
            info.isQuick = 0;
          }
          this.updateLoadingStatus({ isLoading: true });
          addMenu(info)
            .then(valid.call(this))
            .then(res => {
              if (res.ok) {
                this.addModuleClose();
                this.getCurrrentSubMenu(this.currMenu.id);
                this.updateAside();
              }
            })
            .catch(errors.call(this))
            .finally(() => {
              this.updateLoadingStatus({ isLoading: false });
            });
        }
      });
    },
    showSort() {
      this.state.issort = true;
    },
    saveSorted() {
      this.state.issort = false;
      let menuList = [];
      this.currSubMenu.forEach(item => {
        menuList.push({ id: item.id, sort: item.sort });
      });
      this.updateLoadingStatus({ isLoading: true });
      sortMenu(JSON.stringify(menuList))
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            this.getCurrrentSubMenu(this.currMenu.id);
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    handleSuccess(data) {
      if (data.status == "success") {
        this.addModuleItem.icon = data.data.filePath;
      } else {
        this.$Message.error(data.message);
      }
    },
    handleFormatError() {
      this.$Message.error("需使用jpg、jpeg、png、svg格式图片");
    },
    handleMaxSize() {
      this.$Message.error("图标大小不能超过100KB");
    }
  },
  watch: {
    "$route.query.id"() {
      this.initPage();
    }
  }
};
</script>