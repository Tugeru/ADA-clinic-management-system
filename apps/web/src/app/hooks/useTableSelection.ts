"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * Selection state for table multi-select. "Select all" applies to the current
 * list (already filtered). Selection is local state per page.
 */
export function useTableSelection<T>(
  items: T[],
  getKey: (item: T) => string,
) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const itemIds = useMemo(
    () => new Set(items.map((item) => getKey(item))),
    [items, getKey],
  );

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(itemIds));
  }, [itemIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isAllSelected =
    itemIds.size > 0 && itemIds.size === selectedIds.size;

  const selectedIdsArray = useMemo(() => Array.from(selectedIds), [selectedIds]);

  return {
    selectedIds: selectedIdsArray,
    setSelectedIds: (ids: string[] | Set<string>) =>
      setSelectedIds(ids instanceof Set ? ids : new Set(ids)),
    isSelected,
    toggle,
    selectAll,
    clearSelection,
    isAllSelected,
    selectedCount: selectedIds.size,
  };
}
