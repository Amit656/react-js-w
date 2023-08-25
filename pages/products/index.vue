<template>
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="productStore.isLoading" />
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8"
  >
    <OrganismsProductEditModal
      v-if="open"
      :open="open"
      :product="productFormData"
      :warehouses="warehouses"
      @save-edit="saveChanges"
      @cancel-edit="cancelChanges"
    />
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('product.label') }}
      </h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
    >
      <div class="w-full max-w-lg lg:max-w-xs">
        <label
          for="search"
          class="sr-only"
        >{{ $t('lbl_search') }}</label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            v-model="search"
            name="search"
            class="block w-full rounded-md border-0 bg-white py-1.5
            pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-blue-600 sm:text-sm sm:leading-6"
            type="search"
            :placeholder="$t('lbl_search') + ' ' + $t('product.label')"
            @input="searchProducts"
          >
        </div>
      </div>
    </div>
    <div
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <NuxtLink
        to="/products/create"
        class="block app-button border-2 rounded-md py-2 px-3 text-center
        text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ $t('lbl_add') }} {{ $t('product.label_product') }}
      </NuxtLink>
    </div>
  </div>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('lbl_name') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('product.lbl_sku') }}
                  </th>
                  <th
                    scope="col"
                    class="w-12 py-3.5 pl-7 pr-2 text-left text-sm
                    font-semibold text-gray-900 sm:pr-6"
                  >
                    {{ $t('lbl_action') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="product in productList.data"
                  :key="product.hash"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900
                    sm:pl-6"
                  >
                    <NuxtLink
                      :to="`/products/${product.hash}`"
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      {{ product.name }}
                    </NuxtLink>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ product.sku }}
                  </td>
                  <td
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="getProductInfo(product)"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="productList.data == ''"
                >
                  <td
                    colspan="6"
                    class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500
                    col-span-6"
                  >
                    {{ $t('txt_nodata') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <MoleculesPagination
              v-if="productList.data != ''"
              v-model="currentPage"
              :current-page="currentPage"
              :total-data="totalData"
              :links="pageLinks"
              @change="refetch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  MagnifyingGlassIcon, PencilIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import { useProductStore } from '../../stores/product';

const open = ref(false);
const productStore = useProductStore();
const productList = ref('');

await productStore.getProducts();
productList.value = productStore.productData;

const search = ref('');
const pageLinks = ref(productList.value.links);
const currentPage = ref(productStore.productData.current_page);
const totalData = ref(productStore.productData.total);

const searchProducts = debounce(async () => {
  await productStore.getProducts(search.value);
  productList.value = productStore.productData;
  pageLinks.value = productList.value.links;
  currentPage.value = productStore.productData.current_page;
}, DEBOUNCE_TIMEOUT);

async function refetch(pageUrl) {
  await productStore.getPaginatedData(pageUrl);
  productList.value = productStore.productData;
  pageLinks.value = productList.value.links;
  currentPage.value = productStore.productData.current_page;
}

const textVisible = ref(false);
const res = ref('');
const resType = ref('');
res.value = productStore.message;
resType.value = productStore.type;
if (res.value !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    productStore.message = null;
  }, 3000);
}

const warehouses = ref([]);
const productFormData = ref([]);

const getProductInfo = async (product) => {
  await productStore.getWarehouse(product.three_pl_customer_id);
  warehouses.value = productStore.productData;
  productFormData.value = product;
  open.value = true;
};

async function saveChanges(product) {
  await productStore.updateProduct(product.hash, product);
  open.value = false;
  res.value = productStore.message;
  resType.value = productStore.type;
  if (res.value !== null) {
    textVisible.value = true;
    setTimeout(() => {
      textVisible.value = false;
      productStore.message = null;
    }, 3000);
  }
}

function cancelChanges() {
  productFormData.value = [];
  open.value = false;
}
</script>

<style lang="scss" scoped>

</style>
