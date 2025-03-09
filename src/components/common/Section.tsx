import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

type SectionProps = {
  title: string;
  items: { id: number }[];
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart: () => void;
  onAdd: () => void;
  addButtonText: string;
  children: React.ReactNode;
};

const Section = ({
  title,
  items,
  onDragEnd,
  onDragStart,
  onAdd,
  addButtonText,
  children
}: SectionProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          cancelDrop={(event) => {
            const { active, over } = event;
            return !over || active.id === over.id;
          }}
        >
          <SortableContext
            items={items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence initial={false}>
              {children}
            </AnimatePresence>
          </SortableContext>
        </DndContext>
        <Button type="button" onClick={onAdd} variant="outline">
          {addButtonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Section;
