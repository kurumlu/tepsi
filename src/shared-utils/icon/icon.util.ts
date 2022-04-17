import { IconName } from '../../components/05-atoms/icon/Icon';

export const getIconCode = (id: number | string): IconName | null => {
  switch (String(id)) {
    case 'dms':
    case '2669':
      return IconName.FEMALE;
    case 'girl':
    case '2617':
      return IconName.GIRL;
    case 'hrn':
    case '2668':
      return IconName.MALE;
    case 'boy':
    case '2616':
      return IconName.BOY;
    case 'uni':
    case '2670':
      return IconName.UNISEX;
    case 'uni_jr':
    case '2618':
      return IconName.JUNIOR;
    default:
      return null;
  }
};
