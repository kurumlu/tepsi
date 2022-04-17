import * as React from 'react';
import { FunctionComponent } from 'react';
import { BrandSpecificRenderer } from '../../00-helpers/brand_specific_renderer';
import { logos } from '../../05-atoms/logo/template';
import { Icon, IconColor, IconName } from '../../05-atoms/icon/Icon';
import { MobileHeader } from '../../08-templates/navigation/template';
import { Link, LinkVariant, LinkSize } from '../../05-atoms/link/Link';
import {
  CategoryOneItemData,
  CategoryTShirt,
  CategoryTwoItemsData,
} from './template.mock';

type CategoryItem = {
  title: string;
  value: string[];
};

type level2Level3GeneratorProps = {
  level1?: string;
  level2: CategoryItem[];
};

export const Level2Level3Generator: FunctionComponent<level2Level3GeneratorProps> = props => {
  const { level1, level2 } = props;

  return (
    <>
      {level2.map(item => {
        const checkboxId = `menu-sub-toggle-${btoa(level1)}-${btoa(
          item.title
        )}`;
        return (
          <div
            className="as-o-category-flyout-menu__column-item"
            key={item.title.split(' ').join('')}>
            <input
              id={checkboxId}
              type="checkbox"
              className="as-o-category-flyout-menu--state-toggle"
            />

            <Link
              href="/"
              emphasize
              size={LinkSize.SMALL}
              variant={LinkVariant.SUBTLE}
              className="as-a-menu-item--desktop-only">
              {item.title}
            </Link>

            <label
              htmlFor={checkboxId}
              className="as-a-link-main-nav__label as-a-menu-item--mobile-only">
              {item.title}
              <Icon
                name={IconName.CHEVRON_RIGHT}
                color={IconColor.ACTION}
                className="as-a-menu-item--mobile-only"
              />
            </label>

            <div className="as-o-category-flyout__menu-wrapper">
              <MobileHeader title={item.title} htmlFor={checkboxId} backIcon />
              <ul className="as-o-category-flyout__menu-block">
                <li className="as-a-menu-item as-o-category-flyout-menu__mobile-item as-a-menu-item--mobile-only">
                  <Link href="/" emphasize variant={LinkVariant.SUBTLE}>
                    All products - {item.title}
                  </Link>
                </li>
                {item.value.map((level3Item, index) => (
                  <li
                    key={index}
                    className="as-o-category-flyout-menu__mobile-item">
                    <Link
                      href="/"
                      variant={LinkVariant.SUBTLE}
                      size={LinkSize.SMALL_DESKTOP}
                      className="as-a-menu-item">
                      {level3Item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

type categoryFlyoutBasicProps = {
  categoryTitle: string;
};

export const CategoryFlyoutBasic: FunctionComponent<categoryFlyoutBasicProps> = props => {
  const { categoryTitle } = props;
  return (
    <div className="as-o-category-flyout-wrapper">
      <div className="as-o-category-flyout">
        <Link
          href="/"
          emphasize
          variant={LinkVariant.SUBTLE}
          className="as-o-category-flyout-title">
          {categoryTitle}
        </Link>
        <MobileHeader
          title={categoryTitle}
          htmlFor={'menu-sub-dames-toggle'}
          backIcon
        />

        <div className="as-o-category-flyout-menu">
          <div className="as-a-menu-item as-a-menu-item--mobile-only as-o-category-flyout-menu__mobile-item">
            <Link href="/" emphasize variant={LinkVariant.SUBTLE}>
              All products - {categoryTitle}
            </Link>
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'dames'}
              level2={CategoryTwoItemsData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator level1={'dames'} level2={CategoryTShirt} />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'dames'}
              level2={CategoryTwoItemsData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator level1={'dames'} level2={CategoryTShirt} />
          </div>
          <div className="as-o-category-flyout-menu__grid-column as-o-category-flyout-menu__grid-column--2">
            <div className="as-o-category-flyout-image-block">
              <BrandSpecificRenderer components={logos} />
            </div>
            <div className="as-o-category-flyout-links-block">
              <Link
                href="/"
                variant={LinkVariant.SUBTLE}
                size={LinkSize.SMALL}
                iconStart={IconName.ACCOUNT_MULTIPLE}>
                This is a link
              </Link>
              <Link
                href="/"
                variant={LinkVariant.SUBTLE}
                size={LinkSize.SMALL}
                iconStart={IconName.ACCOUNT_MULTIPLE}>
                This is a link
              </Link>
              <Link
                href="/"
                variant={LinkVariant.SUBTLE}
                size={LinkSize.SMALL}
                iconStart={IconName.ACCOUNT_MULTIPLE}>
                This is a link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type categoryFlyoutHerenProps = {
  categoryTitle: string;
};

export const CategoryFlyoutHeren: FunctionComponent<categoryFlyoutHerenProps> = props => {
  const { categoryTitle } = props;
  return (
    <div className="as-o-category-flyout-wrapper">
      <div className="as-o-category-flyout">
        <Link
          href="/"
          emphasize
          variant={LinkVariant.SUBTLE}
          className="as-o-category-flyout-title">
          {categoryTitle}
        </Link>
        <MobileHeader
          title={categoryTitle}
          htmlFor={'menu-sub-heren-toggle'}
          backIcon
        />

        <div className="as-o-category-flyout-menu">
          <div className="as-a-menu-item as-a-menu-item--mobile-only as-o-category-flyout-menu__mobile-item">
            <Link href="/" variant={LinkVariant.SUBTLE} emphasize>
              All products - {categoryTitle}
            </Link>
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'heren'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator level1={'heren'} level2={CategoryTShirt} />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'heren'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-o-category-flyout-menu__image-column">
            <div className="as-o-category-flyout-image-block">
              <BrandSpecificRenderer components={logos} />
            </div>
            <div className="as-o-category-flyout-links-block">
              <Link href="/" variant={LinkVariant.SUBTLE} size={LinkSize.SMALL}>
                <Icon
                  name={IconName.ACCOUNT_MULTIPLE}
                  className="as-a-icon--padding-right"
                />
                This is a link
              </Link>
              <Link href="/" variant={LinkVariant.SUBTLE} size={LinkSize.SMALL}>
                <Icon
                  name={IconName.ACCOUNT_MULTIPLE}
                  className="as-a-icon--padding-right"
                />
                This is a link
              </Link>
              <Link href="/" variant={LinkVariant.SUBTLE} size={LinkSize.SMALL}>
                <Icon
                  name={IconName.ACCOUNT_MULTIPLE}
                  className="as-a-icon--padding-right"
                />
                This is a link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type categoryFlyoutKidsProps = {
  categoryTitle: string;
};

export const CategoryFlyoutKids: FunctionComponent<categoryFlyoutKidsProps> = props => {
  const { categoryTitle } = props;
  return (
    <div className="as-o-category-flyout-wrapper">
      <div className="as-o-category-flyout">
        <Link
          href="/"
          emphasize
          variant={LinkVariant.SUBTLE}
          className="as-o-category-flyout-title">
          {categoryTitle}
        </Link>
        <MobileHeader
          title={categoryTitle}
          htmlFor={'menu-sub-kids-toggle'}
          backIcon
        />

        <div className="as-o-category-flyout-menu">
          <div className="as-a-menu-item as-a-menu-item--mobile-only as-o-category-flyout-menu__mobile-item">
            <Link href="/" variant={LinkVariant.SUBTLE} emphasize>
              All products - {categoryTitle}
            </Link>
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
          <div className="as-a-menu-item as-a-menu-item--menu-bar as-o-category-flyout-menu__column">
            <Level2Level3Generator
              level1={'kids'}
              level2={CategoryOneItemData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
