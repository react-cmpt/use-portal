import React, { FC, useState } from "react";
import { css } from "emotion";

import PortalDemo from "./portal";
import EventPortalDemo from "./event-portal";

const Source: FC<{ url: string }> = (props) => {
  return (
    <a href={props.url} target={"_blank"}>
      {"source"}
    </a>
  );
};

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
        <Source url="https://github.com/react-cmpt/use-portal/blob/master/example/portal.tsx" />
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
        <Source url="https://github.com/react-cmpt/use-portal/blob/master/example/event-portal.tsx" />
      </div>
    </div>
  );
}

const styleApp = css`
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
`;

const styleItem = css`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e5e5e5;
  margin-bottom: 16px;
  padding: 16px;
`;
