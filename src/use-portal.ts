import { useEffect, useRef, useCallback } from "react";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";
import { containEl } from "./utils";

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
 * @param {string} attrName @default "react-cmpt-container"
 * @param {string} attrValue @default ""
 */
export function usePortal(
  attrName: string = CONTAINER_ATTR_NAME,
  attrValue: string = CONTAINER_ATTR_VALUE
): PortalReturns {
  const refContainer = useRef<HTMLDivElement | null>(null);
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

  const cleanChildEl = () => {
    if (
      refContainer.current &&
      refElement.current &&
      containEl(refContainer.current, refElement.current)
    ) {
      refContainer.current.removeChild(refElement.current);
    }
  };

  useEffect(() => {
    refContainer.current = document.querySelector<HTMLDivElement>(
      `div[${attrName}="${attrValue}"]`
    );

    if (!refContainer.current) {
      refContainer.current = document.createElement("div");
      refContainer.current.setAttribute(attrName, attrValue);
      document.body.appendChild(refContainer.current);
    }

    refContainer.current.appendChild(refElement.current);

    return () => {
      cleanChildEl();
    };
  }, [attrName, attrValue]);

  return {
    getChild,
    getContainer,
    appendChild,
    removeChild,
  };
}
