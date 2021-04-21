/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */

import useProperty from '@inovua/reactdatagrid-community/hooks/useProperty';
import {
  TypeGroupBy,
  TypeDataGridProps,
  TypeComputedProps,
  TypeCollapsedGroups,
  TypeComputedColumnsMap,
  TypeGetColumnByParam,
  TypeComputedColumn,
  TypeExpandedGroups,
} from '../../types';
import {
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from 'react';

import computeData from '@inovua/reactdatagrid-community/hooks/useDataSource/computeData';
import batchUpdate from '@inovua/reactdatagrid-community/utils/batchUpdate';
import isControlledValue from '@inovua/reactdatagrid-community/utils/isControlledValue';

const keepValidGroupBy = (
  groupBy: TypeGroupBy,
  columnsMap: TypeComputedColumnsMap
) => {
  if (groupBy && groupBy.length) {
    return groupBy
      .map((colId: string) => {
        if (!columnsMap) {
          return undefined;
        }
        const col = columnsMap[colId];

        if (!col) {
          return undefined;
        }

        return col.id || col.name;
      })
      .filter(x => !!x) as TypeGroupBy;
  }

  return groupBy;
};
const useGroupBy = (
  props: TypeDataGridProps,
  computedProps: TypeComputedProps,
  computedPropsRef: MutableRefObject<TypeComputedProps | null>
): {
  computedGroupBy: TypeGroupBy;
  setGroupBy: (groupBy: TypeGroupBy) => void;
  isGroupCollapsed: (group: any) => boolean;

  setComputedGroupRelatedInfo: Dispatch<SetStateAction<any>>;
  computedCollapsedGroups: TypeCollapsedGroups;
  computedExpandedGroups: TypeExpandedGroups;
  computedIndexesInGroups: any;
  computedGroupArray: object[];
  onGroupByChange: (groupBy: TypeGroupBy) => void;
  onGroupToggle: (group: string[]) => void;
  toggleGroup: (group: any) => void;
  expandGroup: (group: { keyPath: string[] } | string[]) => void;
  collapseGroup: (group: { keyPath: string[] } | string[]) => void;
  removeGroupByColumn: (column: TypeGetColumnByParam) => void;
  addGroupByColumn: (column: TypeGetColumnByParam) => void;
  collapseAllGroups: () => void;
  expandAllGroups: () => void;
} => {
  const [computedGroupBy, initialSetGroupBy] = useProperty<TypeGroupBy>(
    props,
    'groupBy'
  );

  const [computedGroupRelatedInfo, setComputedGroupRelatedInfo] = useState({
    computedIndexesInGroups: {},
    computedGroupArray: [],
    computedGroupKeys: {},
  });

  const [computedCollapsedGroups, setCollapsedGroups] = useProperty<
    TypeCollapsedGroups
  >(props, 'collapsedGroups', undefined, {
    onChange: () => {},
  });

  const setCollapsedAndExpanded = useCallback(
    ({
      collapsedGroups,
      expandedGroups,
    }: {
      collapsedGroups: TypeCollapsedGroups;
      expandedGroups: TypeExpandedGroups;
    }) => {
      const { current: computedProps } = computedPropsRef;
      if (!computedProps) {
        return;
      }

      const queue = batchUpdate();

      queue.commit(() => {
        setCollapsedGroups(collapsedGroups);
        setExpandedGroups(expandedGroups);
      });

      if (computedProps.onGroupCollapseChange) {
        computedProps.onGroupCollapseChange(collapsedGroups, expandedGroups);
      }
    },
    []
  );

  const [computedExpandedGroups, setExpandedGroups] = useProperty<
    TypeExpandedGroups
  >(props, 'expandedGroups', true, {
    onChange: () => {},
  });

  const setGroupBy = (groupBy: TypeGroupBy) => {
    if (groupBy && typeof groupBy === 'string') {
      groupBy = [groupBy];
    }
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }
    groupBy = keepValidGroupBy(groupBy, computedProps.columnsMap);

    if (isControlledValue(props.groupBy)) {
      initialSetGroupBy(groupBy);
      return;
    }

    const queue = batchUpdate();
    const data = computeData(
      {
        groupBy,
      },
      computedProps,
      queue
    );

    queue.commit(() => {
      if (data !== undefined) {
        computedProps.silentSetData(data);
      }
      initialSetGroupBy(groupBy);
    });
  };

  const isGroupCollapsed = (group: { keyPath: string[] }) => {
    const { current: computedProps } = computedPropsRef;

    if (!computedProps) {
      return false;
    }

    const sep = computedProps.groupPathSeparator;
    const path = `${(group.keyPath || group.valuePath).join(sep)}`;

    const collapsedGroups = computedProps.computedCollapsedGroups;
    if (collapsedGroups === true) {
      if (computedProps.computedExpandedGroups) {
        return !(computedProps.computedExpandedGroups as any)[path];
      }
      return true;
    }

    return !!collapsedGroups[path];
  };

  const expandGroup = (
    group: { keyPath: string[] } | string[] | string
  ): void => {
    const path = Array.isArray(group)
      ? group
      : typeof group == 'string'
      ? [group]
      : group.keyPath;

    if (isGroupCollapsed({ keyPath: path })) {
      onGroupToggle(path);
    }
  };

  const collapseGroup = (
    group: { keyPath: string[] } | string[] | string
  ): void => {
    const path = Array.isArray(group)
      ? group
      : typeof group == 'string'
      ? [group]
      : group.keyPath;

    if (!isGroupCollapsed({ keyPath: path })) {
      onGroupToggle(path);
    }
  };

  const onGroupToggle = (path: string[]): void => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    const { groupPathSeparator: sep, computedCollapsedGroups } = computedProps;

    const stringPath = path.join(sep);

    let newCollapsedGroups =
      computedCollapsedGroups === true
        ? true
        : Object.assign({}, computedCollapsedGroups);
    let newExpandedGroups =
      computedExpandedGroups === true
        ? true
        : Object.assign({}, computedExpandedGroups);

    if (newExpandedGroups === true) {
      if (newCollapsedGroups !== true) {
        if (newCollapsedGroups[stringPath]) {
          delete newCollapsedGroups[stringPath];
        } else {
          newCollapsedGroups[stringPath] = true;
        }
      }
    } else {
      if (newCollapsedGroups === true) {
        if (newExpandedGroups[stringPath]) {
          delete newExpandedGroups[stringPath];
        } else {
          newExpandedGroups[stringPath] = true;
        }
      }
    }

    setCollapsedAndExpanded({
      collapsedGroups: newCollapsedGroups,
      expandedGroups: newExpandedGroups,
    });
  };

  const toggleGroup = (group: any) => {
    const { current: computedProps } = computedPropsRef;

    if (!computedProps) {
      return;
    }
    if (group && group.keyPath) {
      if (
        computedProps.computedPivot &&
        computedProps.computedGroupBy &&
        group.depth === computedProps.computedGroupBy.length
      ) {
        // group cannot be toggled
        return;
      }
      onGroupToggle(group.keyPath);
    }
  };

  const addGroupByColumn = (column: TypeGetColumnByParam) => {
    const { current: computedProps } = computedPropsRef;

    if (!computedProps) {
      return;
    }
    const computedColumn = computedProps.getColumnBy(
      column
    ) as TypeComputedColumn;

    if (!computedColumn) {
      return;
    }

    let groupBy = computedProps.computedGroupBy;

    if (!Array.isArray(groupBy)) {
      groupBy = [];
    }

    if (computedColumn.name && groupBy.indexOf(computedColumn.name) == -1) {
      setGroupBy([...groupBy, computedColumn.name]);
    }
  };

  const removeGroupByColumn = (column: TypeGetColumnByParam) => {
    const { current: computedProps } = computedPropsRef;

    if (!computedProps) {
      return;
    }
    const computedColumn = computedProps.getColumnBy(
      column
    ) as TypeComputedColumn;

    let groupBy = computedProps.computedGroupBy;
    if (!Array.isArray(groupBy)) {
      return;
    }

    if (groupBy.indexOf(computedColumn.id) != -1) {
      setGroupBy(groupBy.filter(g => g != computedColumn.id));
    }
  };

  const collapseAllGroups = () => {
    setCollapsedAndExpanded({ collapsedGroups: true, expandedGroups: {} });
  };

  const expandAllGroups = () => {
    setCollapsedAndExpanded({ expandedGroups: true, collapsedGroups: {} });
  };

  return {
    computedGroupBy,
    onGroupToggle,
    toggleGroup,
    setGroupBy,
    removeGroupByColumn,
    addGroupByColumn,
    isGroupCollapsed,
    expandGroup,
    collapseGroup,
    computedCollapsedGroups,
    computedExpandedGroups,
    onGroupByChange: setGroupBy,
    setComputedGroupRelatedInfo,
    collapseAllGroups,
    expandAllGroups,
    ...computedGroupRelatedInfo,
  };
};

export default useGroupBy;
