import type { FC, ReactNode, ReactPortal } from "react";
import { useCallback } from "react";
import ReactDom from "react-dom";
import { canUseDom } from "./utils";
import { CONTAINER_ATTR_NAME, CONTAINER_ATTR_VALUE } from "./constants";

import type { PortalOptions } from "./use-portal";
import { usePortal } from "./use-portal";

export interface PortalProps
  extends Pick<PortalOptions, "attrName" | "attrValue" | "getRootContainer"> {
  children: ReactNode;
  /** createPortal key */
  portalKey?: string;
}

const defaultProps: Partial<PortalProps> = {
  attrName: CONTAINER_ATTR_NAME,
  attrValue: CONTAINER_ATTR_VALUE,
};

const Portal: FC<PortalProps> = (props): ReactPortal | null => {
  const { attrName, attrValue, children, portalKey, getRootContainer } = props;

  const { getChild } = usePortal({ attrName, attrValue, getRootContainer });

  const portal = useCallback(
    (children: ReactNode) => {
      if (!canUseDom) return null;

      return ReactDom.createPortal(children, getChild(), portalKey);
    },
    [getChild, portalKey]
  );

  return portal(children);
};

Portal.defaultProps = defaultProps;

export default Portal;
