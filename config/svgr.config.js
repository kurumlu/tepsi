const WHITE_REGEX = /^#fff(?:fff)?$/i;

/**
 * An SVGO plugin that applies a transform function to every fill attribute
 * in an SVG. This lets you replace fill colors or remove them entirely.
 */
function replaceFillAttributeSvgoPlugin(options) {
  return {
    type: 'perItem',
    name: 'replaceFillAttibute',
    description: 'replaces fill attributes using a user-defined function',
    params: options,
    fn(item, { transform }) {
      if (!item.isElem()) {
        return;
      }

      const fillAttr = item.attr('fill');
      if (!fillAttr) {
        return;
      }

      const transformedFill = transform(fillAttr.value);
      if (transformedFill === '') {
        item.removeAttr('fill');
      } else {
        fillAttr.value = transformedFill;
      }
    },
  };
}

const svgrConfig = (module.exports = {
  svgoConfig: {
    plugins: [
      {
        removeViewBox: false,
        removeDimensions: true,
        replaceFillAttibute: replaceFillAttributeSvgoPlugin({
          transform: fill => (WHITE_REGEX.test(fill) ? 'currentColor' : ''),
        }),
      },
    ],
  },
});
svgrConfig.WHITE_REGEX = WHITE_REGEX;
svgrConfig.replaceFillAttributeSvgoPlugin = replaceFillAttributeSvgoPlugin;
