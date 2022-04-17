export const mockNotPreventEvent = {
  key: 40,
  ctrlKey: true,
  metaKey: true,
  preventDefault: jest.fn(),
};

export const mockPreventEvent = {
  key: '23+23',
  ctrlKey: false,
  metaKey: false,
  preventDefault: jest.fn(),
};
