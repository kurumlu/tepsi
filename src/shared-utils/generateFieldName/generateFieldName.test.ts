import { generateFieldName } from './generateFieldName';
import { BuyAddressFieldsPrefix } from '../../components/06-molecules/buy-form/buy-address-fields/BuyAddressFields';

describe('generateFieldName', () => {
  it('generateFieldName with prefix', () => {
    expect(generateFieldName('name', BuyAddressFieldsPrefix.INVOICE)).toBe(
      'invoiceName'
    );
  });

  it('generateFieldName without prefix', () => {
    expect(generateFieldName('name')).toBe('name');
  });
});
