import React from "react";

import { useEventPortal } from "../src/use-event-portal";

const EventPortalDemo = () => {
  const { Portal, visiable, onShow, onClose } = useEventPortal({});

  return (
    <div>
      <div>
        <button onClick={onShow}>onshow</button>
        <button onClick={onClose}>onclose</button>
        <p>
          {"visiable: "}
          {`${visiable}`}
        </p>
      </div>
      <Portal>
        <div>{"use event portal"}</div>
      </Portal>
    </div>
  );
};

export default EventPortalDemo;
