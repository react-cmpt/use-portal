import {
  ReactNode,
  useCallback,
  useState,
  useEffect,
  ReactPortal,
} from "react";
import { createPortal } from "react-dom";

import { usePortal, PortalReturns } from "./use-portal";

export interface EventPortalOptions {
  /** initial visiable value */
  defaultVisiable?: boolean;

  /** setAttribute qualifiedName @default "react-cmpt-container" */
  attrName?: string;
  /** setAttribute value @default "" */
  attrValue?: string;
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
 * and container ref
 *
 * @param options
 */
export const useEventPortal = (
  options: EventPortalOptions
): {
  Portal: ({ children }: { children: ReactNode }) => ReactPortal | null;
  visiable: boolean;
  onShow: () => void;
  onClose: () => void;
  getChild: PortalReturns["getChild"];
  getContainer: PortalReturns["getContainer"];
} => {
  const { defaultVisiable = false, attrName, attrValue, portalKey } = options;
  const { getChild, getContainer, appendChild, removeChild } = usePortal(
    attrName,
    attrValue
  );
  const [visiable, setVisiable] = useState<boolean>(defaultVisiable);

  const onShow = useCallback(() => {
    setVisiable(true);
  }, []);

  const onClose = useCallback(() => {
    setVisiable(false);
  }, []);

  useEffect(() => {
    if (visiable) {
      appendChild();
    } else {
      removeChild();
    }
  }, [appendChild, removeChild, visiable]);

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
