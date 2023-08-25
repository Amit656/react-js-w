import { warehouseAPIStore } from './common';

export const useLoactionTypeStore = defineStore('locaionType', {
  state: () => ({
    locationType: {},
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: warehouseAPIStore(),
  }),
  actions: {
    async getLocationTypes(search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`location-types?search=${search}`);
      this.isLoading = false;
      this.locationTypesData = response.data;
    },
    async save(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('location-types', 'POST', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
    },
    async delete(locationType) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`location-types/${locationType}`, 'DELETE');
      this.isLoading = false;
      return response.metadata.message;
    },
    async getLocationTypeData(locationType) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`location-types/${locationType}`);
      this.isLoading = false;
      this.locationTypesData = response.data;
    },
    async update(locationType, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`location-types/${locationType}`, 'PUT', formData);
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
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
      this.locationTypesData = data.data;
    },
  },
});
