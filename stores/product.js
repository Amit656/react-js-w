import { threePLAPIStore, warehouseAPIStore, whAPIStore } from './common';

export const useProductStore = defineStore('product', {
  state: () => ({
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: threePLAPIStore(),
    apiWarehouse: warehouseAPIStore(),
    apiWH: whAPIStore(),
    productData: {},
  }),
  actions: {
    async getCustomer() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('3pl/customers/list');
      this.isLoading = false;
      this.productData = response.data;
    },
    async getVendor(id) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`3pl-customer/vendors?three_pl_customer=${id}`);
      this.isLoading = false;
      this.productData = response.data;
    },
    async getWarehouse(threeCustomer) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`warehouses/list/${threeCustomer}`);
      this.isLoading = false;
      this.productData = response.data;
    },
    async saveProduct(formData) {
      this.isLoading = true;
      const response = await this.apiWH.makeRequest('products', 'POST', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        navigateTo('/products');
      }
    },
    async getProducts(search = '') {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`products?search=${search}`);
      this.isLoading = false;
      this.productData = response.data;
    },
    async getProduct(id) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`products/${id}`);
      this.isLoading = false;
      this.productData = response.data;
    },
    async updateProduct(id, formData) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`products/${id}`, 'PUT', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        navigateTo('/products');
      }
    },
    async getVendors(productId, search = '') {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`products/${productId}/vendors?search=${search}&page=1&per_page=${PAGE_SIZE}`);
      this.isLoading = false;
      this.productData = response;
    },
    async productImageUpload(product, formData) {
      this.isLoading = true;
      const response = await this.apiWH.makeRequest(`products/${product}/images`, 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
    },
    async deleteVendorProduct(formData) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest('vendor/products/delete-vendor-product', 'DELETE', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      this.type = response.type;
    },
    async getPaginatedData(pageUrl) {
      this.isLoading = true;
      const response = await fetch(pageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const data = await response.json();
      this.isLoading = false;
      this.productData = data.data;
    },
  },
});
