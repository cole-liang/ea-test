import React from "react";
import { shallow } from "enzyme";
import ItemList from "./../../components/itemList";

describe("ItemList component test", () => {
  const list = require("../../resourses/festivals.json");
  const wrapper = shallow(<ItemList list={list}></ItemList>);

  it("should render ItemList", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
