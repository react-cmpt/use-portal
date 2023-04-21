import { useRef, useEffect } from "react";

export const canUseDom = !!(
  typeof window !== "undefined" &&
  window?.document?.createElement &&
  typeof window.document.createElement === "function"
);

export function containEl(
  parentNode: HTMLElement,
  childrenNode: HTMLElement
): boolean {
  let contain = false;

  if (parentNode?.childNodes?.length > 0 && childrenNode) {
    for (let i = 0; i < parentNode.childNodes.length; i++) {
      if (parentNode.childNodes[i] === childrenNode) {
        contain = true;
      }
    }
  }

  return contain;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function useRefFn<T = (...args: any) => any>(fn: T) {
  const refFn = useRef(fn);

  useEffect(() => {
    refFn.current = fn;
  }, [fn]);

  return refFn;
}
