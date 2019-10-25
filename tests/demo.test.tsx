import React from "react";
import { shallow } from "enzyme";

import Demo from "../src";

test("Demo component text", () => {
  const demo = shallow(<Demo />);

  expect(demo.text()).toEqual("demo");
});
