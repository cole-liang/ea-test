const festivalsController = require("../../server/festivalsController");
const mockData = require("../../resourses/festivalsForTest");
const mockAxios = require("axios");

describe("Server side: festivalsController test", () => {
  const controller = festivalsController("Mock_URL");

  const res = {
    status: jest.fn(),
    json: jest.fn()
  };

  const req = {};

  describe("get", () => {
    it("should return status and error if error occurs", () => {
      const status = 429;
      const data = "Too many request";
      mockAxios.get.mockImplementationOnce(url => {
        return Promise.reject({ response: { status, data } });
      });

      controller.get(req, res).then(response => {
        expect(res.status).toBeCalledWith(status);
        expect(res.json).toBeCalledWith(data);
      });
    });

    it("should return 200 and data if success", () => {
      const data = mockData.sourceList;
      mockAxios.get.mockImplementationOnce(url => {
        return Promise.resolve({ data });
      });

      controller.get(req, res).then(response => {
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(data);
      });
    });
  });
});
