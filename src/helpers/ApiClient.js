import superagent from 'superagent';
import config from 'config';
import createAPIHandler from './APIResponseHandler';
import { normalize } from 'normalizr';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return config.apiRelativePath + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, { params, data, type, schema } = {}) => {
        let promise = new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (type) {
            request.type('type');
          }

          if (data) {
            request.send(data);
          }

          request.end(createAPIHandler(resolve, reject));
        });

        if (schema) {
          promise = promise.then((response) => normalize(response, schema));
        }

        return promise;
      };
    });
  }
}
