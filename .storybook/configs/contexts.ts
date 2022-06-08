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
        name: 'SD Worx - countries',
        props: { brand: Brands.SDWorxCountries },
        default: true,
      },
      {
        name: 'SD Worx - sme',
        props: { brand: Brands.SDWorxSME },
        default: true,
      },
      {
        name: 'SD Worx - lms',
        props: { brand: Brands.SDWorxLMS },
        default: true,
      },
      {
        name: 'Staffing Solutions',
        props: { brand: Brands.StaffingSolutions },
      },
    ],
  },
];
