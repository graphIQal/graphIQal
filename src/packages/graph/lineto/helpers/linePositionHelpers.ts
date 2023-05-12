/**
 * Helper functions for the line drawing including calculating anchors
 */

//Parses anchor percentage
export const parseAnchorPercent = (value: string) => {
  const percent = parseFloat(value) / 100;
  if (isNaN(percent) || !isFinite(percent)) {
    throw new Error(`LinkTo could not parse percent value "${value}"`);
  }
  return percent;
};

//Parses anchor text passed in as "top middle" for example
export const parseAnchorText = (value: string) => {
  // Try to infer the relevant axis.
  switch (value) {
    case 'top':
      return { y: 0 };
    case 'left':
      return { x: 0 };
    case 'middle':
      return { y: 0.5 };
    case 'center':
      return { x: 0.5 };
    case 'bottom':
      return { y: 1 };
    case 'right':
      return { x: 1 };
  }
  return null;
};

//Calculates what the anchor should be based on positioning of boxes
export const calcAnchor = (a: Element, b: Element) => {
  // const first = a.querySelector('.resizable');
  // const second = b.querySelector('.resizable');
  const first = a;
  const second = b;
  if (!first || !second) return;
  const box0 = first.getBoundingClientRect();
  const box1 = second.getBoundingClientRect();

  let fromAnchor = '';
  let toAnchor = '';
  if (box0.top + box0.height < box1.top) {
    fromAnchor += 'bottom';
    toAnchor += 'top';
  } else if (box1.top + box1.height < box0.top) {
    fromAnchor += 'top';
    toAnchor += 'bottom';
  } else {
    fromAnchor += 'center';
    toAnchor += 'center';
  }

  if (box0.left + box0.width < box1.left) {
    fromAnchor += ' right';
    toAnchor += ' left';
  } else if (box1.left + box1.width < box0.left) {
    fromAnchor += ' left';
    toAnchor += ' right';
  } else {
    fromAnchor += ' center';
    toAnchor += ' center';
  }

  return { fromAnchor: fromAnchor, toAnchor: toAnchor };
};

// Parses anchor passed in to see if percentage or text
export const parseAnchor = (
  value: string,
  defaultAnchor: { x: number; y: number }
) => {
  if (!value) {
    return false;
  }
  const parts = value.split(' ');
  if (parts.length > 2) {
    throw new Error('LinkTo anchor format is "<x> <y>"');
  }
  const [x, y] = parts;
  return Object.assign(
    {},
    defaultAnchor,
    x ? parseAnchorText(x) || { x: parseAnchorPercent(x) } : {},
    y ? parseAnchorText(y) || { y: parseAnchorPercent(y) } : {}
  );
};

// Finds element by its ID
export const findElement = (id: string) => {
  return document.getElementById(id);
};
