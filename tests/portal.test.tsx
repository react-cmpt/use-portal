import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mount } from "enzyme";

import Portal from "../src/portal";

const contentNode: JSX.Element = <span>{"name"}</span>;
const attrName: string = "prtal-container-test";
const attrValue: string = "prtal-container-value";

describe("portal component custom", () => {
  const wrapper = mount(
    <Portal attrName={attrName} attrValue={attrValue}>
      {contentNode}
    </Portal>
  );

  const container: HTMLDivElement | null = document.querySelector<
    HTMLDivElement
  >(`div[${attrName}="${attrValue}"]`);

  it("children", () => {
    expect(wrapper.children().html()).toEqual(
      renderToStaticMarkup(contentNode)
    );
  });

  it("container", () => {
    expect(container).not.toBeNull();
  });
});
