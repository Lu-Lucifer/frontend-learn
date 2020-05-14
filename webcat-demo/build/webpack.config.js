const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 文档速查
 *
 * # webpack cli 命令行参数
 * - https://webpack.js.org/api/cli/
 *
 * # options 具体参数
 * - content
 *  - https://webpack.js.org/configuration/entry-context/#context
 *
 * # html-webpack-plugin
 * - https://www.npmjs.com/package/html-webpack-plugin
 *
 * # babel-loader
 * - https://babeljs.io/docs/en/plugins
 * - https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 * - https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
 */

module.exports = {
	/** 基础配置 */
	mode: 'development',
	// 为 entry 提供解析文件目录的起始路径
	context: path.resolve(__dirname, '../', 'src'),
	// 入口文件
	entry: {
		app: './index.js' // 相对 package.json 执行位置
	},
	// 编译输出路径
	output: {
		publicPath: '',
		path: path.resolve(__dirname, '../', 'dist'), // 需要提供一个完整路径 absolute path
		filename: '[name].bundle.js' // 指定文件名
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '../public/index.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, '..', 'dist'),
		host: '0.0.0.0',
		port: 3000,
		proxy: {
			'/wx': 'http://127.0.0.1:4000'
		}
	}
};

// module: {
//     rules: [
//       /** babel */
//       {
//         test: /\.(js|mjs|jsx|ts|tsx)$/,
//         include: util.resolveApp('src'),
//         loader: require.resolve('babel-loader'),
//         options: {
//           plugins: [
//             '@babel/plugin-transform-react-jsx',
//             ['import', { libraryName: 'antd-mobile', style: 'css' }] // `style: true` 会加载 less 文件
//           ]
//         }
//       },
//       /** css */
//       {
//         test: /\.css$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           'style-loader',
//           // Translates CSS into CommonJS
//           'css-loader'
//         ]
//       },
