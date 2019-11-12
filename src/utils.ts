export const canUseDom: boolean = !!window?.document?.createElement;

export function containEl(
  parentNode: HTMLElement,
  childrenNode: HTMLElement
): boolean {
  let contain: boolean = false;

  if (parentNode?.childNodes && childrenNode) {
    parentNode.childNodes.forEach(i => {
      if (i === childrenNode) {
        contain = true;
      }
    });
  }

  return contain;
}
