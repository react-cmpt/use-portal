import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen, queryHelpers } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useEventPortal } from "../src/use-event-portal";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "../src/constants";

const contentNode = <span>{"name"}</span>;

describe("useEventPortal", () => {
  it("default", () => {
    const { result, unmount } = renderHook(() => useEventPortal({}));
    const { onShow, onClose } = result.current;

    const el = document.body.querySelector(
      `div[${CONTAINER_ATTR_NAME}="${CONTAINER_ATTR_VALUE}"]`
    );

    expect(el).not.toBeNull();

    expect(result.current.visiable).toEqual(false);

    const Portal1 = result.current.Portal;
    const { rerender: reactRerender } = render(
      <Portal1>{contentNode}</Portal1>
    );

    expect(el?.childElementCount).toEqual(0);
    expect(result.current.getChild().innerHTML).toEqual("");

    act(() => {
      onShow();
    });

    expect(result.current.visiable).toEqual(true);

    const Portal2 = result.current.Portal;
    reactRerender(<Portal2>{contentNode}</Portal2>);

    expect(el?.childElementCount).toEqual(1);
    expect(screen.getByText("name")).toBeTruthy();
    expect(result.current.getChild().innerHTML).toEqual(
      renderToStaticMarkup(contentNode)
    );

    act(() => {
      onClose();
    });

    expect(result.current.visiable).toEqual(false);

    const Portal3 = result.current.Portal;
    reactRerender(<Portal3>{contentNode}</Portal3>);
    expect(el?.childElementCount).toEqual(0);

    act(() => {
      onShow();
    });

    expect(el?.childElementCount).toEqual(1);

    unmount();

    act(() => {
      onShow();
    });

    expect(el?.childElementCount).toEqual(0);
  });

  it("defaultVisiable: true", () => {
    const { result } = renderHook(() =>
      useEventPortal({ defaultVisiable: true })
    );

    const containerEl = queryHelpers.queryByAttribute(
      CONTAINER_ATTR_NAME,
      document.body,
      CONTAINER_ATTR_VALUE
    );

    expect(result.current.visiable).toEqual(true);

    const Portal1 = result.current.Portal;
    const { rerender: reactRerender } = render(
      <Portal1>{contentNode}</Portal1>
    );
    expect(screen.getByText("name")).toBeTruthy();
    expect(containerEl?.childElementCount).toEqual(1);
    expect(containerEl?.children[0].innerHTML).toStrictEqual(
      renderToStaticMarkup(contentNode)
    );

    act(() => {
      result.current.onClose();
    });

    expect(result.current.visiable).toEqual(false);

    const Portal2 = result.current.Portal;
    reactRerender(<Portal2>{contentNode}</Portal2>);
    expect(containerEl?.childElementCount).toEqual(0);

    act(() => {
      result.current.onShow();
    });

    expect(result.current.visiable).toEqual(true);

    const Portal3 = result.current.Portal;
    reactRerender(<Portal3>{contentNode}</Portal3>);
    expect(containerEl?.childElementCount).toEqual(1);
    expect(containerEl?.children[0].innerHTML).toStrictEqual(
      renderToStaticMarkup(contentNode)
    );
  });
});
