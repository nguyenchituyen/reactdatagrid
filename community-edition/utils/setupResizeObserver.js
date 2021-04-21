import ResizeObserverPoly from 'resize-observer-polyfill';
export const setupResizeObserver = (node, callback) => {
    const ResizeObs = window.ResizeObserver || ResizeObserverPoly;
    const observer = new ResizeObs((entries) => {
        const first = entries[0];
        let { width, height } = first.contentRect;
        if (first.borderBoxSize?.[0]) {
            height = first.borderBoxSize[0].blockSize;
            width = first.borderBoxSize[0].inlineSize;
        }
        else {
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
