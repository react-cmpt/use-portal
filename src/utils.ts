export const canUseDom: boolean = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export function containEl(
  parentNode: HTMLElement,
  childrenNode: HTMLElement
): boolean {
  let contain: boolean = false;

  if (parentNode && parentNode.childNodes && childrenNode) {
    parentNode.childNodes.forEach(i => {
      if (i === childrenNode) {
        contain = true;
      }
    });
  }

  return contain;
}
