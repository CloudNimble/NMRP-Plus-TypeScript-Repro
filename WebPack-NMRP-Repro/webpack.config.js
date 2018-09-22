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
                var original = resource.request;
                var replace = resource.request.replace(/-APP_TARGET/, `-${env}`);
                resource.request = replace;
                // This will help you debug the replacement during the build process. 
                console.log(`Original Config: '${original}', Replacement: '${replace}'`);
            })
        ]
    }];
};
