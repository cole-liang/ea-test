import React from "react";
import { shallow } from "enzyme";
import MainComponent from "./../../components/mainComponent";
import * as data from "../../resourses/festivalsForTest";

describe("MainComponent component test", () => {
  const wrapper = shallow(<MainComponent></MainComponent>);

  it("should render MainComponent", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render MainComponent without receiving data", () => {
    wrapper.setState({ festivals: [] });
    expect(wrapper).toMatchSnapshot();
  });

  describe("Format data", () => {
    const instance = wrapper.instance();

    it("should format data from API", () => {
      const input = data.sourceList;
      const expected = data.expectedList;

      const result = instance.transformFormat(input);

      expect(result).toStrictEqual(expected);
    });

    it("should flattern Data", () => {
      const input = data.flattenSourceList;
      const expected = data.flattenExpectedList;

      const result = instance.flattenData(input);

      expect(result).toStrictEqual(expected);
    });

    it("should generate band_festival object", () => {
      const input = data.flattenExpectedList;
      const expected = data.banFesExpectedObj;

      const result = instance.generateBandFestivalObj(input);

      expect(result).toStrictEqual(expected);
    });

    it("should generate recordLabel_band object and bandOccurrence set", () => {
      const input = data.flattenExpectedList;
      const expected = {
        recordLabel_bands: data.recBanExpectedObj,
        bandOccurance: data.expectedBandOcc
      };

      const result = instance.generateRecordBandObjAndBandOcc(input);

      expect(result).toStrictEqual(expected);
    });

    it("should generate final result", () => {
      const { recBanExpectedObj, banFesExpectedObj, expectedBandOcc } = data;
      const expected = data.expectedFinalResult;

      const result = instance.generateFormattedResult(
        recBanExpectedObj,
        banFesExpectedObj,
        expectedBandOcc
      );

      expect(result).toStrictEqual(expected);
    });
  });
});
