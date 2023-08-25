import { threePLAPIStore } from './common';

export const use3PLCustomerStore = defineStore('3pl-customer', {
  state: () => ({
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: threePLAPIStore(),
    customerData: {},
  }),
  actions: {
  },
});
