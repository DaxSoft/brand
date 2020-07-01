const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    // node: {
    //     fs: 'empty',
    // },
    target: 'node',
    // externals: {
    //     puppeteer: 'commonjs2 puppeteer',
    //     'puppeteer-extra': 'commonjs2 puppeteer-extra',
    //     'puppeteer-extra-plugin-recaptcha':
    //         'commonjs2 puppeteer-extra-plugin-recaptcha',
    //     'puppeteer-extra-plugin-stealth':
    //         'commonjs2 puppeteer-extra-plugin-stealth',
    // },
};
