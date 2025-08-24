const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            filename: 'index.html',
            title: '手动配置 webpack'
        })
    ],
    devServer: {
        port: 3000,
        open: true,
        static: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
    
}
