import '@testing-library/jest-dom';

class FakeMouseEvent extends MouseEvent {
  constructor(type, values) {
    const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;
    super(type, mouseValues);

    Object.assign(this, {
      offsetX: offsetX || 0,
      offsetY: offsetY || 0,
      pageX: pageX || 0,
      pageY: pageY || 0,
      x: x || 0,
      y: y || 0,
    });
  }
}

window.FakeMouseEvent = FakeMouseEvent;
