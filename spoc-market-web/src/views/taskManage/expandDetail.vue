<template>
    <div class="expand-detail-boss">
        <div class="modal-img-containers" id="imgContent" style="position:absolute; top: -10000px;">
            <img :src="picture" alt="" id="posterImg">
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
    	<btnlist title="商品列表"></btnlist>
        <Table :columns="tableColumnsTask" :data="tableDataTask1" class="common-table"></Table>
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
            <a :href="url" target="_Blank" style="width: 100%">{{this.url}}</a><br>
            <p>链接二维码：（请用微信扫描下方二维码）</p>
            <div id="qrcode" ref="qrcode" style="width: 150px; height: 150px;"></div>
            <div class="common-button share-link-btn" @click='onclickshareLinkClose'>关闭</div>
        </Modal>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { mapMutations, } from 'vuex';
import html2canvas from 'html2canvas';
import expandTop from '../../modules/expandTop';
import valid, { errors, sys, common, wpExpand, wpTask, } from '../../libs/request.js';
import { mapState, } from 'vuex';
import btnlist from '@public/modules/btnlist';
export default {
    name: 'ExpandDetail',
    components: {
        expandTop,
        btnlist
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
            expandId: null,
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
                {
                    title: '操作',
                    key: 'caozuo',
                    align: 'center',
                    width: 155,
                    render: (h, params) => {
                        const _this = this;
                        const text = '查看详情';
                        return h('span', {
                            style: {
                                cursor: 'pointer',
                            },
                            class: {
                                'proClass': true,
                            },
                            on: {
                                click() {
                                    const {href} =  _this.$router.resolve({
                                        name: 'market.expandData',
                                        query: {
                                            formId: _this.id,
                                            from: _this.from,
                                            expandId: params.row.id,
                                            use: _this.$route.query.use,
                                        },
                                    });
                                    window.open(href, '_blank')
                                },
                            },
                        }, text);
                    },
                },
            ],
            tableDataTask1: [],
        };
    },
    computed: {
        ...mapState({
			userInfo: state => state.userInfo,
		}),
    },
    created() {
        this.use = Boolean(this.$route.query.use - 0);
        this.id = this.$route.query.id;
        this.from = this.$route.query.from;
        this.appId = JSON.parse(sessionStorage.getItem('publicInfo')).id;
        this.getInfo();
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
            this.onclickCreateShareLink('2', '0');
        },
        onclickButton3() {
            this.url = 'http://ewechattest.ivygate.cn/index.html';
            this.onclickCreateShareLink('3', '1');
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
                _this.lastImage = canvas.toDataURL("image/jpeg")
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
                id: this.$route.query.id,
            };
            wpTask.form(data).then(valid.call(this)).then(res => {
                this.getedInfo = res.data.data;
                this.getedInfo.imageId && this.getPicture();
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
                    this.url += `?router=${hash}&id=${this.expandId}&type=${this.getedInfo.objectType}`;
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
            const data = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                taskId: this.getedInfo.id,
            };
            this.updateLoadingStatus({isLoading: true});
            wpExpand.listPage(data).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.pageNo = rdata.pageNo;
                this.pageTotal = rdata.count;
                this.pageSize = rdata.pageSize;
                this.tableDataTask1 = rdata.list;
            }).catch(errors.call(this)).finally(() => { this.updateLoadingStatus({isLoading: false}); });
        },
        /*
        * 获取二维码的 pathname
        */
        getQRcodePathName() {
            let url = null;
            switch(this.from) {
                case '0': url = 'buy'; break;
                case '1': url = 'groupBuy'; break;
                case '2': url = 'invite'; break;
                case '3': url = this.getArticleType(); break;// 图文 || 图片 || 视频 || 语音
            }
            return url;
        },
        /*
        * 映射推广文章类型
        */
        getArticleType() {
            let types = null;
            switch(this.getedInfo.objectType) {
                case 'news': types = 'imgText'; break;
                case 'video': types = 'imgAudioVideo'; break;
                case 'audio': types = 'imgAudioVideo'; break;
                case 'image': types = 'imgAudioVideo'; break;
            };
            return types;
        },
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .expand-detail-boss{
		/*border-top: 1px solid #e0e0e0;*/
		.common-table{
			.ivu-table{
				th{
            		background: #fff;
				}
			}
		}
    }
    
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