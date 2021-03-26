/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const webpack = require("webpack");
const index = path.resolve(__dirname, "./src/js/index.js");
const random = path.resolve(__dirname, "./src/js/random.js");
const nodePath = path.resolve(__dirname, "node_modules");

module.exports = {
  target: "web",
  resolve: {
    fallback: {
      fs: false
    }
  },
  stats: {
    chunks: true,
    colors: true,
    env: true
  },
  performance: {
    hints: false
  },
  entry: {
    index,
    random
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|webp|woff2|woff|eot|webmanifest)$/i,
        type: "asset/resource"
      },
      {
        test: /\.m?js$/i,
        exclude: nodePath,
        use: [
          // Transplies from ES6 to ES5.
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
              cacheCompression: true
            }
          },
          // Lint javascript before transpiling
          {
            loader: "eslint-loader",
            options: {
              cache: true
            }
          }
        ]
      },
      // Loads all CSS, SASS AND SCSS files
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: true
            }
          },
          // Adds vendor prefixes with Autoprefixer
          "postcss-loader",
          {
            // Compiles SASS to CSS
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      title: "Video Game Randomizer",
      filename: "index.html",
      template: "./src/static/html/index.html",
      inject: "head",
      chunks: ["index"],
      minify: true
    }),
    new HtmlWebpackPlugin({
      title: "Video Game Randomizer - Cover Art",
      filename: "random.html",
      template: "./src/static/html/random.html",
      inject: "head",
      chunks: ["random"],
      minify: true
    }),
    //Adds defer to js scripts to speed load times.
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        // Extracts all .css files into a single css file
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};
