import { StringStringMap } from '../common-types';

export const generateSrcset = (srcset: string | StringStringMap): string =>
  Object.keys(srcset)
    .map((key: string) => `${srcset[key]} ${key}`)
    .join(', ');
