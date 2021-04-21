import ResizeObserverPoly from 'resize-observer-polyfill';

export const setupResizeObserver = (
  node: HTMLElement,
  callback: (size: { width: number; height: number }) => void
): (() => void) => {
  const ResizeObs = (window as any).ResizeObserver || ResizeObserverPoly;

  const observer = new ResizeObs((entries: any[]) => {
    const first = entries[0];

    let { width, height } = first.contentRect;

    if (first.borderBoxSize?.[0]) {
      height = first.borderBoxSize[0].blockSize;
      width = first.borderBoxSize[0].inlineSize;
    } else {
      const box = node.getBoundingClientRect();
      height = box.height;
      width = box.width;
    }

    callback({ width, height });
  });

  observer.observe(node);

  return () => {
    observer.disconnect();
  };
};
