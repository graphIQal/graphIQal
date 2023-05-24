export const checkIfVisible = (
  element: Element | null,
  parentElement: Element | null
) => {
  if (!element || !parentElement) return;
  const rect = element.getBoundingClientRect();
  const parent = parentElement.getBoundingClientRect();
  const viewHeight = parent.height;
  if (rect.bottom < parent.y + 2 * rect.height) return 'top';
  if (rect.top - viewHeight >= parent.y - 2 * rect.height) return 'bottom';
  return 'visible';
};
