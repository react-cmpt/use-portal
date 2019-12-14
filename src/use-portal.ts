import { useEffect, useRef, MutableRefObject } from "react";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";
import { containEl } from "./utils";

export type ContainerElRef = MutableRefObject<HTMLElement | null | undefined>;

/**
 * usePortal
 *
 * @param {string} attrName @default "react-cmpt-container"
 * @param {string} attrValue @default ""
 */
export function usePortal(
  attrName: string = CONTAINER_ATTR_NAME,
  attrValue: string = CONTAINER_ATTR_VALUE
): { element: HTMLElement; ref: ContainerElRef } {
  const refContainer = useRef<HTMLDivElement | null>();
  const refElement = useRef<HTMLElement>(document.createElement("div"));

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
      if (
        refContainer.current &&
        containEl(refContainer.current, refElement.current)
      ) {
        refContainer.current.removeChild(refElement.current);
      }
    };
  }, []);

  return { element: refElement.current, ref: refContainer };
}
