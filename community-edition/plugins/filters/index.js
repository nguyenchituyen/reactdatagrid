/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import useFilters, { renderColumnFilterContextMenu } from './useFilters';
export default {
    name: 'filters',
    hook: useFilters,
    renderColumnFilterContextMenu,
    defaultProps: () => {
        return {
            columnFilterContextMenuConstrainTo: true,
            columnFilterContextMenuPosition: 'absolute',
        };
    },
};
