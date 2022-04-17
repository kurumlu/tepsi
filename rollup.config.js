import ts from '@wessberg/rollup-plugin-ts';
import sass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import sizes from 'rollup-plugin-sizes';
import visualizer from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import postcss from 'postcss';
import cssnano from 'cssnano';
import cssnanoPresetAdvanced from 'cssnano-preset-advanced';
import postcssNormalize from 'postcss-normalize';
import postcssStripInlineComments from 'postcss-strip-inline-comments';
import autoprefixer from 'autoprefixer';
import cssMqPacker from 'css-mqpacker';
import path from 'path';
import fs from 'fs';
import pkg from './package.json';
import svgr from '@svgr/rollup';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgrConfig = require('./config/svgr.config');

const root = path.resolve(__dirname);

const cssNanoConfig = {
  preset: [
    cssnanoPresetAdvanced,
    {
      calc: { warnWhenCannotResolve: false, precision: 5 },
      convertValues: { length: false, time: false, angle: false, precision: 5 },
      discardComments: { removeAll: true },
      minifyFontValues: {
        removeQuotes: false,
      },
      normalizeUrl: false,
      reduceIdents: false,
    },
  ],
};

const isProduction =
  process.argv.indexOf('-p') >= 0 ||
  process.env.BUILD === 'production' ||
  process.env.NODE_ENV === 'production';
const APP_ROOT = path.join(root, 'src');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'react-dom/test-utils',
      'text-mask-addons/dist/createAutoCorrectedDatePipe',
    ],
    plugins: [
      sass({
        options: {
          data: `$env: '${process.env.NODE_ENV}'; $asset_base_path: '.';`,
        },
        processor: css =>
          postcss({
            plugins: [
              postcssNormalize(),
              postcssStripInlineComments(),
              autoprefixer(),
              cssMqPacker({ sort: true }),
              cssnano(cssNanoConfig),
            ],
          })
            .process(css, {
              from: path.join(root, 'dist', 'styles', '*.css'),
              to: path.join(root, 'dist', 'styles', '*.css'),
            })
            .then(result => result.css),
        output: function (styles, styleNodes) {
          const baseDir = path.join(root, 'dist', 'styles');
          if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir);
          }
          styleNodes.map(styleNode =>
            fs.writeFileSync(
              path.resolve(
                baseDir,
                path.basename(styleNode.id, '.main.scss') + '.css'
              ),
              styleNode.content
            )
          );
        },
      }),
      ts({
        // Use Babel for Syntax transformations
        transpiler: 'babel',
        // Don't use process.cwd(), but instead another root directory
        cwd: APP_ROOT,
        // Load a different tsconfig file in production
        tsconfig: '../tsconfig.json',
        // Load a different browserslist if currently targeting a modern environment
        browserslist: false,
        // Load a different babel config file in production
        babelConfig: '../babel.config.js',

        // Exclude files within node_modules when not in production
        exclude: isProduction ? [] : ['node_modules/**/*.*'],
      }),
      svgr(svgrConfig),
      isProduction &&
        terser({
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        }),
      replace({
        preventAssignment: true,
        __packageVersion__: pkg.version,
      }),
      sizes(),
      visualizer({
        filename: './dist/stats.html',
      }),
    ].filter(Boolean),
  },
];
