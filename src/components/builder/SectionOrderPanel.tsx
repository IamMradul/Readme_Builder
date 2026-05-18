'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useReadmeStore } from '@/store/readmeStore';
import type { SectionId } from '@/types/readme';

const LABELS: Record<SectionId, string> = {
  profile: 'Profile',
  about: 'About Me',
  skills: 'Skills',
  stats: 'GitHub Stats',
  header: 'Animated Header',
  media: 'GIFs & Media',
  social: 'Social Links',
  extras: 'Extras',
};

function SortableItem({ id }: { id: SectionId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm ${
        isDragging ? 'opacity-80 shadow-lg ring-2 ring-primary' : ''
      }`}
    >
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${LABELS[id]}`}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span>{LABELS[id]}</span>
    </div>
  );
}

export function SectionOrderPanel() {
  const order = useReadmeStore((s) => s.state.sectionOrder);
  const setSectionOrder = useReadmeStore((s) => s.setSectionOrder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as SectionId);
    const newIndex = order.indexOf(over.id as SectionId);
    setSectionOrder(arrayMove(order, oldIndex, newIndex));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Drag to reorder README sections</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
