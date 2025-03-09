import { useState } from 'react';
import type { Resume } from '@/types/Resume';
import type { DragEndEvent } from '@dnd-kit/core';

type Item = {
  id: number;
};

export function useSectionState<T extends Item>(
  items: T[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>,
  sectionKey: keyof Resume,
  emptyItem: Omit<T, 'id'>
) {
  const [activeIndex, setActiveIndex] = useState<number | null>(items.length > 0 ? 0 : null);

  const handleDragStart = () => {
    setActiveIndex(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);

    const newItems = [...items];
    const [removed] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, removed);
    
    setResume(prev => ({
      ...prev,
      [sectionKey]: newItems
    }));
  };

  const addItem = () => {
    const newIndex = items.length;
    setResume(prev => ({
      ...prev,
      [sectionKey]: [...items, { ...emptyItem, id: items.length }]
    }));
    setActiveIndex(newIndex);
  };

  const updateItem = (id: number, updatedItem: T) => {
    setResume(prev => ({
      ...prev,
      [sectionKey]: items.map(item =>
        item.id === id ? updatedItem : item
      )
    }));
  };

  const removeItem = (id: number) => {
    setResume(prev => ({
      ...prev,
      [sectionKey]: items.filter(item => item.id !== id)
    }));
  };

  return {
    activeIndex,
    setActiveIndex,
    handleDragStart,
    handleDragEnd,
    addItem,
    updateItem,
    removeItem,
  };
}
