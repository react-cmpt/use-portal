# use-portal

React partals with hooks

[![CI](https://github.com/react-cmpt/use-portal/workflows/CI/badge.svg?branch=master)](https://github.com/react-cmpt/use-portal/actions?query=workflow%3ACI)
[![Build Status](https://travis-ci.org/react-cmpt/use-portal.svg?branch=master)](https://travis-ci.org/react-cmpt/use-portal)
[![npm](https://img.shields.io/npm/v/@react-cmpt/use-portal.svg)](https://www.npmjs.com/package/@react-cmpt/use-portal)
[![GitHub license](https://img.shields.io/github/license/react-cmpt/use-portal)](https://github.com/react-cmpt/use-portal/blob/master/LICENSE)

## Usage

### Installation

```shell
yarn add @react-cmpt/use-portal
```

### usePortal

| options     | type   | default                | explain                    |
| ----------- | ------ | ---------------------- | -------------------------- |
| `attrName`  | string | "react-cmpt-container" | setAttribute qualifiedName |
| `attrValue` | string | ""                     | setAttribute value         |

```tsx
import { usePortal } from "@react-cmpt/use-portal";

const App = () => {
  // export content element and container ref
  const { element, ref } = usePortal();
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

### useEventPortal

| options           | type    | default                | explain                    |
| ----------------- | ------- | ---------------------- | -------------------------- |
| `defaultVisiable` | boolean | false                  | initial visiable value     |
| `attrName`        | string  | "react-cmpt-container" | setAttribute qualifiedName |
| `attrValue`       | string  | ""                     | setAttribute value         |
| `portalKey`       | string  | undefined              | createPortal key           |

```tsx
import { useEventPortal } from "@react-cmpt/use-portal";

const App = () => {
  const [Portal, visiable, onShow, onClose, element, ref] = useEventPortal({});

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

https://github.com/react-cmpt/rc-demo

## License

[MIT](./LICENSE)
