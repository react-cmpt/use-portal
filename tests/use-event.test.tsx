import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderHook, act } from "@testing-library/react-hooks";
import { mount } from "enzyme";

import { useEventPortal } from "../src/use-event-portal";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "../src/constants";

const contentNode: JSX.Element = <span>{"name"}</span>;

describe("useEventPortal", () => {
  it("default", () => {
    const { result } = renderHook(() => useEventPortal({}));
    const { onShow, onClose } = result.current;

    const el = document.body.querySelector(
      `div[${CONTAINER_ATTR_NAME}="${CONTAINER_ATTR_VALUE}"]`
    );

    expect(el).not.toBeNull();

    expect(result.current.visiable).toEqual(false);

    const Portal1 = result.current.Portal;
    expect(mount(<Portal1>{contentNode}</Portal1>).html()).toBeNull();
    expect(result.current.element.innerHTML).toEqual("");

    act(() => {
      onShow();
    });

    expect(result.current.visiable).toEqual(true);

    const Portal2 = result.current.Portal;
    expect(mount(<Portal2>{contentNode}</Portal2>).html()).toEqual(
      renderToStaticMarkup(contentNode)
    );
    expect(result.current.element.innerHTML).toEqual(
      renderToStaticMarkup(contentNode)
    );

    act(() => {
      onClose();
    });

    expect(result.current.visiable).toEqual(false);

    const Portal3 = result.current.Portal;
    expect(mount(<Portal3>{contentNode}</Portal3>).html()).toBeNull();
  });

  it("defaultVisiable: true", () => {
    const { result } = renderHook(() =>
      useEventPortal({ defaultVisiable: true })
    );

    expect(result.current.visiable).toEqual(true);

    const Portal1 = result.current.Portal;
    expect(mount(<Portal1>{contentNode}</Portal1>).html()).toEqual(
      renderToStaticMarkup(contentNode)
    );

    act(() => {
      result.current.onClose();
    });

    expect(result.current.visiable).toEqual(false);

    const Portal2 = result.current.Portal;
    expect(mount(<Portal2>{contentNode}</Portal2>).html()).toBeNull();

    act(() => {
      result.current.onShow();
    });

    expect(result.current.visiable).toEqual(true);

    const Portal3 = result.current.Portal;
    expect(mount(<Portal3>{contentNode}</Portal3>).html()).toEqual(
      renderToStaticMarkup(contentNode)
    );
  });
});
