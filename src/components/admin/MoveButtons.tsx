"use client";

import { iconButtonClass } from "./styles";

type MoveButtonsProps = {
  index: number;
  count: number;
  onMove: (index: number, dir: -1 | 1) => void;
  /** Readable name for the item, used in the buttons' accessible labels. */
  label: string;
};

export function MoveButtons({ index, count, onMove, label }: MoveButtonsProps) {
  return (
    <div className="flex shrink-0 gap-1">
      <button
        type="button"
        aria-label={`Move ${label} up`}
        disabled={index === 0}
        onClick={() => onMove(index, -1)}
        className={iconButtonClass}
      >
        <span aria-hidden="true">↑</span>
      </button>
      <button
        type="button"
        aria-label={`Move ${label} down`}
        disabled={index === count - 1}
        onClick={() => onMove(index, 1)}
        className={iconButtonClass}
      >
        <span aria-hidden="true">↓</span>
      </button>
    </div>
  );
}
