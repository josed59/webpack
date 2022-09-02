const path = require('path');
//traemos esta dependencia que la instalamos con un comando de npm previamente
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// traermos el loader de css instalado con npm i mini-css-extract-plugin css-loader -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//traemos el loader de copy pack npm i copy-webpack-plugin -D
const CopyPlugin = require('copy-webpack-plugin');
const { copyFile } = require('fs');
// para minificar el codigo css se utiliza npm install css-minimizer-webpack-plugin -D y tenser ya esta incluido ej webpack 5 y es para minificar js pero lo instale npm install terser-webpack-plugin --save-dev
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terser = require('terser-webpack-plugin');




module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
     // EL NOMBRE DEL ARCHIVO FINAL,
     assetModuleFilename: 'assets/images/[hash][ext][query]'
    
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    //incluimos alias para facilitar las rutas 
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    },
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/
      },
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.css$/i,
         // Use es un arreglo u objeto donde dices que loader aplicaras
         use: [ MiniCssExtractPlugin.loader,"css-loader",]
      },
      //nueva regla que esta incluira en webpack para hacer hash  base 64 de las imagenes
      {
        test: /\.png/,
        type: "asset/resource"
      },
      //nueva regla que se utiliza para mover los archivos de font
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][contenthash][ext]"
        }
      }

    ]
  },
   // Ese incluye la seccion de plugins
  plugins: [
    new HtmlWebpackPlugin({ 
        inject: 'body',
         // especificas donde queda la entrada de tu proyecto
        template: './public/index.html',
         // indicas cual es el nombre del archivo de salida
        filename: './index.html'
        }),
         // se incluye nuevo plugin de cs loader
        new MiniCssExtractPlugin({
          //se modifica para mover el archivo y agrega hash
          filename:'assets/[name].[contenthash].css'
        }),
        // se incluye nuevo plugin para copiar los archivos
        new CopyPlugin({
          patterns: [
            {
              // se indica desde donde se copia
              from: path.resolve(__dirname, "src", "assets/images"),
              // se indica ruta de destino
              to: "assets/images"
            }
          ]
        }),
    ], 
    optimization: {
      minimize: true,
              minimizer: [
                  new CssMinimizerPlugin(),
                  new terser
              ],
    },  
    
}

//npx webpack --mode production --config webpack.config.js
//npm i html-webpack-plugin -D SE instala para procesar el HTML
/* 
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime se instala para que nuestro codigo js sea compatible con
todos los navegadores
*/