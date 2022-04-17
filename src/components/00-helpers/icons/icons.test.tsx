import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { JSDOM } from 'jsdom';

const allIconElements = glob
  .sync(path.resolve(__dirname, './raw/*.svg'))
  .map(absoluteIconPath => {
    const iconSource = fs.readFileSync(absoluteIconPath, 'utf-8');

    return {
      fileName: path.basename(absoluteIconPath),
      dom: new JSDOM(iconSource),
    };
  });

allIconElements.forEach(({ fileName, dom }) => {
  const document = dom.window.document;
  const iconElement = document.querySelector('svg');

  describe(`SVG Contents: raw/${fileName}`, () => {
    it('has an xml namespace', () => {
      expect(iconElement.getAttribute('xmlns')).toStrictEqual(
        'http://www.w3.org/2000/svg'
      );
    });

    it('has a viewbox of "0 0 24 24"', () => {
      expect(iconElement.getAttribute('viewBox')).toStrictEqual('0 0 24 24');
    });
  });
});
