import React, { useState } from "react";
import { css } from "emotion";

import Demo from "../src";

interface IProps {}

export default function App(props: IProps) {
  return (
    <div className={styleApp}>
      <Demo />
    </div>
  );
}

const styleApp = css`
  text-align: center;
`;
