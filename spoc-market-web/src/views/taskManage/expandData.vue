<template>
    <div class="expand-detail-boss">
        <div class="modal-img-containers" id="imgContent" style="position:absolute; top: -99999px;">
            <img :src="picture" alt="">
            <div id="qrcodes" ref="qrcodes" :style=" {'left': getedInfo && getedInfo.axisX, 'top': getedInfo && getedInfo.axisY}"></div>
        </div>
        <expandTop
            :use="use"
            :from="from"
            :code='getedInfo && getedInfo.code'
            :title='getedInfo && getedInfo.title'
            :date='getedInfo && getedInfo.endTime'
            :downloadPost='lastImage'
            :imgId="getedInfo && getedInfo.imageId"
            :expandId="expandId"
            @onclickButton2="onclickButton2"
            @onclickButton3="onclickButton3">
        </expandTop>
        <Table :columns="tableColumnsTask" :data="tableDataTask1" class="common-table" style="margin-bottom: 30px;"></Table>
        <p style="font-size: 14px; margin-top: 10px;">成功推广订单数：<span style="color: #44bcb7">{{pageTotal}}</span></p>
        <Table :columns="tableColumnsData" :data="tableDataData" class="common-table"></Table>
        <Page 
			class="common-paging" 
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
        <Modal
            v-model="showSharLink"
            title="分享链接"
            ok-text="关闭"
            width= 730
            class="expand-modal-share-link"
            @on-ok="onclickshareLinkClose"
            @on-cancel="onclickshareLinkClose">
            <p>链接地址：</p>
            <a :href="url" target="_Blank">{{this.url}}</a><br>
            <p>链接二维码：（请用微信扫描下方二维码）</p>
            <div id="qrcode" ref="qrcode" style="width: 150px; height: 150px;"></div>
            <div class="common-button share-link-btn" @click='onclickshareLinkClose'>关闭</div>
        </Modal>
        <Modal
            v-model="modalImpeach"
            :title=modalImpeachTitle
            ref="refModalImpeach"
            @on-ok="onclickModalImpeachOk"
            @on-cancel="onclickModalImpeachCancel">
            <Input v-if = '!impeachHistory' v-model="impeachReason" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="请输入存疑情况"></Input>
            <p  v-if='impeachHistory'>{{impeachHistoryText}}</p>
        </Modal>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { mapMutations, } from 'vuex';
import html2canvas from 'html2canvas';
import expandTop from '../../modules/expandTop';
import valid, { errors, sys, common, wpExpand, wpTask, orderM, } from '../../libs/request.js';
import { mapState, } from 'vuex';
export default {
    name: 'ExpandDetail',
    components: {
        expandTop,
    },
    data() {
        return {
            use: true,
            from: null, // 0 购买  1 拼团 2 报名 3 阅读
            id: null,
            getedInfo: null,
            picture: null,
            showSharLink: false,
            lastImage: null,
            appId: null,
            types: null,
            pageNo: 1,
            pageTotal: 0,
            pageSize: 10,
            url: 'http://ewechattest.ivygate.cn/index.html',
            tableColumnsTask: [
                {
                    title: '推广时间',
                    key: 'createDate',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '推广类型',
                    key: 'userTypeName',
                    align: 'center',
                },
                {
                    title: '推广人员姓名',
                    key: 'openName',
                    align: 'center',
                },
                {
                    title: '推广人员手机',
                    key: 'openPhone',
                    align: 'center',
                },
                {
                    title: '分享方式',
                    key: 'createType',
                    align: 'center',
                    render: (h, params) => {
                        const text = params.row.createType === '0' ? '分享链接' : '分享海报';
                        return h('span', text);
                    },
                },
                {
                    title: '推广点击量',
                    key: 'clickNum',
                    align: 'center',
                },
                {
                    title: '成功推广数',
                    key: 'successNum',
                    align: 'center',
                },
            ],
            tableDataTask1: [],
            tableColumnsData: [],
            tableColumnsData0: [
                { title: '推广订单号', key: 'orderCode', align: 'center', },
                { title: '支付时间', key: 'createDate', align: 'center', },
                { title: '用户昵称', key: 'name', align: 'center', },
                { title: '手机号', key: 'phone', align: 'center', },
                { title: '上报状态', key: 'isReport', align: 'center', 
                  render: (h, params) => {
                      const text = params.row.isReport === '0' ? '未上报' : '已上报';
                      return h('span', text);
                  },
                },
                { title: '用户已签合同', key: 'isSign', align: 'center', },
                { title: '返利状态', key: 'isRebate', align: 'center',
                  render: (h, params) => {
                      const text = params.row.isRebate === '0' ? '未返利' : '已返利';
                      return h('span', text);
                  },
                },
                { title: '数据状态', key: 'doubtStatus', align: 'center',
                  render: (h, params) => {
                      const text = params.row.doubtStatus === '0' ? '正常' : '存疑';
                      return h('span', text);
                  },
                },
            ],
            tableColumnsData1: [
                { title: '推广拼团订单号', key: 'orderCode', align: 'center', },
                { title: '支付时间', key: 'createDate', align: 'center', },
                { title: '用户昵称', key: 'name', align: 'center', },
                { title: '手机号', key: 'phone', align: 'center', },
                { title: '上报状态', key: 'isReport', align: 'center', 
                  render: (h, params) => {
                      const text = params.row.isReport === '0' ? '未上报' : '已上报';
                      return h('span', text);
                  },
                },
                { title: '用户已签合同', key: 'isSign', align: 'center', },
                { title: '返利状态', key: 'isRebate', align: 'center',
                  render: (h, params) => {
                      const text = params.row.isRebate === '0' ? '未返利' : '已返利';
                      return h('span', text);
                  },
                },
                { title: '数据状态', key: 'doubtStatus', align: 'center',
                  render: (h, params) => {
                      const text = params.row.doubtStatus === '0' ? '正常' : '存疑';
                      return h('span', text);
                  },
                },
            ],
            tableColumnsData2: [
                { title: '表单数据收集编号', key: 'dataId', align: 'center', minWidth: 100,},
                { title: '收到表单时间', key: 'createDate', align: 'center', },
                { title: '用户昵称', key: 'name', align: 'center', },
                { title: '手机号', key: 'phone', align: 'center', },
                { title: '上报状态', key: 'isRebate', align: 'center', 
                  render: (h, params) => {
                      const text = params.row.isReport === '0' ? '未上报' : '已上报';
                      return h('span', text);
                  },
                },
                { title: '用户已签合同', key: 'isSign', align: 'center', },
                { title: '返利状态', key: 'isRebate', align: 'center',
                  render: (h, params) => {
                      const text = params.row.isRebate === '0' ? '未返利' : '已返利';
                      return h('span', text);
                  },
                },
                { title: '数据状态', key: 'doubtStatus', align: 'center',
                  render: (h, params) => {
                      const text = params.row.doubtStatus === '0' ? '正常' : '存疑';
                      return h('span', text);
                  },
                },
            ],
            tableColumnsData3: [
                { title: '阅读时间', key: 'readDate', align: 'left', },
            ],
            tableDataData:[],
            /*
            * 推广数据存疑
            */
            impeachId: null,
            impeachReason: null, // 记录
            modalImpeach: false,
            modalImpeachTitle: '推广数据存疑',
            impeachHistory: false,
            impeachHistorytext: '',
        };
    },
    computed: {
        ...mapState({
			userInfo: state => state.userInfo,
		}),
    },
    created() {
        this.use = Boolean(this.$route.query.use - 0);
        this.from = this.$route.query.from;
        this.formId = this.$route.query.formId;
        this.expandId = this.$route.query.expandId;
        this.appId = JSON.parse(sessionStorage.getItem('publicInfo')).id;

        this.getTableColums(); // 根据不同的类型获取对应的表头

        this.getInfo();
        this.getDataForm();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),

        onclickshareLinkClose() {
            this.showSharLink = false;
            document.getElementById('qrcode').innerHTML = '';
            this.url = 'http://ewechattest.ivygate.cn/index.html';
        },
        onclickButton2() {
            this.url = 'http://ewechattest.ivygate.cn/index.html';
            if (!this.getedInfo.imageId) return;
            this.onclickCreateShareLink('2', '0');
        },
        onclickButton3() {
            document.getElementById('qrcodes').innerHTML = '';
            this.url = 'http://ewechattest.ivygate.cn/index.html';
            if (!this.getedInfo.imageId) return;
            this.onclickCreateShareLink('3', '1');
        },
        /*
        * 推广数据存疑Modal
        */
        onclickModalImpeachOk() {
            if (this.impeachId && !this.impeachReason && !this.impeachHistory && this.modalImpeachTitle === '推广数据存疑') {
                this.modalImpeach = true;
                this.$refs.refModalImpeach.visible = true;
                this.$Message.error('请输入存疑记录');
                return;
            }
            if (!this.impeachHistory && this.modalImpeachTitle === '推广数据存疑') {
                this.saveDoubtStatus();
            } else {
                this.onclickModalImpeachCancel();
            }
        },
        onclickModalImpeachCancel() {
            this.modalImpeach = false;
            this.modalImpeachTitle = null;
            this.impeachId = null;
            this.impeachReason = null;
            this.impeachHistory = false;
            this.impeachHistorytext = null;
        },
        // 绘制二维码
        qrcodes(dom, w, h) {
            new QRCode(dom, {
                width: w, // 设置宽度，单位像素
                height: h, // 设置高度，单位像素
                text: this.url,   // 设置二维码内容或跳转地址
            });
        },
        hmltToCanvas() {
            const _this = this;
            const imgContent = document.getElementById('imgContent');
            html2canvas(imgContent).then(canvas => {
                _this.lastImage = canvas.toDataURL("image/jpeg");
            });
        },
        /*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getListPage();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getListPage();
        },
        /*
        * 数据获取  任务详情
        */
        getInfo() {
            this.updateLoadingStatus({isLoading: true});
            const data =  {
                id: this.formId,
            };
            wpTask.form(data).then(valid.call(this)).then(res => {
                this.getedInfo = res.data.data;
                this.getedInfo && this.getPicture();
                this.getListPage();
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading: false});
            });
        },
        /*
        * 获取图片
        */
        getPicture() {
            this.updateLoadingStatus({isLoading: true});
            const params = {
                id: this.getedInfo.imageId,
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                    // this.qrcodes('qrcodes', 250, 250);
                    // this.hmltToCanvas();
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading: false});
            });
        },
        /*
        * 生成分享链接
        */
        onclickCreateShareLink(count, createType) {
            this.updateLoadingStatus({isLoading: true});
            const data = {
                id: '',
                taskId: this.getedInfo.id,
                appId: this.appId,
                userType: 0, // 0本系统 1 推广人员
                openId: '',
                clickNum: '0',
                successNum: '0',
                type: this.getedInfo.objectType,
                status: '0',
                createType,
            };
            wpExpand.save(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.expandId = res.data.data;
                    const hash = this.getQRcodePathName();
                    this.url += this.types ? `?router=${hash}&id=${this.expandId}&type=${this.types}` : `?router=${hash}&id=${this.expandId}`;
                    if (count === '2') this.qrcodes('qrcode', 150, 150); // 生成的链接二维码
                    if (count === '3') {
                        this.qrcodes('qrcodes', 250, 250);
                        this.hmltToCanvas();
                    }
                    setTimeout(() => {
                        this.updateLoadingStatus({isLoading: false});
                        this.showSharLink = count === '2' ? true : false;
                    }, 500);
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading: false});
                this.showSharLink = count === '2' ? true : false;
            });
        },
        /*
        * 列表获取
        */
        getListPage() {
            if (this.from === '0' || this.from === '1') {
                // this.expandSpreadListPage();
                this.listFormDataRel();
            } else if (this.from === '2') {
                this.listFormDataRel();
            } else {
                this.readSpreadlistPage();
            }
        },
        /*
        * 推广信息 table
        */
        getDataForm() {
            wpExpand.form({ id: this.expandId }).then(valid.call(this)).then(res => {
                this.tableDataTask1.push(res.data.data);
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 获取列表的表头
        */
        getTableColums() {
            const operate = {
                title: '操作',
                key: 'caozuo',
                align: 'center',
                render: (h, params) => {
                    const _this = this;
                    const text = params.row.doubtStatus === '0' ? '推广数据存疑' : '存疑记录';
                    return h('span', {
                        style: {
                            color: '#44bcb7',
                            cursor: 'pointer',
                        },
                        on: {
                            click() {
                                if (text === '推广数据存疑') {
                                    _this.modalImpeach = true;
                                    _this.modalImpeachTitle = '推广数据存疑';
                                    // _this.impeachId = _this.$route.query.from === '2' ? params.row.dataId : params.row.id;
                                    _this.impeachId = params.row.dataId;
                                } else {
                                    _this.modalImpeach = true;
                                    _this.impeachHistory = true;
                                    _this.modalImpeachTitle = '存疑记录';
                                    // _this.impeachHistoryText = _this.$route.query.from === '2' ? params.row.remarks : params.row.doubtRemarks;
                                    _this.impeachHistoryText = params.row.remarks;
                                }
                            },
                        },
                    }, text)
                },
            };
            switch(this.from) {
                case '0': this.tableColumnsData = this.tableColumnsData0; break;
                case '1': this.tableColumnsData = this.tableColumnsData1; break;
                case '2': this.tableColumnsData = this.tableColumnsData2;; break;
                case '3': this.tableColumnsData = this.tableColumnsData3;; break;
            };
            if (this.from !== '3') {
                this.tableColumnsData.push(operate);
            }
        },
        /*
        * 获取列表的请求状态
        */
        getTableDatasstatus() {
            let status = null;
            switch(this.from) {
                case '0': status = 'pay'; break;
                case '1': status = 'pay'; break;
                case '2': status = 'invite'; break;
                case '3': 
                    switch(this.getedInfo.objectType) {
                        case 'news': status='news'; break;
                        case 'audio': status='audio'; break;
                        case 'video': status='vidoe'; break;
                        case 'image': status='image'; break;
                    }
                break;
            }
            return status;
        },
        /*
        * 存储存疑记录
        */
        saveDoubtStatus() {
            const _this = this;
            // 不同的类型 调用不同的接口
            // if (this.$route.query.from === '2') {
                const data = {
                    dataId: this.impeachId,
                    remarks: this.impeachReason,
                };
                const fd = new FormData();
                Object.keys(data).forEach(item => fd.append(item, data[item]));
                common.updateFormDataStatus(fd).then(valid.call(this)).then(res => {
                    dealSuccess(res);
                }).catch(errors.call(this)).finally(()=>{});
            // } else {
                // const data = {
                //     id: this.impeachId,
                //     doubtRemarks: this.impeachReason,
                // };
                // orderM.doubtStatus(data).then(valid.call(this)).then(res => {
                //     dealSuccess(res);
                // }).catch(errors.call(this)).finally(() => {});
            // }
            function dealSuccess(res) {
                if(res.ok) {
                    _this.modalImpeach = false;
                    _this.modalImpeachTitle = null;
                    _this.impeachId = null;
                    _this.impeachReason = null;
                    _this.impeachHistory = false;
                    _this.impeachHistorytext = null;
                    _this.$Message.success(res.data.message);
                    _this.getListPage();
                }
            };
        },
        /*
        * 推广类结果列表
        */
        expandSpreadListPage() {
            const data = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                spreadId: this.expandId,
                status: this.getTableDatasstatus(),
            };
            orderM.listPagePost(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data;
                    this.pageNo = rdata.pageNo;
                    this.pageTotal = rdata.count;
                    this.pageSize = rdata.pageSize;
                    this.tableDataData = rdata.page.list;
                }
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 阅读类推广结果列表
        */
        readSpreadlistPage() {
            const data = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                spreadId: this.expandId,
            };
            wpExpand.readSpreadlistPage(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data;
                    this.pageNo = rdata.pageNo;
                    this.pageTotal = rdata.count;
                    this.pageSize = rdata.pageSize;
                    this.tableDataData = rdata.list;
                }
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 表单数据列表
        */
        listFormDataRel() {
            const data = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                itemId1: this.$route.query.expandId,
            };
            wpExpand.listFormDataRel(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data;
                    this.pageNo = rdata.pageNo;
                    this.pageTotal = rdata.count;
                    this.pageSize = rdata.pageSize;
                    this.tableDataData = rdata.list;
                }
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 获取二维码的 pathname
        */
        getQRcodePathName() {
            this.types = null;
            let url = null;
            switch(this.from) {
                case '0': url = 'buy'; break;
                case '1': url = 'groupBuy'; break;
                case '2': url = 'invite'; break;
                case '3': 
                    switch(this.getedInfo.objectType) {
                        case 'news': url = 'imgText'; this.types='news'; break;
                        case 'audio': url = 'imgAudioVideo'; this.types='audio'; break;
                        case 'video': url = 'imgAudioVideo'; this.types='vidoe'; break;
                        case 'image': url = 'imgAudioVideo'; this.types='image'; break;
                    }
            }
            return url;
        },
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .expand-modal-share-link {
        display: flex;
        justify-content: space-around;
        position: relative;
        .ivu-modal-body {
            height: 350px;
            padding-bottom: 95px;
        }
        .ivu-modal-footer {
            display: none;
        }
        .share-link-btn {
            position: absolute;
            left: 50%;
            bottom: 16px;
            transform: translateX(-50%);
        }
        p {
            font-size: 14px;
            line-height: 35px;
            display: inline;
        }
        a {
            font-size: 14px;
        }
        #qrcode {
            margin-left: 95px;
            margin-top: 0px;
        }
    }
    .modal-img-containers {
        width: 750px;
        height: 1334px;
        position: relative;
        margin-right: 20px;
        float: left;
        margin-bottom: 20px;
        >img {
            display: block;
            width: 750px;
            height: 1334px;
        }
        #qrcodes {
            position: absolute;
            width: 250px;
            height: 250px;
            img {
                width: 250px;
                height: 250px;
            }
        }
    }
</style>