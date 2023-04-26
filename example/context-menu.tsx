import React from "react";

import useContextMenu from "../src/use-context-menu";
import * as styles from "./context-menu.styles";

const ContextMenuDemo = () => {
  const [Node, actions] = useContextMenu();

  return (
    <div>
      <Node.Trigger>
        <div className={styles.styleWrapper}>right click</div>
      </Node.Trigger>

      <Node.Wrapper>
        <div style={{ border: "1px solid #d9d9d9", background: "white" }}>
          <ul className={styles.styleUl} onClick={() => actions.close()}>
            <li>option01</li>
            <li>option02</li>
            <li>option03</li>
            <li>option04</li>
            <li>option05</li>
            <li>option06</li>
          </ul>
        </div>
      </Node.Wrapper>

      <hr />

      <div style={{ textAlign: "left" }}>
        Paragraph{" "}
        <Node.Trigger
          style={{
            background: "#36cfc9",
            display: "inline",
            marginRight: "8px",
          }}
        >
          right click
        </Node.Trigger>
        Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph
      </div>
    </div>
  );
};

export default ContextMenuDemo;
