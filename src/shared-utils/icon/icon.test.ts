import { getIconCode } from './icon.util';
import { IconName } from '../../components/05-atoms/icon/Icon';

describe('getIconCode', () => {
  it('Called getIconCode with wrong id', () => {
    expect(getIconCode('')).toBeNull();
  });
  it('Called getIconCode with IconName.FEMALE', () => {
    expect(getIconCode('dms' || '2669')).toBe(IconName.FEMALE);
  });
  it('Called getIconCode with IconName.GIRL', () => {
    expect(getIconCode('girl' || '2617')).toBe(IconName.GIRL);
  });
  it('Called getIconCode with IconName.MALE', () => {
    expect(getIconCode('hrn' || '2616')).toBe(IconName.MALE);
  });
  it('Called getIconCode with IconName.BOY', () => {
    expect(getIconCode('boy' || '2616')).toBe(IconName.BOY);
  });
  it('Called getIconCode with IconName.UNISEX', () => {
    expect(getIconCode('uni' || '2670')).toBe(IconName.UNISEX);
  });
  it('Called getIconCode with IconName.JUNIOR', () => {
    expect(getIconCode('uni_jr' || '2618')).toBe(IconName.JUNIOR);
  });
});
