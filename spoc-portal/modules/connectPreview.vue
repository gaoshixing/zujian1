<style lang='less'>
.connectPreviewGsx {
    li{
        list-style: none;
    }
    position: relative;
    border-top: 1px solid #e0e0e0;
    .detailSelect{
        position: absolute;
        top: 0;right: 0;
        padding: 20px 0;height: 73px;z-index: 9;
        button{
            @h: 30px;
            width: 85px;height: @h;line-height: inherit;padding: 0;margin-left: 15px;
            font-size: 14px;
        }
    }
    .connectDetail{
        padding-top: 20px;
    }
}
</style>
<template>
<!-- 交接表审查、交接详情页 -->
<div class="connectPreviewGsx">
    <div class="detailSelect">
        <p>
            <Button @click="RouterGo" type="primary" v-show="showBtn">{{$t('portal.edit')}}</Button>
        </p>
    </div>
    <connect-detail @showEdit="showEditBtn" :pId="pId"></connect-detail>
</div>
</template>

<script>
import connectDetail from './connectDetail'

export default {
    props: {
        pId: {
            type: String
        }
    },
    data() {
        return {
            handOverId: '',
            showBtn: false, // 是否显示编辑按钮
        }
    },
    components: {
        connectDetail,
    },
    created () {
        // 获取交接表ID
        this.handOverId = this.$route.query.id;
    },
    methods:{
        RouterGo() {
            this.$router.push({
                name: this.$route.query.phase+'.connectedit',
                query: {
                    id: this.handOverId,
                    phase:this.$route.query.phase,
                    menuId:this.pId
                }
            });
        },
        showEditBtn() {
            this.showBtn = true;
        }
    },
}
</script>


