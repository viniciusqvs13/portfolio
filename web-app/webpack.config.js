var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    babelpolyfill: 'babel-polyfill',
    index: './src/index.js',
    indexController: './src/controllers/IndexController.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/bundle'),
    filename: '[name].bundle.js'
  },
  optimization: {
    //splitChunks: {
    //  chunks: 'all'
    //},
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader }, //style loader
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader, // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
