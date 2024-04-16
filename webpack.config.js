const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Set mode to development
    entry: './src/index.ts', // Entry point for your TypeScript code
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true, // Clean the output directory before each build
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Match TypeScript files
                use: 'ts-loader', // Use ts-loader for TypeScript files
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // Match CSS files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
            },
            {
                test: /\.(png|jpe?g|gif)$/i, // Match image files
                type: 'asset/resource', // Use asset/resource to emit the file as a separate asset
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i, // Match font files
                type: 'asset/resource', // Use asset/resource to emit the file as a separate asset
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html', // Correct path to your HTML template
            filename: 'index.html', // Output file name (default is index.html)
            inject: true, // Injects all bundles at the bottom of the body element
        }),
    ],
    devServer: {
        static: './dist', // Serve files from the dist directory
        hot: true, // Enable hot module replacement
    },
};
