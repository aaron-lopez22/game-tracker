// useDragSensors — dnd-kit sensors for desktop vs mobile.
// Desktop: drag from anywhere with the mouse.
// Mobile: touch drags need a short press (so the page can still scroll);
// components also attach listeners to a ≡ handle only.
// Unused sensors are passed as null, which useSensors ignores.

import { PointerSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export default function useDragSensors(isMobile) {
  const pointer = useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  const mouse = useSensor(MouseSensor, { activationConstraint: { distance: 4 } })
  const touch = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  const keyboard = useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  return useSensors(isMobile ? mouse : pointer, isMobile ? touch : null, keyboard)
}
