import { renderHook, act } from "@testing-library/react-hooks";

import { usePortal } from "../src/use-portal";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "../src/constants";
import { containEl } from "../src/utils";

const attrName: string = "container-test";
const attrValue: string = "demo";

const divElement = document.createElement("div");

describe("usePortal", () => {
  it("default attribute", () => {
    const { result: originalResult, unmount } = renderHook(() => usePortal());

    expect(originalResult.current.getChild()).toStrictEqual(divElement);
    expect(originalResult.current.getContainer()?.childNodes[0]).toStrictEqual(
      originalResult.current.getChild()
    );

    const el = document.body.querySelector(
      `div[${CONTAINER_ATTR_NAME}="${CONTAINER_ATTR_VALUE}"]`
    );

    expect(el).not.toBeNull();

    unmount();
    expect(el).not.toBeNull();
    expect(originalResult.current.getContainer()?.innerHTML).toEqual("");
  });

  it("custom attribute", () => {
    const { result: customResult, unmount } = renderHook(() =>
      usePortal({ attrName, attrValue })
    );

    expect(customResult.current.getChild()).toStrictEqual(divElement);

    const el = document.body.querySelector(`div[${attrName}="${attrValue}"]`);

    expect(el).not.toBeNull();
    expect(el?.childNodes[0]).toStrictEqual(customResult.current.getChild());

    unmount();
    expect(el?.childNodes[0]).toBeUndefined();
  });

  it("Manual", () => {
    document.body.innerHTML = "";
    const el1 = document.createElement("span");
    const el2 = document.createElement("p");
    const { result, unmount, rerender } = renderHook(() => usePortal());

    expect(result.current.getContainer()?.childElementCount).toEqual(1);

    result.current.removeChild();
    expect(result.current.getContainer()?.childElementCount).toEqual(0);

    result.current.appendChild();
    expect(result.current.getContainer()?.childElementCount).toEqual(1);

    result.current.appendChild(el1);
    expect(result.current.getContainer()?.childElementCount).toEqual(2);
    result.current.appendChild(el2);
    expect(result.current.getContainer()?.childElementCount).toEqual(3);

    unmount();
    expect(result.current.getContainer()?.childElementCount).toEqual(2);
    expect(
      containEl(result.current.getContainer() as HTMLDivElement, el1)
    ).toBeTruthy();
    expect(
      containEl(result.current.getContainer() as HTMLDivElement, el2)
    ).toBeTruthy();
    expect(
      containEl(
        result.current.getContainer() as HTMLDivElement,
        result.current.getChild()
      )
    ).toBeFalsy();

    act(() => {
      rerender();
    });
    expect(result.current.getContainer()?.childElementCount).toEqual(2);
    expect(
      containEl(
        result.current.getContainer() as HTMLDivElement,
        result.current.getChild()
      )
    ).toBeFalsy();

    result.current.removeChild(el1);
    expect(result.current.getContainer()?.childElementCount).toEqual(1);
    expect(
      containEl(result.current.getContainer() as HTMLDivElement, el1)
    ).toBeFalsy();
  });

  it("Initial append: false", () => {
    document.body.innerHTML = "";
    const { result, rerender, unmount } = renderHook(() =>
      usePortal({ initialAppend: false })
    );

    const el = document.body.querySelector(
      `div[${CONTAINER_ATTR_NAME}="${CONTAINER_ATTR_VALUE}"]`
    );

    expect(el).not.toBeNull();
    expect(el?.childElementCount).toEqual(0);

    result.current.appendChild();
    unmount();
    expect(el?.childElementCount).toEqual(0);

    rerender();
    expect(el?.childElementCount).toEqual(0);

    result.current.appendChild();
    expect(el?.childElementCount).toEqual(1);
    result.current.removeChild();
    expect(el?.childElementCount).toEqual(0);
  });
});
