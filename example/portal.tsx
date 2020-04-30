import React, { useState, useEffect, useRef } from "react";
import { css, keyframes } from "emotion";
import { Transition } from "react-transition-group";

import Portal from "../src/portal";

interface IProps {
  show: boolean;
  onClose: () => void;
}

export default function Demo(props: IProps) {
  const { show, onClose } = props;
  const [exited, setExited] = useState<boolean>(!show);
  const [exiting, setExiting] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setExited(false);
    }
  }, [show]);

  if (exited) return null;

  return (
    <Portal>
      <Transition
        in={show && !exiting}
        timeout={300}
        onExiting={() => {
          setExiting(true);
        }}
        onExited={() => {
          setExiting(false);
          setExited(true);
        }}
      >
        {state => (
          <div
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            className={styleContext}
            data-state={state}
          >
            <div className={styleContent} style={{ zIndex: 100 }}>
              {`${state}  ${props.show}`}
              <p>{"content"}</p>
              <button onClick={onClose}>close</button>
            </div>
          </div>
        )}
      </Transition>
    </Portal>
  );
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const styleContext = css`
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
  }

  &[data-state="entering"]::before,
  &[data-state="entered"]::before {
    animation: ${fadeInAnimation} 300ms cubic-bezier(0, 0, 0.2, 1) both;
  }

  &[data-state="exiting"]::before,
  &[data-state="exited"]::before {
    animation: ${fadeOutAnimation} 300ms both;
  }
`;

const styleContent = css`
  background: #ffffff;
  padding: 16px;
  min-width: 200px;
`;
