let config = {
    serverHosturl:"http://47.93.31.175:8181/",
    serverHost:"http://47.93.31.175",//服务端接口服务器
    serverPort:8181,//服务端端口
    host:"http://localhost",//本地域
    port:8080,//本地端口
    outputPath:"",//输出路径
    publicPath:"",//前缀
    title:"智慧校园",//站点title
    proxyTable:{
        "/a/ws":{
            target: 'http://47.93.31.175:8182',
            pathRewrite: {
                "^/a/ws":"/a/ws",
            }
        },
        "/spoc-choiceschool":{
            target: 'http://47.93.31.175:8181',
            pathRewrite: {
                "^/spoc-choiceschool":"/spoc-choiceschool",
            }
        },
        "/spoc-safebox":{
            target: 'http://47.93.31.175:8181',
            pathRewrite: {
                "^/spoc-safebox":"/spoc-safebox",
            }
        }
    }
};
export default config; //导出配置
