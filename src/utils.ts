export const canUseDom = !!(
  window?.document?.createElement &&
  typeof window.document.createElement === "function"
);

export function containEl(
  parentNode: HTMLElement,
  childrenNode: HTMLElement
): boolean {
  let contain = false;

  if (parentNode?.childNodes?.length > 0 && childrenNode) {
    for (let i = 0; i < parentNode.childNodes.length; i++) {
      if (parentNode.childNodes[i] === childrenNode) {
        contain = true;
      }
    }
  }

  return contain;
}
