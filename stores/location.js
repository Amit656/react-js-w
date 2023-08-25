import { warehouseAPIStore } from './common';

export const useLoactionStore = defineStore('location', {
  state: () => ({
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: warehouseAPIStore(),
    locationData: {},
  }),
  actions: {
    async getLocationTypes() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('all/location-types');
      this.isLoading = false;
      this.locationData = response.data;
    },
    async getWarehouses() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('warehouses/list');
      this.isLoading = false;
      this.locationData = response.data;
    },
    async saveLocation(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('locations', 'POST', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
    },
    async getLocations(search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`locations?search=${search}`);
      this.isLoading = false;
      this.locationData = response.data;
    },
    async getLocation(location) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`locations/${location}`);
      this.isLoading = false;
      this.locationData = response.data;
    },
    async updateLocation(location, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`locations/${location}`, 'PUT', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
    },
    async deleteLocation(location) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`locations/${location}`, 'DELETE');
      this.isLoading = false;
      return response.metadata.message;
    },
    async getBarcode(location) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`locations/show-barcode/${location}`);
      this.locationData = response.data;
      this.isLoading = false;
      return response.data;
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
      this.locationData = data.data;
    },
  },
});
