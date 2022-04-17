import { KeyboardEvent } from 'react';

export const allowOnlyNumbers = (e: KeyboardEvent<HTMLInputElement>): void => {
  const key: string | number = e.key || e.keyCode;

  // Allow numbers, function keys and decimal separators
  if (
    // Digits
    (!isNaN(Number(key)) ||
      (key >= 96 && key <= 105) ||
      [',', 188, '.', 110, 190].includes(key) || // Decimal separators
      [
        // Backspace, Delete, Tab, Escape, Enter
        'Backspace',
        8,
        'Delete',
        46,
        'Tab',
        9,
        'Escape',
        27,
        'Enter',
        13,
      ].includes(key) ||
      // Ctrl/cmd+A, Ctrl/cmd+C, Ctrl/cmd+X
      (['a', 65, 'c', 67, 'x', 88].includes(key) &&
        (e.ctrlKey === true || e.metaKey === true)) ||
      // Home, End, Left, Right, Up, Down
      [
        'End',
        35,
        'Home',
        36,
        'ArrowLeft',
        37,
        'ArrowUp',
        38,
        'ArrowRight',
        39,
        'ArrowDown',
        40,
      ].includes(key)) &&
    // Disable Space
    key !== 'Spacebar' &&
    key !== ' ' &&
    key !== 32
  ) {
    return;
  } else {
    e.preventDefault();
  }
};
