# use-portal

React partals with hooks

[![](https://img.shields.io/npm/v/@react-cmpt/use-portal.svg)](https://www.npmjs.com/package/@react-cmpt/use-portal)

## Usage

### Installation

```shell
yarn add @react-cmpt/use-portal
```

### usePortal

| props       | type   | default                | explain                    |
| ----------- | ------ | ---------------------- | -------------------------- |
| `attrName`  | string | "react-cmpt-container" | setAttribute qualifiedName |
| `attrValue` | string | ""                     | setAttribute value         |

```tsx
import { usePortal } from "@react-cmpt/use-portal";

const App = () => {
  // export content element
  const element = usePortal();
};
```

### Portal

| props       | type   | default                | explain                    |
| ----------- | ------ | ---------------------- | -------------------------- |
| `attrName`  | string | "react-cmpt-container" | setAttribute qualifiedName |
| `attrValue` | string | ""                     | setAttribute value         |
| `portalKey` | string | undefined              | createPortal key           |

```tsx
import { Portal } from "@react-cmpt/use-portal";

const App = () => {
  return (
    <Portal>
      <span>{"hello"}</span>
    </Portal>
  );
};
```

### Dev

```shell
# example
yarn example

# build package
yarn build

# tests
yarn test
```

## workflow

https://github.com/wangcch/react-ts-parcel-workflow
