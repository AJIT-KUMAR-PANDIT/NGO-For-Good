const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', // Update with your entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new Dotenv({
            path: './.env', // Path to your .env file
            safe: true // Load .env.example to ensure all necessary variables are present
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // Add other loaders if needed
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'
        ],
    },
};
