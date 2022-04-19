// Generates icons's icons/icons.ts file based upon the svgs in the raw directory

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { optimize } = require('svgo');
const {
  replaceFillAttributeSvgoPlugin,
  WHITE_REGEX,
} = require('../config/svgr.config');

const iconBasePath = path.resolve(
  __dirname,
  '../src/components/00-helpers/icons/raw'
);

const preamble = `// DO NOT MANUALLY EDIT THIS FILE
// This file was automatically generated
// Run 'yarn run generate-icon-exports' to generate a new version`;

const allSvgExports = glob.sync('*.svg', { cwd: iconBasePath }).reduce(
  (memo, filename) => {
    const { slug, exportName } = filenameToExportName(filename);
    const importString = `import ${exportName} from './raw/${filename}';`;
    const sourceString = `  '${slug}': ${exportName},`;
    const exportString = `  ${exportName} = '${slug}',`;
    const templateString = `    ${generateIconTemplate(filename, slug)}`;

    memo.imports.push(importString);
    memo.sources.push(sourceString);
    memo.exports.push(exportString);
    memo.templates.push(templateString);

    return memo;
  },
  { imports: [], sources: [], exports: [], templates: [] }
);

fs.writeFileSync(
  path.resolve(__dirname, `../src/components/00-helpers/icons/icons.ts`),
  `${preamble}\n\n${allSvgExports.imports.join(
    '\n'
  )}\n\nexport const Sources = {\n${allSvgExports.sources.join(
    '\n'
  )}\n}\n\nexport enum IconName {\n${allSvgExports.exports.join('\n')}\n}\n`
);

const preamble_template = `<template data-sly-template.icon="\${ @ name, size = 'medium', className = '' }">
  <span role="img" class="sd-a-icon sd-a-icon--\${ name } sd-a-icon--\${ size } \${ className }">`;
const postamble_template = `  </span>
</template>`;

fs.writeFileSync(
  path.resolve(
    __dirname,
    `../src/components/00-helpers/icons/icon.template.htl`
  ),
  `${preamble_template}\n${allSvgExports.templates.join(
    '\n'
  )}\n${postamble_template}\n`
);

/**
 * Capitalizes all the letters
 * and replaces hyphens with underscores
 *
 * E.g. exclamation-circle-solid.svg becomes EXCLAMATION_CIRCLE_SOLID.
 */
function filenameToExportName(filename) {
  const slug = path.basename(filename, path.extname(filename));

  return {
    slug,
    exportName: slug
      .toUpperCase()
      .replace(/[\-]+/g, '_')
      .replace(/[^\w\-]+/g, ''),
  };
}

function generateIconTemplate(fileName, slug) {
  const absoluteIconPath = path.resolve(iconBasePath, fileName);
  const iconSource = fs.readFileSync(absoluteIconPath, 'utf-8');
  const { data: optimizedSvgString } = optimize(iconSource, {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(width|height|style|color)',
        },
      },
      replaceFillAttributeSvgoPlugin({
        transform: fill => (WHITE_REGEX.test(fill) ? 'currentColor' : ''),
      }),
    ],
  });

  return optimizedSvgString.replace(
    '<svg',
    `<svg focusable="false" aria-hidden="true" class="sd-a-icon__svg" data-sly-test="\${ name == '${slug}' }"`
  );
}
