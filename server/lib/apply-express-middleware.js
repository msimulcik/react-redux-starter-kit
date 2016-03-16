// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default function applyExpressMiddleware(fn, req, res) {
  const originalEnd = res.end;

  return new Promise((resolve) => {
    res.end = function end(...args) { // eslint-disable-line no-param-reassign
      originalEnd.apply(this, args);
      resolve(false);
    };
    fn(req, res, () => {
      resolve(true);
    });
  });
}
