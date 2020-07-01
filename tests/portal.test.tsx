import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen } from "@testing-library/react";

import Portal from "../src/portal";

const contentNode = <span>{"name"}</span>;
const attrName = "portal-container-test";
const attrValue = "portal-container-value";

describe("portal component custom", () => {
  it("container and children", () => {
    const { unmount } = render(
      <Portal attrName={attrName} attrValue={attrValue}>
        {contentNode}
      </Portal>
    );
    const containerEl = document.querySelector(
      `div[${attrName}="${attrValue}"]`
    );

    expect(containerEl).not.toBeNull();
    expect(containerEl?.children[0].innerHTML).toEqual(
      renderToStaticMarkup(contentNode)
    );

    expect(screen.getByText("name")).toBeTruthy();

    unmount();

    expect(containerEl?.childElementCount).toEqual(0);
  });
});
