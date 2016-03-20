export const createAPIHandler = function createAPIHandler(resolve, reject) {
  return (err, { body } = {}) => {
    if (err) {
      reject(body || err);
    } else {
      resolve(body);
    }
  };
};

export default createAPIHandler;
