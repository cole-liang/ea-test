const axios = {
  get: jest.fn(url => Promise.resolve({ data: {} }))
};

module.exports = axios;
