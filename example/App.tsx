import React, { useState } from "react";
import { css } from "emotion";

import PortalDemo from "./portal";
import EventPortalDemo from "./event-portal";

export default function App() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styleApp}>
      <div className={styleItem}>
        <p>{"Portal Demo:"}</p>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          {"show"}
        </button>
        <p>{`show: ${show}`}</p>
        <PortalDemo
          show={show}
          onClose={() => {
            setShow(false);
          }}
        />
      </div>
      <div className={styleItem}>
        <p>{"useEventPortal Demo:"}</p>
        <EventPortalDemo />
      </div>
    </div>
  );
}

const styleApp = css`
  text-align: center;
`;

const styleItem = css`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
  padding: 16px;
`;
