import { useDrag } from 'react-dnd';

// ELEMENTS
// Define a React component renderer for our code blocks.

//Question: do we want to drag multiple blocks at the same time?
export const CodeElement = (props: any) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'box',
    item: 'box',

    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));
  return (
    <pre ref={drag} style={{ opacity }} {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement = (props: any) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'box',
    item: 'box',

    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));
  return (
    <div ref={drag} style={{ opacity }} {...props.attributes}>
      {props.children}
    </div>
  );
};

export const Leaf = (props: any) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'box',
    item: 'box',

    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));
  if (props.leaf.italics) {
    console.log('leaf', props);
    return (
      <span
        ref={drag}
        {...props.attributes}
        className={props.leaf.text_type}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal', opacity }}
      >
        <em>{props.children}</em>
      </span>
    );
  }

  return (
    <span
      {...props.attributes}
      ref={drag}
      className={props.leaf.text_type}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal', opacity }}
    >
      {props.children}
    </span>
  );
};
