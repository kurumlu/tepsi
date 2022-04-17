import * as React from 'react';
import { useEffect, ReactNode, lazy, memo, Suspense, Children } from 'react';
import { Brands } from '../components/00-helpers/enums/brand';
import { usePrevious } from '../shared-utils/usePrevious/usePrevious.hooks';

export type TepsiThemeContext = {
  brand: Brands;
};

export const ThemeContext = React.createContext<TepsiThemeContext>(undefined);

export const TepsiThemeInclude = memo(
  ({ brand, children }: { brand: Brands; children: ReactNode }) => {
    const prevBrand = usePrevious(brand);

    useEffect(() => {
      if (!!prevBrand) {
        console.info('Please refresh the page and choose the brand again.');
      }
    }, [prevBrand]);

    const renderComponent = () => <>{Children.only(children)}</>;

    const RenderWithBrandStyle = lazy(
      () => import(`../styling/brands/${brand}/${brand}.templateRenderer.tsx`)
    );

    return !!brand ? (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeContext.Provider value={{ brand }}>
          <RenderWithBrandStyle renderComponent={renderComponent} />
        </ThemeContext.Provider>
      </Suspense>
    ) : (
      <div>Please select a brand-theme first</div>
    );
  }
);
