import { http } from "./request";

const k = '/crmStatistics'
const k1 = '/crmRecord'


const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const post1 = (u,data)=>{
    return http.post(`${k1}${u}`,data);
};

export const crmStatistics = {
    //GET /a/ws/crm/crmStatistics/allocSaturation 分单饱和度统计
    allocSaturation(data) {
      return get('/allocSaturation', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/getTotalAllocOrders 分单饱和度统计
    getTotalAllocOrders(data) {
      return post('/getTotalAllocOrders', data);
    },
    //GET /a/ws/crm/crmStatistics/cusScore APP客户资源分值
    cusScore(data) {
      return get('/cusScore', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/newResToday 今日新增资源
    newResToday(data) {
      return get('/newResToday', {
        params: data,
      });
    },
    //POST /a/ws/crm/crmStatistics/resInfo 资源详情
    resInfo(params) {
      return post('/resInfo', params);
    },
    //GET /a/ws/crm/crmStatistics/resMap 资源地区分布
    resMap(data) {
      return get('/resMap', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/resStar 销售跟进资源星级漏斗
    resStar(data) {
      return get('/resStar', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/resTag 资源来源分布
    resTag(data) {
      return get('/resTag', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/reviewBar 点评统计条形图
    reviewBar(data) {
      return get('/reviewBar', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/reviewList 点评统计列表
    reviewList(data) {
      return get('/reviewList', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/saleTel 今日销售电话记录
    saleTel(data) {
      return get('/saleTel', {
        params: data,
      });
    },
    //POST /a/ws/crm/crmStatistics/saveSeoReportHour 保存Seo综合数据时报管理
    saveSeoReportHour(params) {
      return post('/saveSeoReportHour', params);
    },
    //GET /a/ws/crm/crmStatistics/seoReportHour SEO综合数据时报
    seoReportHour(data) {
      return get('/seoReportHour', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/seoReportHourList SEO综合数据时报
    seoReportHourList(data) {
      return get('/seoReportHourList', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/signToday 今日已签客户
    signToday(data) {
      return get('/signToday', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/tagSaleCase APP未签约客户星级分布(饼图)
    tagSaleCase(data) {
      return get('/tagSaleCase', {
        params: data,
      });
    },
    //GET /a/ws/crm/crmStatistics/unsignToday 今日待签客户
    unsignToday(data) {
      return get('/unsignToday', {
        params: data,
      });
    },
    // POST /a/ws/crm/crmStatistics/resInfo 资源详情
    resInfo(data) {
      return post('/resInfo', data);
    },
    // GET /a/ws/crm/crmStatistics/listShowTile 获取需要显示的字段
    listShowTile(data) {
      return get('/listShowTile', {
        params: data,
      });
    },
    // POST /a/ws/crm/crmStatistics/updateShowTile 更新用户显示的字段
    updateShowTile(data) {
      return post('/updateShowTile', data);
    },
    // /a/ws/crm/crmStatistics/listShowTileBySale 获取需要显示的字段(销售详情列表)
    listShowTileBySale(data) {
      return get('/listShowTileBySale', {
        params: data,
      });
    },
    // POST /a/ws/crm/crmStatistics/updateShowTileBySale 更新用户显示的字段(销售详情列表)
    updateShowTileBySale(data) {
      return post('/updateShowTileBySale', data);
    },
    // /a/ws/crm/crmStatistics/saleInfo 销售详情
    saleInfo(data) {
      return post('/saleInfo', data);
    },
    //GET /a/ws/crm/crmStatistics/resAbandon 销售放弃资源星级分布
    resAbandon(data) {
      return get('/resAbandon', {
        params: data,
      });
    },

    // 销售掉单抢单 ?startDate=2018-07-20&endDate=2018-07-26
    saleFallRate(data) {
      return get('/saleFallRate', {
        params: data,
      });
    },

    // 分公司签约统计 /crmStatistics/?startDate=2018-07-20&endDate=2018-07-26&type=q
    getCompanyFinishRate(data) {
      return get('/getCompanyFinishRate', {
        params: data,
      });
    },

    // top 前十
    getTopTenSale(params) {
      return get('/saleSignSort', {
        params
      });
    },

    // 电话列表crmStatistics/everyMonthTel
    companyTel(params) {
      return get('/companyTel', {
        params
      });
    },

    // http://localhost:8081/a/ws/crm/crmStatistics/getCompanyFallGetNum?startDate=2018-06-20&endDate=2018-08-31  掉单抢单明细
    getCompanyFallGetNum(params) {
      return get('/getCompanyFallGetNum', {
        params
      });
    },

    // /a/ws/crm/crmRecord/detailList 电话明细列表
    detailList(params) {
      return post1('/detailList', 
        params
      );
    },

    // 排名明细 分总 /a/ws/crm/crmStatistics/saleFallRate?type=d&startDate=2018-06-01&endDate=2018-08-03
    getCompanyFallGetNum(params) {
      return get('/getCompanyFallGetNum', {
        params
      });
    },

    saleStatisticalDetail(params) {
      return get('/saleStatisticalDetail', {
        params
      });
    },
    // /a/ws/crm/crmStatistics/export/resinfo 资源详情列表导出
    exportResinfo(data) {
      console.log('data', data);
      let str = '';
      for (var k in data) {
        if (data[k] !== null && data[k] !== undefined) str += `${k}=${data[k]}&`;
      }
      str = str.substr(0, str.length - 1);
      return `/spoc-crm/a/ws/crm/crmStatistics/export/resinfo?${str}`;
    },
};