import { warehouseAPIStore } from './common';

export const useOrderStatusStore = defineStore('orderStatus', {
  state: () => ({
    orderStatus: {},
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: warehouseAPIStore(),
  }),
  actions: {
    async getOrderStatuses(search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`order-statuses?search=${search}&page=1&per_page=${PAGE_SIZE}`);
      this.isLoading = false;
      this.orderStatusesData = response;
    },
    async getPaginatedData(pageUrl) {
      this.isLoading = true;
      const response = await fetch(pageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      this.isLoading = false;
      this.orderStatusesData = data.data;
    },
    async save(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('order-statuses', 'POST', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
    },
    async delete(orderStatus) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`order-statuses/${orderStatus}`, 'DELETE');
      this.isLoading = false;
      return response.metadata.message;
    },
  },
});
