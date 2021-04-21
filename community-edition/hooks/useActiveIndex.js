/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import useProperty from './useProperty';
import { useCallback, useEffect, useRef } from 'react';
import clamp from '../utils/clamp';
import usePrevious from './usePrevious';
const useActiveIndex = (props, computedProps, computedPropsRef) => {
    let [computedActiveIndex, doSetActiveIndex] = useProperty(props, 'activeIndex', -1);
    if (!props.enableKeyboardNavigation) {
        computedActiveIndex = -1;
    }
    const setActiveIndex = useCallback((activeIndex) => {
        const computedProps = computedPropsRef.current;
        if (!computedProps ||
            !computedProps.computedHasRowNavigation ||
            global.isNaN(activeIndex)) {
            return;
        }
        const { data } = computedProps;
        activeIndex = clamp(activeIndex, 0, data.length - 1);
        if (activeIndex === computedProps.computedActiveIndex) {
            return;
        }
        doSetActiveIndex(activeIndex);
    }, []);
    const incrementActiveIndex = useCallback((inc) => {
        const computedProps = computedPropsRef.current;
        if (!computedProps) {
            return;
        }
        const computedActiveIndex = computedProps.computedActiveIndex;
        setActiveIndex(computedActiveIndex + inc);
    }, []);
    const getActiveItem = useCallback(() => {
        const computedProps = computedPropsRef.current;
        return computedProps
            ? computedProps.data[computedProps.computedActiveIndex]
            : null;
    }, []);
    const getFirstVisibleIndex = useCallback(() => {
        const computedProps = computedPropsRef.current;
        if (!computedProps) {
            return -1;
        }
        const scrollTop = computedProps.getScrollTop();
        return Math.ceil(scrollTop / props.rowHeight);
    }, [props.rowHeight]);
    const oldActiveIndex = usePrevious(computedActiveIndex, -1);
    useEffect(() => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (oldActiveIndex !== computedActiveIndex) {
            const top = computedActiveIndex < oldActiveIndex;
            computedProps.scrollToIndexIfNeeded(computedActiveIndex, { top });
        }
    }, [computedActiveIndex, oldActiveIndex]);
    computedProps.activeRowRef = useRef(null);
    return {
        computedActiveIndex,
        setActiveIndex,
        incrementActiveIndex,
        getActiveItem,
        getFirstVisibleIndex,
    };
};
export default useActiveIndex;
