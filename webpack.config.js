var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, 'src');

module.exports = {
    entry :  {
        bundle :  ['webpack-dev-server/client?https://dickydwijayanto-pokedex.herokuapp.com/',
            'webpack/hot/only-dev-server',
           path.resolve(assetsPath,'index.js')],
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js', //
        path: path.join(assetsPath ,"dist/js/"),
        publicPath: 'https://dickydwijayanto-pokedex.herokuapp.com/assets/'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /.jsx?$/,
                loaders: ['react-hot-loader/webpack','babel'],
                include: [path.resolve(assetsPath)],
           }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool : '#source-map',

    plugins: [
     new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
    ]
};
