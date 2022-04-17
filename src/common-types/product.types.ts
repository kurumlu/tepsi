export enum ProductTypes {
  PRODUCT = 'PRODUCT',
  E_VOUCHER = 'E_VOUCHER',
  GIFT_CARD = 'GIFT_CARD',
  CUSTOM_GIFT_CARD = 'CUSTOM_GIFT_CARD',
  PAPER_VOUCHER = 'PAPER_VOUCHER',
  CUSTOM_PAPER_VOUCHER = 'CUSTOM_PAPER_VOUCHER',
}

export type ProductTilePriceViewModel = {
  formattedPrice: string;
  priceLabel?: string;
};

export type ProductLister = {
  availability: number;
  brand: string;
  colourId: number;
  colours: ProductColor[];
  currency: string;
  featureValueGenderId: number;
  genderCode: string;
  impression: ProductListerImpression;
  mainWebShopId: number;
  mainWebShopName: string;
  productCode: string;
  productId: number;
  productRating?: number;
  productReviews?: number;
  seoUrl: string;
  title: string;
  type: string;
};

export type ProductListerImpression = {
  brand: string;
  category: string;
  id: number;
  name: string;
  price: string;
  variant: string;
};

export type ProductColorSize = {
  sku: string;
  code: string;
  order: number;
  commercialSize?: string;
  fullCommercialSize?: string;
};

export type ProductColor = {
  alwaysVisible: boolean;
  availability: number;
  colourCode: string;
  colourId: number;
  description: string;
  extendedRange: boolean;
  hasDiscount: boolean;
  hasDifferentPrices: boolean;
  hoverImage?: string;
  image: string;
  inWishList?: boolean;
  isCompareProduct?: boolean;
  markdown: boolean;
  swatch: string;
  price?: {
    standardPrice?: number;
    sellPrice?: number;
    emPrice?: number;
    priceState?: number;
    productDiscountPercentage: number;
  };
  priceOverlay?: {
    overlayCode: string;
    overlayThumb: string;
  };
  sizes?: ProductColorSize[];
  prices: {
    SELL: {
      intPrice: number;
      decPrice: number;
      original: number;
      priceState: string;
    };
    STD?: {
      intPrice: number;
      decPrice: number;
      original: number;
      priceState: string;
    };
    RRP?: {
      intPrice: number;
      decPrice: number;
      original: number;
      priceState: string;
    };
  };
};

export type ProductColorVariationSize = {
  active?: boolean;
  availability?: number;
  code: string;
  commercialSize?: string;
  fullCommercialSize?: string;
  lastPieces?: boolean;
  exactAvailability?: null | number;
  order: number;
  originalSize?: string;
  prices?: ProductPrices;
  sku: string;
  productDiscountPercentage?: number;
  productDiscountAmount?: number;
  hasDiscount?: boolean;
};

export type ProductPrices = {
  SELL: ProductPriceViewModel;
  STD?: ProductPriceViewModel;
  RRP?: ProductPriceViewModel;
  EM?: ProductPriceViewModel;
};

export declare type ProductPriceViewModel = {
  intPrice?: number;
  decPrice?: number;
  original: number;
  priceState?: string | number;
};

export type ProductTileSelectSizePayloadObject = {
  productId: number;
  skuId: string;
};
