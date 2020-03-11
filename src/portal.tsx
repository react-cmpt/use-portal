import { FC, ReactNode, ReactPortal, useCallback } from "react";
import ReactDom from "react-dom";
import { canUseDom } from "./utils";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";

import { usePortal } from "./use-portal";

export interface PortalProps {
  /** setAttribute qualifiedName @default "react-cmpt-container" */
  attrName?: string;
  /** setAttribute value @default "" */
  attrValue?: string;
  children: ReactNode;
  /** createPortal key */
  portalKey?: string;
}

const defaultProps: Partial<PortalProps> = {
  attrName: CONTAINER_ATTR_NAME,
  attrValue: CONTAINER_ATTR_VALUE,
};

const Portal: FC<PortalProps> = (props): ReactPortal | null => {
  const { attrName, attrValue, children, portalKey } = props;

  const { element } = usePortal(attrName, attrValue);

  const portal = useCallback(
    (children: ReactNode) => {
      if (!canUseDom) return null;

      return ReactDom.createPortal(children, element, portalKey);
    },
    [element, portalKey]
  );

  return portal(children);
};

Portal.defaultProps = defaultProps;

export default Portal;
