const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('postcss');
const svgrConfig = require('../config/svgr.config');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-contexts/register',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
  ],
  webpackFinal: async (config, { configType }) => {
    const isDev = configType === 'DEVELOPMENT';

    config.module.rules.push(
      ...[
        {
          // Required for IE11
          test: [/.js$|.ts$/],
          exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/typescript', '@babel/preset-env'] },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
                url: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: false,
                },
                sourceMap: isDev,
                additionalData: `$env: '${
                  process.env.NODE_ENV
                }'; $asset_base_path: '${
                  !!process.env.APP_ENV ? `/${process.env.APP_ENV}` : ''
                }';`,
              },
            },
          ],
        },
        !isDev && {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file-loader',
        },
        !isDev && {
          test: /\.(woff|ttf|otf|eot|woff2)$/i,
          loader: 'file-loader',
        },
      ].filter(Boolean)
    );

    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /icons\/raw\/.*\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: [
        {
          loader: '@svgr/webpack',
          options: svgrConfig,
        },
      ],
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false,
      })
    );

    return config;
  },
};
