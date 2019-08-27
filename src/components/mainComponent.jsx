import React, { Component } from "react";
import * as festivalsAPI from "../services/festivalsService";
import * as _ from "lodash";
import ItemList from "./itemList";

class MainComponent extends Component {
  state = {
    festivals: []
  };

  async componentDidMount() {
    const festivals = await festivalsAPI.getFestivals();
    this.setState({ festivals });
  }

  // To flatten the data by spreading data in festivals array
  // flattenedData: [ { name: bandNameStr, recordLabel: labelStr, festivalName: fesNameStr} ]
  flattenData = festivals => {
    let flattenedData = [];

    festivals.forEach(festival => {
      festival.bands.forEach(band => {
        band.festivalName = festival.name;
      });
      flattenedData = flattenedData.concat(festival.bands);
    });

    return flattenedData;
  };

  // To know all festivals attended by each band
  // band_festivals: { bandNameStr: festivalNamesArray }
  generateBandFestivalObj = flattenedData => {
    let band_festivals = {};

    flattenedData.forEach(item => {
      if (!Object.keys(band_festivals).includes(item.name))
        band_festivals[item.name] = !item.festivalName
          ? []
          : [item.festivalName];
      else {
        if (item.festivalName)
          band_festivals[item.name].push(item.festivalName);
      }
    });

    return band_festivals;
  };

  // To know all recorded bands for each record label
  // And to know all bands that have at least one record label
  // So that bands without any record label can be found in later calculation
  // recordLabel_bands: { recordLabelStr: bandNamesArray }
  // bandOccurance: Set( bandNameStr )
  generateRecordBandObjAndBandOcc = flattenedData => {
    let recordLabel_bands = {};
    // To uniquely store the names of bands which have record labels
    let bandOccurance = new Set();

    flattenedData.forEach(item => {
      // If recordLabel exists(not empty string or undefined), add bandName to the set
      if (!!item.recordLabel) bandOccurance.add(item.name);

      if (!Object.keys(recordLabel_bands).includes(item.recordLabel))
        recordLabel_bands[item.recordLabel] = [item.name];
      else recordLabel_bands[item.recordLabel].push(item.name);
    });

    return { recordLabel_bands, bandOccurance };
  };

  // Generate ordered result
  // result: [ { recordLabel: labelStr, bands: [{ bandName: bandNameStr, festivals: [ festivalNameStr ]}] } ]
  generateFormattedResult = (
    recordLabel_bands,
    band_festivals,
    bandOccurance
  ) => {
    let result = [];
    // Bands without record label
    let result_noRecordLabel = {
      recordLabel: "No Specified Record",
      bands: []
    };

    Object.keys(recordLabel_bands).forEach(recordLabel => {
      let bands = [];
      recordLabel_bands[recordLabel].forEach(band => {
        bands.push({ bandName: band, festivals: band_festivals[band] });
      });

      // Sort band name in ascending order
      bands = this.sortData(bands, ["bandName"]);

      if (!recordLabel || recordLabel === "undefined") {
        // For bands potentially without record label( either empty string or undefined ),
        // Check and only remain the ones really without any label
        // E.g., band A has two pieces of data, one has label and one doesn't
        // So band A will be initially considered as 'potentially without label' when
        // checking 'no record' data piece. But band A will be finally discarded since
        // it is recorded in bandOccurance
        const bandsWithoutRecord = bands.filter(
          band => !bandOccurance.has(band.bandName)
        );
        if (bandsWithoutRecord.length !== 0)
          result_noRecordLabel.bands = result_noRecordLabel.bands.concat(
            bandsWithoutRecord
          );
      } else {
        result.push({ recordLabel, bands });
      }
    });

    // Sort record label in ascending order
    result = this.sortData(result, ["recordLabel"]);

    // Add bands without record labels at the end of the result
    if (result_noRecordLabel.bands.length !== 0)
      result.push(result_noRecordLabel);

    return result;
  };

  // Sort data in ascending order by columns
  sortData = (data, columns) => {
    return _.orderBy(data, columns);
  };

  transformFormat = festivals => {
    // To flatten the data by spreading data in festivals array
    let flattenedData = this.flattenData(festivals);

    // Sort for festivalName in ascending order
    flattenedData = this.sortData(flattenedData, ["festivalName"]);

    // To know all festivals attended by each band
    const band_festivals = this.generateBandFestivalObj(flattenedData);

    // To know all recorded bands for each record label
    // And to know all bands that have at least one record label
    const {
      recordLabel_bands,
      bandOccurance
    } = this.generateRecordBandObjAndBandOcc(flattenedData);

    const result = this.generateFormattedResult(
      recordLabel_bands,
      band_festivals,
      bandOccurance
    );

    return result;
  };

  render() {
    const { festivals } = this.state;

    if (typeof festivals === "string" || festivals.length === 0)
      return <div>Cannot load data, please refresh the page later</div>;

    // Format original data to the structure required
    const formatedItems = this.transformFormat(festivals);

    return <ItemList list={formatedItems}></ItemList>;
  }
}

export default MainComponent;
