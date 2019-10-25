import { renderHook } from "@testing-library/react-hooks";

import { usePortal } from "../src/use-portal";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "../src/constants";

const attrName: string = "container-test";
const attrValue: string = "demo";

const divElement: HTMLDivElement = document.createElement("div");

describe("usePortal", () => {
  it("default attribute", () => {
    const { result: originalResult } = renderHook(() => usePortal());

    expect(originalResult.current).toStrictEqual(divElement);

    const el = document.body.querySelector(
      `div[${CONTAINER_ATTR_NAME}="${CONTAINER_ATTR_VALUE}"]`
    );

    expect(el).not.toBeNull();
  });

  it("custom attribute", () => {
    const { result: customResult } = renderHook(() =>
      usePortal(attrName, attrValue)
    );

    expect(customResult.current).toStrictEqual(divElement);

    expect(
      document.querySelector<HTMLDivElement>(`div[${attrName}="${attrValue}"]`)
    ).not.toBeNull();
  });
});
