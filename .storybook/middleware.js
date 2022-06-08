const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');

const FASCIAS_MAP = {
  sdworx: 0,
  sdworxsme: 1,
  staffingsolutions: 2,
  sdworxcountries: 3,
  sdworxlms: 4,
};

const STYLES_PATH = './node_modules/.cache/storybook/public/';

module.exports = function expressMiddleware(router) {
  if (!!process.env.SB_PUBLIC_PATH) {
    router.use(
      serveStatic(path.join(__dirname, '../', process.env.SB_PUBLIC_PATH), {
        setHeaders: function (res) {
          res.set('Access-Control-Allow-Origin', '*');
          res.set(
            'Access-Control-Allow-Headers',
            'Content-Type,X-Requested-With'
          );
          res.set(
            'Access-Control-Allow-Methods',
            'PUT,POST,GET,DELETE,OPTIONS'
          );
        },
      })
    );

    router.get('/styles', function (req, res) {
      const styleFiles = [];
      const fascia = FASCIAS_MAP[req.query.fascia] || FASCIAS_MAP.sdworx;

      fs.readdir(path.join(__dirname, '../', STYLES_PATH), (err, items) => {
        if (err) {
          res.status(404);
          res.write('404: styles file not found');
          res.end();
        } else {
          items.forEach(file => {
            if (file.includes('.css') && !file.includes('.map')) {
              styleFiles.push(file);
            }
          });

          styleFiles.sort(
            (a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0])
          );

          res.sendFile(styleFiles[fascia], {
            root: path.join(__dirname, '../', STYLES_PATH),
          });
        }
      });
    });
  }
};
