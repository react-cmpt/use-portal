import { useEffect, useRef, useCallback } from "react";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";
import { containEl, useRefFn } from "./utils";

export interface PortalOptions {
  /** Initial append @default true */
  initialAppend?: boolean;
  /** Attribute qualifiedName @default "react-cmpt-container" */
  attrName?: string;
  /** Attribute value @default "" */
  attrValue?: string;
  /** To set the container. @default document.body */
  getRootContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export interface PortalReturns {
  /** obtaining the current container mount child node. */
  getChild: () => HTMLElement;
  /** obtaining the container element. */
  getContainer: () => HTMLDivElement | null;
  /** append the child node. @default getChild() current node */
  appendChild: (element?: HTMLElement) => void;
  /** remove the child node. @default getChild() current node */
  removeChild: (element?: HTMLElement) => void;
}

/**
 * usePortal
 *
 * @param options PortalOptions {`initialAppend`, `attrName`, `attrValue`}
 */
export function usePortal(options?: PortalOptions): PortalReturns {
  const {
    initialAppend = true,
    attrName = CONTAINER_ATTR_NAME,
    attrValue = CONTAINER_ATTR_VALUE,
    getRootContainer,
  } = options || {};

  const isFirstMount = useRef(true);

  const refContainer = useRef<HTMLDivElement | null>(
    document.querySelector<HTMLDivElement>(`div[${attrName}="${attrValue}"]`)
  );
  const refElement = useRef<HTMLElement>(document.createElement("div"));

  const appendChild = useCallback((el?: HTMLElement) => {
    if (refContainer.current) {
      if (el instanceof HTMLElement && !containEl(refContainer.current, el)) {
        refContainer.current.appendChild(el);
      } else if (!containEl(refContainer.current, refElement.current)) {
        refContainer.current.appendChild(refElement.current);
      }
    }
  }, []);

  const removeChild = useCallback((el?: HTMLElement) => {
    if (refContainer.current) {
      if (el instanceof HTMLElement && containEl(refContainer.current, el)) {
        refContainer.current.removeChild(el);
      } else if (containEl(refContainer.current, refElement.current)) {
        refContainer.current.removeChild(refElement.current);
      }
    }
  }, []);

  const getChild = useCallback(() => refElement.current, []);

  const getContainer = useCallback(() => refContainer.current, []);

  const _getRootContainer = useRefFn(getRootContainer);

  useEffect(() => {
    refContainer.current = document.querySelector<HTMLDivElement>(
      `div[${attrName}="${attrValue}"]`
    );

    if (!refContainer.current) {
      refContainer.current = document.createElement("div");
      refContainer.current.setAttribute(attrName, attrValue);

      let _root = document.body;
      if (
        _getRootContainer.current &&
        typeof _getRootContainer.current === "function"
      ) {
        const __r = _getRootContainer.current(refContainer.current);
        if (__r) {
          _root = __r;
        } else {
          console.warn(
            "[@react-cmpt/use-portal] `getRootContainer` need to return HTMLElement.",
            __r
          );
        }
      }
      _root.appendChild(refContainer.current);
    }

    if ((initialAppend && isFirstMount.current) || !isFirstMount.current) {
      appendChild();
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
    }

    return removeChild;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeChild, appendChild, initialAppend, attrName, attrValue]);

  return {
    getChild,
    getContainer,
    appendChild,
    removeChild,
  };
}
