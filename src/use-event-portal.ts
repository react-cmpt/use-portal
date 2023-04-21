import type { ReactNode, ReactPortal } from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { PortalReturns, PortalOptions } from "./use-portal";
import { usePortal } from "./use-portal";

export interface EventPortalOptions
  extends Pick<PortalOptions, "attrName" | "attrValue" | "getRootContainer"> {
  /** initial visiable value */
  defaultVisiable?: boolean;
  /** createPortal key */
  portalKey?: string;
}

/**
 * Returns
 * simple FunctionComponent,
 * children visiabled state,
 * show function,
 * close function,
 * mount element
 * and getChild getContainer
 *
 * @param options
 */
export const useEventPortal = (
  options?: EventPortalOptions
): {
  Portal: ({ children }: { children: ReactNode }) => ReactPortal | null;
  visiable: boolean;
  onShow: () => void;
  onClose: () => void;
  getChild: PortalReturns["getChild"];
  getContainer: PortalReturns["getContainer"];
} => {
  const {
    defaultVisiable = false,
    attrName,
    attrValue,
    portalKey,
    getRootContainer,
  } = options || {};

  const mounted = useRef<boolean>();
  const { getChild, getContainer, appendChild, removeChild } = usePortal({
    attrName,
    attrValue,
    initialAppend: defaultVisiable,
    getRootContainer,
  });
  const [visiable, setVisiable] = useState<boolean>(defaultVisiable);

  const onShow = useCallback(() => {
    if (mounted.current) {
      setVisiable(true);
      appendChild();
    }
  }, [appendChild]);

  const onClose = useCallback(() => {
    if (mounted.current) {
      setVisiable(false);
      removeChild();
    }
  }, [removeChild]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (visiable) return createPortal(children, getChild(), portalKey);

      return null;
    },
    [getChild, visiable, portalKey]
  );

  return {
    Portal,
    visiable,
    onShow,
    onClose,
    getChild,
    getContainer,
  };
};
