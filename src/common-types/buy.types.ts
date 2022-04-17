export enum BuyDeliveryOptions {
  COLLECT_STORE = 'COLLECT_STORE',
  COLLECT_HQ = 'COLLECT_HQ',
  HOME_DELIVERY = 'HOME_DELIVERY',
  NAMED_DAY = 'NAMED_DAY',
  NEXT_DAY = 'NEXT_DAY',
  PICKUP_POINT = 'PICKUP_POINT',
}

export enum BuyRoutePathname {
  FAST_CHECKOUT = 'fastCheckout',
  DELIVERY = 'delivery',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
}

export type BuyCustomerAddress = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  companyName?: string;
  organisationName?: string;
  locationName?: string;
  pickupPointNumber?: string;
  customerAccountId?: string;
  pickupPointName?: string;
  country?: string;
  address?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  houseNumber?: string;
  houseNumberAddition?: string;
  city?: string;
  postCode?: string;
  stateIso?: string;
  state?: string;
};

export type PaymentDeliveryAddress = {
  extraOptions?: string;
  phoneNumber?: string;
  shopId?: number;
  storeId?: number;
  storeNumber?: number;
};

export type BuyDeliveryAddress = BuyCustomerAddress &
  PaymentDeliveryAddress & {
    addToProfile?: boolean;
    address?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    city?: string;
    companyName?: string;
    customTown?: boolean;
    country?: string;
    county?: string;
    defaultAddress?: boolean;
    deliveryAddressId?: number;
    firstName?: string;
    houseNumber?: string;
    houseNumberAddition?: string;
    idCountry?: number;
    idTitle?: number;
    isActive?: boolean | null;
    lastName?: string;
    mainAddress?: boolean;
    middleName?: string;
    postCode?: string;
  };
