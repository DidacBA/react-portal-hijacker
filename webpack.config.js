const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }
    ]
  },
  resolve: {      
    alias: {          
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
    }  
  },  
  externals: {      
      react: {          
          commonjs: "react",          
          commonjs2: "react",          
          amd: "React",          
          root: "React"      
      },      
      "react-dom": {          
          commonjs: "react-dom",          
          commonjs2: "react-dom",          
          amd: "ReactDOM",          
          root: "ReactDOM"      
      }  
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ 
        test: /\.js(\?.*)?$/i, 
      })
    ],
  },
}