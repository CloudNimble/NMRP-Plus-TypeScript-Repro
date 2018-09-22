const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './wwwroot/dist';

module.exports = (env, args) => {
    return [{
        stats: { modules: false },
        entry: { 'main': './ClientApp/boot.ts' },
        resolve: { extensions: ['.js', '.ts'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                { test: /\.ts$/, include: /ClientApp/, use: 'ts-loader' },
            ]
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function (resource) {
                resource.request = resource.request.replace(/-APP_TARGET/, `-${env}`);
                var replace = resource.request.replace(/-APP_TARGET/, `-${env}`);
                console.log(replace);
            })
        ]
    }];
};
