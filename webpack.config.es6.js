//webpack配件文件
module.exports={
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                query:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/transform-runtime']
                    }
            }
        ]
    },
    resolve:{
        //自动识别后缀
        extensions:['.js']
    }
};