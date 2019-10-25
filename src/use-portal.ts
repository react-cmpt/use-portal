import { useEffect, useRef } from "react";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";

/**
 * usePortal
 *
 * @param {string} attrName @default "react-cmpt-container"
 * @param {string} attrValue @default ""
 */
export function usePortal(
  attrName: string = CONTAINER_ATTR_NAME,
  attrValue: string = CONTAINER_ATTR_VALUE
): HTMLDivElement {
  const refContainer = useRef<HTMLDivElement | null>();
  const refElement = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    refContainer.current = document.querySelector<HTMLDivElement>(
      `div[${attrName}="${attrValue}"]`
    );

    if (!refContainer.current) {
      refContainer.current = document.createElement("div");
      refContainer.current.setAttribute(attrName, attrValue);
      document.body.append(refContainer.current);
    }

    refContainer.current.append(refElement.current);

    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(refElement.current);
      }
    };
  }, []);

  return refElement.current;
}
