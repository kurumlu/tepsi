import { trimAsterisk } from './string.util';

describe('trimAsterisk', () => {
  it('should replace * from the end of the string', () => {
    const str = '*text';

    expect(trimAsterisk(`${str}*`)).toBe(str);
  });
});
