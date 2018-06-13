const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    noParse: [/aws-sdk/],
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
