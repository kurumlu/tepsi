import { generateFontsMaster } from '../../styling/master/00-design-tokens/design_tokens';
import { generateFontsSDworx } from '../../styling/brands/sdworx/00-design-tokens/design_tokens';
import { generateFontsSDWorxCountries } from '../../styling/brands/sdworxcountries/00-design-tokens/design_tokens';
import { generateFontsSDWorxSme } from '../../styling/brands/sdworxsme/00-design-tokens/design_tokens';
import { generateFontsSDWorxLms } from '../../styling/brands/sdworxlms/00-design-tokens/design_tokens';
import { generateFontsStaffingSolutions } from '../../styling/brands/staffingsolutions/00-design-tokens/design_tokens';
import { MainWebsite } from './enums/mainWebsite';

export const preloadAssetFileGenerator = (
  asset_base_path: string
): Record<string, string[]> => {
  return {
    master: generateFontsMaster(asset_base_path),
    [MainWebsite.SDWorx]: generateFontsSDworx(asset_base_path),
    [MainWebsite.SDWorxCountries]: generateFontsSDWorxCountries(
      asset_base_path
    ),
    [MainWebsite.SDWorxSME]: generateFontsSDWorxSme(asset_base_path),
    [MainWebsite.SDWorxLMS]: generateFontsSDWorxLms(asset_base_path),
    [MainWebsite.StaffingSolutions]: generateFontsStaffingSolutions(
      asset_base_path
    ),
  };
};
