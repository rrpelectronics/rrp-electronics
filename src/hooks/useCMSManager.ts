"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllItems, createItem, deleteItem, updateItem } from "@/lib/cms-actions";

export function useCMSManager(table: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllItems(table);
      setItems(data || []);
    } catch (err) {
      console.error(`Error fetching from ${table}:`, err);
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const add = async (data: any) => {
    setSaving(true);
    try {
      const result = await createItem(table, data);
      await fetchItems();
      setIsAdding(false);
      return result;
    } catch (err) {
      console.error(`Error adding to ${table}:`, err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string, message = "Delete this item?") => {
    if (!confirm(message)) return;
    try {
      await deleteItem(table, id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      return true;
    } catch (err) {
      console.error(`Error deleting from ${table}:`, err);
      throw err;
    }
  };

  const edit = async (id: string, data: any) => {
    setSaving(true);
    try {
      await updateItem(table, id, data);
      await fetchItems();
      setEditingId(null);
      setIsAdding(false);
      return true;
    } catch (err) {
      console.error(`Error updating in ${table}:`, err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const toggleAdding = (val?: boolean) => {
     const next = val !== undefined ? val : !isAdding;
     setIsAdding(next);
     if (!next) setEditingId(null);
  };

  return {
    items,
    setItems,
    loading,
    setLoading,
    saving,
    isAdding,
    setIsAdding: toggleAdding,
    editingId,
    setEditingId,
    refresh: fetchItems,
    add,
    remove,
    update: edit
  };
}
