import React, { useState } from "react";
import { css } from "emotion";

import { Portal } from "../src/index";

interface IProps {}

export default function App(props: IProps) {
  return (
    <div className={styleApp}>
      <Portal>
        <div>{"div"}</div>
      </Portal>
    </div>
  );
}

const styleApp = css`
  text-align: center;
`;
