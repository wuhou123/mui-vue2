var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: 'build.js'
  },
  resolve: {
  	extensions: ['.js', '.vue'], 
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, 'src'),
      'statics': path.resolve(__dirname, 'statics'),
      'comp': path.resolve(__dirname, 'src/components'),
      'img': path.resolve(__dirname, 'statics/images'),
      'kits': path.resolve(__dirname, 'src/kits') 
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },{
      	test:/\.styl$/,
      	loader:'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
        	limit:100000,
          name: '[name].[ext]'
        }
      },{
      	test:/\.jade$/,
      	loader:'jade-loader'
      },{
      	test:/\.pug$/,
      	loader:'pug'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
