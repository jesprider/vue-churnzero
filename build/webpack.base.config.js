const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');

const appRoot = path.resolve(__dirname, '..');

module.exports = {
    context: path.resolve(appRoot),
    entry: './src/index.js',
    output: {
        path: path.resolve(appRoot, 'dist'),
        filename: `${pkg.name}.js`,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
