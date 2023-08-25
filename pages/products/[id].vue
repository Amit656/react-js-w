<template>
  <AtomsConfirm
    v-if="showDelete"
    :message="$t('product.txt_delete_vendor')"
    @confirm="onDelete"
    @cancel="showDelete = false"
  />
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="productStore.isLoading" />
  <div>
    <main class="lg:pl-20">
      <div class="xl:pl-80">
        <div class=" pb-2">
          <div
            class="border border-gray-200 px-4 py-2 sm:flex-auto"
          >
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              {{ $t('product.lbl_image') }}
            </h1>
          </div>
          <div class="border border-gray-200 px-4 py-10 sm:flex-auto">
            <MoleculesImageUpload
              :multiple="true"
              @change="onFileChange"
            />
          </div>
        </div>
        <div class="border border-gray-200 px-4 py-2 sm:px-2 lg:px-2">
          <div
            class="flex flex-1 items-center justify-center px-2 lg:justify-end"
          >
            <div
              class="sm:flex-auto"
            >
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                {{ $t('lbl_vendors') }}
              </h1>
            </div>
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
                  :placeholder="$t('lbl_search') + ' ' + $t('lbl_vendors')"
                  @input="searchVendors"
                >
              </div>
            </div>
          </div>
          <div class="sm:px-6 lg:px-8">
            <div class="mt-8 flow-root">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-2">
                  <div
                    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900
                          sm:pl-6"
                          >
                            {{ $t('lbl_vendor') +' '+ $t('lbl_name') }}
                          </th>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900
                          sm:pl-6"
                          >
                            {{ $t('product.lbl_sku') }}
                          </th>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900
                          sm:pl-6"
                          >
                            {{ $t('product.lbl_price') }}
                          </th>
                          <th
                            scope="col"
                            colspan="2"
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
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900
                          sm:pl-6"
                          >
                            {{ product.details.name }}
                          </td>
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900
                          sm:pl-6"
                          >
                            {{ product.manufacturer_sku }}
                          </td>
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900
                          sm:pl-6"
                          >
                            {{ product.price }}
                          </td>
                          <td
                            class="w-12 relative whitespace-nowrap py-4 pr-4 pl-3
                          text-right text-sm font-medium sm:pr-8 lg:pr-8"
                          >
                            <NuxtLink
                              class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                              @click="showDelete = true, vendorId = product.details.hash"
                            >
                              <TrashIcon
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
        </div>
      </div>
    </main>
  </div>
  <OrganismsProductEditModal
    v-if="open"
    :open="open"
    :product="productFormData"
    :warehouses="warehouses"
    @save-edit="saveChanges"
    @cancel-edit="cancelChanges"
  />
  <aside
    class=" absolute top-16 hidden w-96 py-4 mb-6 xl:block"
  >
    <div class="flex items-start justify-between border border-gray-200 px-4 py-4">
      <h3 class="font-medium text-gray-900">
        Details
      </h3>
      <div class="">
        <NuxtLink
          class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
          @click="getProductInfo()"
        >
          <PencilIcon
            class="h-5 w-5"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </div>
    <div
      class="border border-gray-200 px-4 py-4 mt-1"
    >
      <dl class="divide-y divide-gray-200 border-b border-gray-200">
        <template
          v-for="(productDetail, key) in productDetails"
          :key="key"
        >
          <div
            class="py-3 flex justify-between text-sm font-medium"
          >
            <dt class="text-gray-500">
              {{ productDetail.name }}
            </dt>
            <dd class="text-gray-900">
              {{ productDetail.value }}
            </dd>
          </div>
        </template>
      </dl>
    </div>
  </aside>
</template>

<script setup>
import {
  PencilIcon, TrashIcon, MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import { useProductStore } from '../../stores/product';
import countries from '../../data/countries.json';
import currencies from '../../data/currencies.json';

const productStore = useProductStore();
const productList = ref('');
const { id } = useRoute().params;

await productStore.getProduct(id);
productList.value = productStore.productData;
const productData = productList.value;
const countryName = countries.find((country, key) => (key) === productData.country_of_manufacturer);
const currencyName = currencies[productData.currency];
await productStore.getWarehouse(productData.three_pl_customer_id);
const warehouseName = productStore.productData.find(
  (warehouse) => warehouse.hash === productData.warehouse_id,
);

const productDetails = [
  {
    name: 'Active:',
    value: productData.status === true ? 'Yes' : 'No',
  }, {
    name: 'Name:',
    value: productData.name,
  }, {
    name: 'SKU:',
    value: productData.sku,
  }, {
    name: 'Weight (lb):',
    value: productData.weight,
  }, {
    name: 'Height (in):',
    value: productData.height,
  }, {
    name: 'Width (in):',
    value: productData.width,
  }, {
    name: 'Length (in):',
    value: productData.length,
  }, {
    name: 'Value:',
    value: productData.value === null ? '0.00' : formatMoney(productData.value),
  }, {
    name: 'Price:',
    value: productData.price === null ? '0.00' : formatMoney(productData.price),
  }, {
    name: 'Customs Value:',
    value: productData.custom_value === null ? '0.00' : formatMoney(productData.custom_value),
  }, {
    name: 'Customs Description:',
    value: productData.custom_description,
  },
  {
    name: 'On Hand:',
    value: '0',
  },
  {
    name: 'Allocated:',
    value: '0',
  },
  {
    name: 'Reserve:',
    value: productData.reserve ?? '0',
  },
  {
    name: 'Non Sellable Total:',
    value: '0',
  },
  {
    name: 'Reorder Level:',
    value: productData.reorder_level ?? '0',
  }, {
    name: 'Reorder Amount:',
    value: productData.reorder_amount ?? '0',
  }, {
    name: 'Replenishment Level:',
    value: productData.replenishment_level ?? '0',
  },
  {
    name: 'Available:',
    value: '0',
  },
  {
    name: 'Backorder:',
    value: '0',
  },
  {
    name: 'Barcode:',
    value: productData.barcode,
  }, {
    name: 'Warehouse:',
    value: warehouseName ? warehouseName.name : '',
  }, {
    name: 'Last counted:',
    value: productData.item_count_full,
  }, {
    name: 'Country Of Manufacture::',
    value: countryName ? countryName.name : '',
  }, {
    name: 'Value Currency:',
    value: currencyName ? currencyName.name : '',
  }, {
    name: 'Tariff Code:',
    value: productData.tarrif_code ?? '0',
  }, {
    name: 'Tags:',
    value: productData.tags,
  }, {
    name: 'Custom:',
    value: productData.dont_show_on_custom_form ? 'Yes' : 'No',
  }, {
    name: 'Is Final Sale:',
    value: productData.final_sale_item ? 'Yes' : 'No',
  }, {
    name: 'Dropship Only:',
    value: productData.dropship_only ? 'Yes' : 'No',
  }, {
    name: 'Build Kit:',
    value: productData.is_kit ? 'Yes' : 'No',
  }, {
    name: 'Is Assembly:',
    value: productData.assembly_sku ? 'Yes' : 'No',
  }, {
    name: 'Do Not Cycle Count:',
    value: productData.cycle_count ? 'Yes' : 'No',
  }, {
    name: 'Ignore On Invoice:',
    value: productData.add_to_invoice ? 'Yes' : 'No',
  }, {
    name: 'Is Virtual:',
    value: productData.is_virtual ? 'Yes' : 'No',
  }, {
    name: 'Needs Serial Number:',
    value: productData.need_serial_number ? 'Yes' : 'No',
  }, {
    name: 'Lithium-Ion:',
    value: productData.lithium_ion ? 'Yes' : 'No',
  }, {
    name: 'Dangerous Goods Code:',
    value: productData.dangerous_goods_code,
  }, {
    name: 'Auto Fulfill:',
    value: productData.auto_fulfill ? 'Yes' : 'No',
  }, {
    name: 'Auto Pack:',
    value: productData.auto_pack ? 'Yes' : 'No',
  },
];

const warehouses = ref([]);
const productFormData = ref([]);
const open = ref(false);
const textVisible = ref(false);
const res = ref('');
const resType = ref('');

async function getProductInfo() {
  await productStore.getWarehouse(productData.three_pl_customer_id);
  warehouses.value = productStore.productData;
  productFormData.value = productData;
  open.value = true;
}

async function saveChanges(product) {
  delete product.images;
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

await productStore.getVendors(id);
productList.value = productStore.productData;
const search = ref('');
const pageLinks = ref(productList.value.meta.links);
const currentPage = ref(productStore.productData.meta.current_page);
const totalData = ref(productStore.productData.meta.total);

const searchVendors = debounce(async () => {
  await productStore.getVendors(id, search.value);
  productList.value = productStore.productData;
  pageLinks.value = productList.value.meta.links;
  currentPage.value = productStore.productData.meta.current_page;
}, DEBOUNCE_TIMEOUT);

async function refetch(pageUrl) {
  await productStore.getPaginatedData(pageUrl);
  productList.value = productStore.productData;
  pageLinks.value = productList.value.meta.links;
  currentPage.value = productStore.productData.meta.current_page;
}

const showDelete = ref(false);
const vendorId = ref('');
async function onDelete() {
  res.value = await productStore.deleteVendorProduct(
    { vendor_id: vendorId.value, product_id: id },
  );
  resType.value = productStore.type;
  await productStore.getVendors(id);
  productList.value = productStore.productData;
  showDelete.value = false;
  textVisible.value = true;
  pageLinks.value = productList.value.meta.links;
  currentPage.value = productStore.productData.meta.current_page;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
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

async function onFileChange(files) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i += 1) {
    formData.append('images[]', files[i]);
  }
  await productStore.productImageUpload(id, formData);
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
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

</script>

<style lang="scss" scoped>

</style>
