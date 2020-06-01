import {
  ReactNode,
  useCallback,
  useState,
  useEffect,
  ReactPortal,
} from "react";
import { createPortal } from "react-dom";

import { usePortal, ContainerElRef } from "./use-portal";
import { containEl } from "./utils";

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
  element: HTMLElement;
  containerElmentRef: ContainerElRef;
} => {
  const { defaultVisiable = false, attrName, attrValue, portalKey } = options;
  const { element, ref } = usePortal(attrName, attrValue);
  const [visiable, setVisiable] = useState<boolean>(defaultVisiable);

  const onShow = useCallback(() => {
    setVisiable(true);
  }, []);

  const onClose = useCallback(() => {
    setVisiable(false);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const contain = containEl(ref.current, element);

      if (visiable && !contain) {
        ref.current.appendChild(element);
      } else if (!visiable && contain) {
        ref.current.removeChild(element);
      }
    }
  }, [element, ref, visiable]);

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (visiable) return createPortal(children, element, portalKey);

      return null;
    },
    [element, visiable, portalKey]
  );

  return {
    Portal,
    visiable,
    onShow,
    onClose,
    element,
    containerElmentRef: ref,
  };
};
