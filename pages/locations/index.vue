<template>
  <AtomsConfirm
    v-if="showDelete"
    :message="$t('location.txt_delete')"
    @confirm="onDelete"
    @cancel="showDelete = false"
  />
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="locationStore.isLoading" />
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8"
  >
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5
                text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <form
                  ref="myForm"
                  class="space-y-8 divide-y divide-gray-200"
                  action="#"
                  method="POST"
                  @submit.prevent="save()"
                >
                  <div class="mt-3 sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      {{ locationToEdit ? $t('lbl_edit') : $t('lbl_add') }}
                      {{ $t('location.label_loc') }}
                    </DialogTitle>
                    <div class="mt-5">
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_name') }}: </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center
                            pl-3"
                          >
                            <MapPinIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="name"
                            v-model="formData.name"
                            type="text"
                            name="name"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :placeholder="$t('location.label_loc')"
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
                    <div class="mt-5">
                      <div class="relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input
                            v-model="formData.is_pickable"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600
                            focus:ring-indigo-600"
                            :checked="formData.is_pickable"
                            type="checkbox"
                            name="pick"
                          >
                        </div>
                        <div class="ml-3 text-sm leading-6">
                          <AtomsText
                            content="Is this a pickable location?"
                            class="font-medium text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input
                            v-model="formData.is_sellable"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600
                            focus:ring-indigo-600"
                            :checked="formData.is_sellable"
                            type="checkbox"
                            name="pick"
                          >
                        </div>
                        <div class="ml-3 text-sm leading-6">
                          <AtomsText
                            content="Is this a sellable location?"
                            class="font-medium text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > {{ $t('lbl_type') }} </label>
                      <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                          <select
                            v-model="formData.location_type_id"
                            class="max-w-full rounded-md border border-gray-300 py-1.5 text-left
                            text-base font-medium leading-5 text-gray-700 shadow-sm
                            focus:border-indigo-500 focus:outline-none focus:ring-1
                            focus:ring-indigo-500 sm:text-sm"
                          >
                            <option
                              v-for="(option, index) in locationTypes"
                              :key="index"
                              :value="option.hash"
                            >
                              {{ option.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div v-if="v$.location_type_id.$error">
                        <span
                          v-if="v$.location_type_id.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_loctype') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > {{ $t('lbl_warehouse') }} </label>
                      <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                          <select
                            v-model="formData.warehouse_id"
                            class="max-w-full rounded-md border border-gray-300 py-1.5 text-left
                            text-base
                            font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500
                            focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option
                              v-for="(option, index) in warehouses"
                              :key="index"
                              :value="option.hash"
                            >
                              {{ option.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div v-if="v$.warehouse_id.$error">
                        <span
                          v-if="v$.warehouse_id.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_warehouse') }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3
                        py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {{ $t('lbl_save') }}
                    </button>
                    <NuxtLink
                      ref="cancelButtonRef"
                      to="#"
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2
                        text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      @click="open = false, reset()"
                    >
                      {{ $t('lbl_cancel') }}
                    </NuxtLink>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('location.label') }}
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
            :placeholder="$t('lbl_search') + ' ' + $t('location.label')"
            @input="searchLocations"
          >
        </div>
      </div>
    </div>
    <div
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <button
        class="block app-button border-2 rounded-md py-2 px-3 text-center
        text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="open = true, fetchData()"
      >
        {{ $t('lbl_add') }} {{ $t('location.label_loc') }}
      </button>
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
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('lbl_warehouse') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('locationType.label_loc') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('locationType.label_pick') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('locationType.label_sell') }}
                  </th>
                  <th
                    scope="col"
                    colspan="5"
                    class="w-12 py-3.5 pl-7 pr-2 text-left text-sm
                    font-semibold text-gray-900 sm:pr-6"
                  >
                    {{ $t('lbl_action') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="location in locationData.data"
                  :key="location.hash"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900
                    sm:pl-6"
                  >
                    {{ location.name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ location.warehouse.name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ location.location_type.name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ location.is_pickable ? $t('lbl_yes') : $t('lbl_no') }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ location.is_sellable ? $t('lbl_yes') : $t('lbl_no') }}
                  </td>
                  <td
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="open = true, fetchLocation(location.hash)"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    class="w-12 relative whitespace-nowrap py-4 text-right text-sm font-medium"
                  >
                    <button
                      class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600
                      shadow-sm hover:bg-indigo-100"
                      type="button"
                      @click="getBarcode(location.hash)"
                    >
                      View Barcode
                    </button>
                  </td>
                  <td
                    class="w-12 relative whitespace-nowrap py-4 pr-4 pl-3
                    text-right text-sm font-medium sm:pr-8 lg:pr-8"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="showDelete = true, locToDelete = location.hash"
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="locationData.data == ''"
                >
                  <td
                    colspan="6"
                    class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 col-span-6"
                  >
                    {{ $t('txt_nodata') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <MoleculesPagination
              v-if="locationData.data != ''"
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
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import {
  TrashIcon, PencilIcon, MagnifyingGlassIcon, MapPinIcon,
} from '@heroicons/vue/24/outline';
import { useVuelidate } from '@vuelidate/core';
import { debounce } from 'lodash';
import JsPDF from 'jspdf';
import validators from '../../plugins/validations';
import { useLoactionStore } from '../../stores/location';

const open = ref(false);
const textVisible = ref(false);
let res = ref('');
let resType = ref('');
const locationStore = useLoactionStore();

const warehouses = ref('');
const locationTypes = ref('');
const locationData = ref({});

await locationStore.getLocations();
locationData.value = locationStore.locationData;

async function fetchData() {
  await locationStore.getLocationTypes();
  locationTypes.value = locationStore.locationData;
  await locationStore.getWarehouses();
  warehouses.value = locationStore.locationData;
}

const formData = ref({
  name: ref(''),
  is_pickable: ref(false),
  is_sellable: ref(false),
  location_type_id: ref(''),
  warehouse_id: ref(''),
});
const rules = computed(() => ({
  name: { required: validators.nameReq },
  location_type_id: { required: validators.locTypeReq },
  warehouse_id: { required: validators.warehouseReq },
}));
const v$ = useVuelidate(rules, formData);
const locationToEdit = ref('');

async function reset() {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = '';
  });
  this.v$.$reset();
  locationToEdit.value = '';
}

async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    if (!locationToEdit.value) {
      await locationStore.saveLocation(formData.value);
    } else {
      await locationStore.updateLocation(locationToEdit.value, formData.value);
    }
    await locationStore.getLocations();
    locationData.value = locationStore.locationData;
    res = locationStore.message;
    resType = locationStore.type;
    if (resType !== 'error') {
      open.value = false;
      locationToEdit.value = '';
      this.reset();
    }
    if (res !== null) {
      textVisible.value = true;
      setTimeout(() => {
        textVisible.value = false;
        locationStore.message = null;
      }, 3000);
    }
  }
}

const search = ref('');
const pageLinks = ref(locationData.value.links);
const currentPage = ref(locationStore.locationData.current_page);
const totalData = ref(locationStore.locationData.total);
async function refetch(pageUrl) {
  await locationStore.getPaginatedData(pageUrl);
  locationData.value = locationStore.locationData;
  pageLinks.value = locationData.value.links;
  currentPage.value = locationStore.locationData.current_page;
}
const searchLocations = debounce(async () => {
  await locationStore.getLocations(search.value);
  locationData.value = locationStore.locationData;
  pageLinks.value = locationData.value.links;
  currentPage.value = locationStore.locationData.current_page;
}, DEBOUNCE_TIMEOUT);

async function fetchLocation(refId) {
  locationToEdit.value = refId;
  fetchData();
  await locationStore.getLocation(refId);
  formData.value = locationStore.locationData;
}

const showDelete = ref(false);
const locToDelete = ref('');
async function onDelete() {
  res = await locationStore.deleteLocation(locToDelete.value);
  resType = locationStore.type;
  await locationStore.getLocations();
  locationData.value = locationStore.locationData;
  showDelete.value = false;
  textVisible.value = true;
  pageLinks.value = locationData.value.links;
  currentPage.value = locationStore.locationData.current_page;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}

const convertBase64ToPNGImage = (url) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.src = url;
});
const makeBase64Image = ref('');
async function getBarcode(locationId) {
  await locationStore.getBarcode(locationId);
  makeBase64Image.value = locationStore.locationData.locationBarcode;
  convertBase64ToPNGImage(makeBase64Image.value).then((realImage) => {
    const doc = new JsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [4, 2],
    });
    doc.addImage(realImage, 'PNG', 0.5, 0.75, 3, 0.75);
    doc.save(`${new Date().toISOString()}.pdf`);
  });
}

</script>

<style lang="scss" scoped>

</style>
