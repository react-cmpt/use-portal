import type { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";
import React, { useCallback, useMemo, useRef } from "react";

import type {
  EventPortalOptions,
  EventPortalReturns,
} from "./use-event-portal";
import { useEventPortal } from "./use-event-portal";

export type UseContextMenuOptions = Pick<
  EventPortalOptions,
  "attrName" | "attrValue" | "getRootContainer" | "portalKey"
> & {
  disabledBodyListener?: boolean;
};

type _NodeProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

export type UseContextMenuReturns = [
  {
    Wrapper: FC<_NodeProps>;
    Trigger: FC<_NodeProps>;
  },
  Pick<EventPortalReturns, "visiable" | "getContainer"> & {
    getTrigger: () => HTMLElement | null;
    getWrapper: () => HTMLElement | null;
    show: () => void;
    close: () => void;
  }
];

const useContextMenu = (
  options?: UseContextMenuOptions
): UseContextMenuReturns => {
  const { ...rest } = options || {};

  const { Portal, onShow, onClose, visiable, getContainer } =
    useEventPortal(rest);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const _resizePosition = useCallback((clientX: number, clientY: number) => {
    if (!wrapperRef.current) return;

    const windowInnerWidth =
      typeof window !== "undefined" ? window.innerWidth : 0;
    const windowInnerHeight =
      typeof window !== "undefined" ? window.innerHeight : 0;

    const viewW = triggerRef.current
      ? triggerRef.current.offsetLeft + triggerRef.current.offsetWidth
      : windowInnerWidth;
    const viewH = triggerRef.current
      ? triggerRef.current.offsetTop + triggerRef.current.offsetHeight
      : windowInnerHeight;

    const rootW = wrapperRef.current.offsetWidth || 0;
    const rootH = wrapperRef.current.offsetHeight || 0;

    const right = viewW - clientX > rootW || windowInnerWidth - clientX > rootW;
    const top = viewH - clientY > rootH || windowInnerHeight - clientY > rootH;

    wrapperRef.current.style.visibility = "visible";

    if (right) {
      wrapperRef.current.style.left = `${clientX + 5}px`;
    } else {
      wrapperRef.current.style.left = `${clientX - rootW - 5}px`;
    }

    if (top) {
      wrapperRef.current.style.top = `${clientY + 5}px`;
    } else {
      wrapperRef.current.style.top = `${clientY - rootH - 5}px`;
    }
  }, []);

  const _handleContextMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      onShow();
      const clickX = e.clientX;
      const clickY = e.clientY;

      // push to queue
      setTimeout(() => {
        _resizePosition(clickX, clickY);
      }, 0);
    },
    [_resizePosition, onShow]
  );
  const _handleScroll = useCallback(() => {
    onClose();
  }, [onClose]);
  const _handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      const _outside = !(e.target as HTMLElement).contains(wrapperRef.current);

      if (_outside) {
        onClose();
      }
    },
    [onClose]
  );

  const Trigger: FC<_NodeProps> = useMemo(
    () => (props) =>
      (
        <div
          {...props}
          ref={triggerRef}
          onContextMenu={_handleContextMenu}
          onScroll={_handleScroll}
          onClick={_handleClick}
        >
          {props.children}
        </div>
      ),
    [_handleClick, _handleContextMenu, _handleScroll]
  );

  const Wrapper: FC<_NodeProps> = useMemo(
    () => (props) =>
      (
        <Portal>
          <div
            {...props}
            ref={wrapperRef}
            style={{ position: "fixed", visibility: "hidden", ...props.style }}
          >
            {props.children}
          </div>
        </Portal>
      ),
    [Portal]
  );

  const getTrigger = useCallback(() => triggerRef.current, []);
  const getWrapper = useCallback(() => wrapperRef.current, []);

  const actions = useMemo(
    () => ({
      getContainer,
      getTrigger,
      getWrapper,
      show: onShow,
      close: onClose,
      visiable,
    }),
    [getContainer, getTrigger, getWrapper, onClose, onShow, visiable]
  );

  return [{ Wrapper, Trigger }, actions];
};

export default useContextMenu;
