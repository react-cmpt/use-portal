import { FC, ReactNode, ReactPortal } from "react";
import ReactDom from "react-dom";
import { canUseDom } from "./utils";
import { containerAttrName, containerAttrValue } from "./constants";

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
  attrName: containerAttrName,
  attrValue: containerAttrValue,
};

const Portal: FC<PortalProps> = (props): ReactPortal | null => {
  if (!canUseDom) return null;

  const { attrName, attrValue, children, portalKey } = props;
  const element = usePortal(attrName, attrValue);

  return ReactDom.createPortal(children, element, portalKey);
};

Portal.defaultProps = defaultProps;

export default Portal;
