项目目录结构文件说明：
 ccblog:
   blog                 * python源码目录
      config.ini          * MySQL配置文件
      control.py
      ...
      service.py          * 接口服务
   static               * 静态资源文件
     --css                * CSS样式目录
        blog.css          * 项目样式文件
     --iview              * iview框架组件
     --js                 * 项目前端页面渲染js组件
        --manage          * 项目后端管理页面渲染js组件
     --upload             * 上传的图片存放目录
     --vue                * vue框架组件
   templates            * 前端页面html
     --manage             * 后端管理页面html
   application.py       * 应用启动入口和接口