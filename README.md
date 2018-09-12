这是专为Wps CLI(wps专题项目搭建的前端项目模板生成工具)提供的模块远程库


项目说明：

    项目支持三种JS模块化方式切换
    > 使用(AMD)requirejs管理
    > 使用(Commonjs)webpack管理
    > 使用es6 module

    支持二种css预处理切换
    > 使用less管理css
    > 使用sass管理css

    支持二种版本管理方式切换
    > example.js?v=md5码，加search值版本管理方式
    > example.md5.js码，修改文件名的版本管理方式

注：以上三种切换，第个切换中全由使用Wps CLI模板生成工具时选择决定使用其中某一种方式，不支持多种方式并行（像选择了less,就不能再scss了，其它同理）

模板项目运行步骤：

```
    npm install         //安装模块
    npm run dev         //走开发流程
    npm run build      //走发布流程
```
