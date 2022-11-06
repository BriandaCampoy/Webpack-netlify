const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin') 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module:{
        rules: [
        {
            test:/\.m?js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i,
            use:[MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
            ],
        },
        {
            test: /\.png/,
            type:'asset/resource'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
        }
    ]
},
plugins:[
    new HtmlWebPackPlugin({
        inject: true,
        template: './public/index.html',
        filename:'./index.html'
    }),
    new MiniCssExtractPlugin({
        filename:'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
        patterns:[
            {
                from:path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }
        ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
],
optimization:{
    minimizer:true,
    minimizer:[
        new CssMinimizerPlugin(),
        new TerserPlugin(),
    ]
}
}

