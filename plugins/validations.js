import {
  required, email, helpers, integer,
} from '@vuelidate/validators';

const validators = {
  nameReq: required,
  warehouseReq: required,
  locTypeReq: required,
  emailRequired: helpers.withMessage('The email field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  barcodeInt: integer,
  barcodeReq: required,
  costReq: required,
  skuReq: required,
};
export default validators;
