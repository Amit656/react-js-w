<template>
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="productStore.isLoading" />
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="save()"
  >
    <div class="space-y-8">
      <div class="border-b border-gray-400 pb-5 pt-8">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            {{ $t('product.lbl_product_info') }}
          </h3>
        </div>
      </div>
      <div class="border border-gray-200 px-4 py-4 mb-6 sm:px-6">
        <div
          v-if="showLists"
          class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
        >
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_3plcust') }}: </label>
            <div class="relative mt-2 rounded-md">
              <div class="mt-4 sm:mt-0">
                <MoleculesMultiSelectDropdown
                  :option-list="customerList"
                  label="full_name"
                  track-by="hash"
                  :placeholder="$t('select_cust')"
                  @change="handleSelectedCustomer"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="customerList.length > 0 && showLists"
          class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
        >
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_vendors') }} </label>
            <div class="relative mt-2 rounded-md">
              <div class="mt-4 sm:mt-0">
                <MoleculesMultiSelectDropdown
                  :option-list="vendors"
                  label="name"
                  track-by="hash"
                  :placeholder="$t('search_vendor')"
                  :multiple="true"
                  @change="handleSelectedOptions"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input
                  id="custom-item"
                  v-model="formData.is_kit"
                  name="custom-item"
                  type="checkbox"
                  class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600
                  focus:ring-indigo-600 focus:ring-offset-gray-900"
                  @change="handleIsKit"
                >
              </div>
              <div class="text-sm leading-6">
                <label
                  for="name"
                  class="block text-sm font-normal leading-6 text-gray-900"
                > {{ $t('product.txt_custitem') }} </label>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-900"
            > {{ $t('lbl_name') }} <span class="text-red-600"> * </span> </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                v-model="formData.name"
                type="text"
                name="name"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.name.$touch()"
              >
            </div>
            <div v-if="v$.name.$error">
              <span
                v-if="v$.name.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_name') }} </span>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-900"
            > {{ $t('product.lbl_value') }} </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="value"
                v-model="formData.value"
                type="number"
                name="value"
                min="0"
                step="0.01"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              >
            </div>
            <p class="text-xs text-gray-500">
              {{ $t('product.txt_value') }}
            </p>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-900"
            > {{ $t('product.lbl_weight') }} </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="weight"
                v-model="formData.weight"
                type="number"
                name="weight"
                step="0.01"
                min="0"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              >
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-900"
            > {{ $t('product.lbl_sku') }} <span class="text-red-600"> * </span> </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="sku"
                v-model="formData.sku"
                type="text"
                name="sku"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <div v-if="v$.sku.$error">
              <span
                v-if="v$.sku.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_sku') }} </span>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-900"
            > {{ $t('product.lbl_barcode') }} </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="barcode"
                v-model="formData.barcode"
                type="text"
                name="barcode"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="If you don't enter a barcode, we will generate one for you."
                @blur="v$.barcode.$touch"
              >
            </div>
            <div
              v-if="v$.barcode.$error"
              class="sm:col-span-2 flex items-center"
            >
              <span
                v-if="v$.barcode.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.barcode_int') }} </span>
            </div>
          </div>
        </div>
        <div
          v-if="customerList.length > 0 && showLists"
          class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
        >
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_warehouse') }}  <span class="text-red-600"> * </span>  </label>
            <div class="relative mt-2 rounded-md">
              <div class="mt-4 sm:mt-0">
                <MoleculesMultiSelectDropdown
                  :option-list="warehouses"
                  label="name"
                  track-by="hash"
                  :placeholder="$t('select_warehouse')"
                  @change="handleSelectedWarehouse"
                  @blur="v$.warehouse_id.$touch"
                />
              </div>
            </div>
            <div
              v-if="v$.warehouse_id.$error"
            >
              <span
                v-if="v$.warehouse_id.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_warehouse') }} </span>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('product.lbl_image') }} </label>
            <div class="relative mt-2 rounded-md">
              <MoleculesImageUpload
                :multiple="true"
                @change="onFileChange"
              />
            </div>
          </div>
        </div>
        <div class="pt-5">
          <div class="flex justify-end">
            <NuxtLink
              type="button"
              to="/products"
              class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
            text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2"
            >
              {{ $t('lbl_cancel') }}
            </NuxtLink>
            <button
              type="submit"
              class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
           text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2"
            >
              {{ $t('lbl_save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { useProductStore } from '../../stores/product';
import validators from '../../plugins/validations';

const productStore = useProductStore();
const customerList = ref([]);
const warehouses = ref([]);
const vendors = ref([]);

await productStore.getCustomer();
customerList.value = productStore.productData;
const formData = ref({
  three_pl_customer_id: ref(''),
  name: ref(''),
  is_kit: ref(false),
  value: ref(''),
  weight: ref(''),
  sku: ref(''),
  barcode: ref(''),
  images: ref([]),
  vendors: ref([]),
  warehouse_id: ref(''),
});

const rules = computed(() => ({
  name: { required: validators.nameReq },
  sku: { required: validators.locTypeReq },
  barcode: { mustbeint: validators.barcodeInt },
  warehouse_id: { required: validators.warehouseReq },
}));
const v$ = useVuelidate(rules, formData);

const showLists = computed(() => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const userType = userInfo.user_type;
  return !!((userType === THREE_PL || userType === THREE_PL_STAFF));
});

const files = ref(null);
const onFileChange = (images) => {
  files.value = images;
};

function handleSelectedOptions(selectedValues) {
  formData.value.vendors = selectedValues.map((item) => item.hash);
}
function handleSelectedWarehouse(selectedValues) {
  formData.value.warehouse_id = selectedValues.hash;
}
async function getDependentData() {
  await productStore.getVendor(formData.value.three_pl_customer_id);
  vendors.value = productStore.productData;
  await productStore.getWarehouse(formData.value.three_pl_customer_id);
  warehouses.value = productStore.productData;
}

function handleSelectedCustomer(selectedValues) {
  formData.value.three_pl_customer_id = selectedValues.hash;
  getDependentData();
}
const textVisible = ref(false);
const res = ref('');
const resType = ref('');
async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    const newFormData = new FormData();
    newFormData.append('three_pl_customer_id', formData.value.three_pl_customer_id);
    newFormData.append('name', formData.value.name);
    newFormData.append('is_kit', formData.value.is_kit ? 1 : 0);
    newFormData.append('value', formData.value.value);
    newFormData.append('weight', formData.value.weight);
    newFormData.append('sku', formData.value.sku);
    newFormData.append('barcode', formData.value.barcode);
    newFormData.append('vendors[]', formData.value.vendors);
    newFormData.append('warehouse_id', formData.value.warehouse_id);
    for (let i = 0; i < files.value.length; i += 1) {
      newFormData.append('images[]', files.value[i]);
    }
    await productStore.saveProduct(newFormData);
  }
}

</script>

<style lang="scss" scoped>

</style>
