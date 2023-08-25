const config = useRuntimeConfig();
export const warehouseAPIStore = defineStore({
  id: 'warehouseAPI',
  state: () => ({
    apiUrl: config.public.WAREHOUSE_API_URL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('access_token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const whAPIStore = defineStore({
  id: 'warehouse',
  state: () => ({
    apiUrl: config.public.WAREHOUSE_API_URL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('access_token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body,
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const threePLAPIStore = defineStore({
  id: 'threePLAPIStore',
  state: () => ({
    apiUrl: config.public.ThreePLURL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('access_token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});
