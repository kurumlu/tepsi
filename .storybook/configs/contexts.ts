import { Brands } from '../../src/components/00-helpers/enums/brand';
import { TepsiThemeInclude } from '../../src/storybook_addons/tepsiThemeInclude';

export const contexts = [
  {
    icon: 'chromatic',
    title: 'Tepsi - Theme Switcher',
    components: [TepsiThemeInclude],
    params: [
      {
        name: 'SD Worx - coorparate',
        props: { brand: Brands.SDWorx },
      },
      {
        name: 'SD Worx - sme',
        props: { brand: Brands.SDWorxSME },
        default: true,
      },
      {
        name: 'Staffing Solutions',
        props: { brand: Brands.StaffingSolutions },
      },
    ],
  },
];
