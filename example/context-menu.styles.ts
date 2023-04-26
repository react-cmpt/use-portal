import { css } from "emotion";

export const styleUl = css`
  list-style: none;
  padding: 0 2px;
  margin: 4px 0;
  font-size: 14px;

  li {
    padding: 4px 12px;
    cursor: pointer;

    &:hover {
      background: #d9d9d9;
    }
  }
`;

export const styleWrapper = css`
  width: 100%;
  height: 220px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
