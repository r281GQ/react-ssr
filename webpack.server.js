const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['module:@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};
