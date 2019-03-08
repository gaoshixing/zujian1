### 多语言配置

多语言文件 `locales/en.json` `locales/zh.json` 

例如键为`add`

在模板中使用
```
{{$t("add")}}
```

在JS中使用
```
Vue.t('add')
```

切换多语言

存入cookie zh、en 然后刷新
```
Cookies.set('lang', lang);
location.reload()
```
