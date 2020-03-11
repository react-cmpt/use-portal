export const canUseDom = !!(
  window?.document?.createElement &&
  typeof window.document.createElement === "function"
);

export function containEl(
  parentNode: HTMLElement,
  childrenNode: HTMLElement
): boolean {
  let contain = false;

  if (parentNode?.childNodes && childrenNode) {
    parentNode.childNodes.forEach(i => {
      if (i === childrenNode) {
        contain = true;
      }
    });
  }

  return contain;
}
