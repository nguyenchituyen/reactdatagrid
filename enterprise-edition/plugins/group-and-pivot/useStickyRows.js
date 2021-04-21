/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useMemo } from 'react';
const useStickyRows = (props, computedProps, computedPropsRef) => {
    const [stickyIndexes, setStickyGroupsIndexes] = useState(null);
    let stickyRows;
    if (computedProps.computedTreeEnabled) {
        stickyRows = props.stickyTreeNodes ? stickyIndexes : null;
    }
    else {
        stickyRows = props.stickyGroupRows ? stickyIndexes : null;
    }
    const computedStickyRows = useMemo(() => {
        const result = stickyRows == null ? stickyRows : { ...stickyRows };
        return result;
    }, [
        stickyRows,
        // any of the below should determine
        // sticky rows to be repainted,
        // as their "active" state or another state could change
        // so we force the sticky rows container to rerender
        // by doing this
        computedProps.rtl,
        computedProps.data,
        computedProps.size,
        computedProps.viewportAvailableWidth,
        computedProps.columnFlexes,
        computedProps.columnSizes,
        computedProps.lockedEndColumns,
        computedProps.lockedStartColumns,
        computedProps.visibleColumns,
        computedProps.computedActiveIndex,
    ]);
    return {
        computedStickyRows,
        setStickyGroupsIndexes,
    };
};
export default useStickyRows;
