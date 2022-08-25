const path = require('path');
//traemos esta dependencia que la instalamos con un comando de npm previamente
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// traermos el loader de css instalado con npm i mini-css-extract-plugin css-loader -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "main.js"
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"]
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
        new MiniCssExtractPlugin()
    ]
}

//npx webpack --mode production --config webpack.config.js
//npm i html-webpack-plugin -D SE instala para procesar el HTML
/* 
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime se instala para que nuestro codigo js sea compatible con
todos los navegadores
*/