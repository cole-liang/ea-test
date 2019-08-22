import React, { Component } from "react";
import * as festivalsAPI from "../services/festivalsService";

class Festivals extends Component {
  state = {
    festivals: []
  };

  async componentDidMount() {
    const festivals = await festivalsAPI.getFestivals();
    console.log(festivals);
    console.log(typeof festivals);
    this.setState({ festivals });
  }

  render() {
    const { festivals } = this.state;
    return festivals.map(festival => {
      return <div>{festival.name}</div>;
    });
  }
}

export default Festivals;
