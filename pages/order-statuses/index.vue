<template>
  <AtomsConfirm
    v-if="showDelete"
    :message="$t('orderStatus.txt_delete')"
    @confirm="onDelete"
    @cancel="showDelete = false"
  />
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="orderStatusStore.isLoading" />
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
                      {{ $t('lbl_add') }} {{ $t('orderStatus.label_') }}
                    </DialogTitle>
                    <div class="mt-5">
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_name') }}: </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          
                          <input
                            id="name"
                            v-model="formData.name"
                            type="text"
                            name="name"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            sm:text-sm sm:leading-6"
                            :placeholder="$t('orderStatus.label_')"
                            @change="v$.name.$touch"
                          >

                        </div>
                      </div>
                    </div>
                    <div v-if="v$.name.$error">
                      <span
                        v-if="v$.name.required.$invalid"
                        class="text-sm font-medium text-red-600"
                      > {{ $t('error.req_name') }} </span>
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
                      to="/order-statuses"
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2
                      text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
        {{ $t('orderStatus.label') }}
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
            :placeholder="$t('lbl_search') + ' ' + $t('orderStatus.label')"
            @input="searchOrderStatus"
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
        @click="open = true"
      >
        {{ $t('lbl_add') }} {{ $t('orderStatus.label_') }}
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
                  v-for="orderStatus in orderStatusData.data"
                  :key="orderStatus.hash"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm
                    font-medium text-gray-900 sm:pl-6"
                  >
                    {{ orderStatus.name }}
                  </td>                  
                  <td
                    class="w-12 relative whitespace-nowrap py-4 pr-4 pl-3
                    text-right text-sm font-medium sm:pr-8 lg:pr-8"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="showDelete = true, itemToDelete = orderStatus.hash"                    
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="orderStatusData.data == ''"
                >
                  <td
                    colspan="2"
                    class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 col-span-6"
                  >
                    {{ $t('txt_nodata') }}
                  </td>
                </tr>
              </tbody>
            </table>
            <MoleculesPagination
              v-if="orderStatusData.data != ''"
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
import { useVuelidate } from '@vuelidate/core';
import {
  PencilIcon, TrashIcon, MagnifyingGlassIcon, MapPinIcon,
} from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import validators from '../../plugins/validations';
import { useOrderStatusStore } from '../../stores/order-status';

const open = ref(false);
const textVisible = ref(false);
let res = ref('');
let resType = ref('');

const formData = reactive({
  name: ref(''),
});
const rules = computed(() => ({
  name: {
    required: validators.nameReq,
  },
}));
const v$ = useVuelidate(rules, formData);
const orderStatusStore = useOrderStatusStore();

await orderStatusStore.getOrderStatuses();
const orderStatusData = ref({});
orderStatusData.value = orderStatusStore.orderStatusesData;

const search = ref('');
const pageLinks = ref(orderStatusData.value.meta.links);
const currentPage = ref(orderStatusStore.orderStatusesData.meta.current_page);
const totalData = ref(orderStatusStore.orderStatusesData.meta.total);

async function refetch(pageUrl) {
  await orderStatusStore.getPaginatedData(pageUrl);
  orderStatusData.value = orderStatusStore.orderStatusesData;
  pageLinks.value = orderStatusData.value.meta.links;
  currentPage.value = orderStatusStore.orderStatusesData.meta.current_page;
}

async function reset() {
  Object.keys(formData).forEach((key) => {
    formData[key] = '';
  });
  this.v$.$reset();
}

async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await orderStatusStore.save(formData);

    await orderStatusStore.getOrderStatuses();
    orderStatusData.value = orderStatusStore.orderStatusesData;
    
    res = orderStatusStore.message;
    resType = orderStatusStore.type;
    if (resType !== 'error') {
      open.value = false;      
      this.reset();
    }
    if (res !== null) {
      textVisible.value = true;
      setTimeout(() => {
        textVisible.value = false;
        orderStatusStore.message = null;
      }, 3000);
    }    
  }
}

const searchOrderStatus = debounce(async () => {
  await orderStatusStore.getOrderStatuses(search.value);
  orderStatusData.value = orderStatusStore.orderStatusesData;
  pageLinks.value = orderStatusData.value.meta.links;
  currentPage.value = orderStatusStore.orderStatusesData.meta.current_page;
}, DEBOUNCE_TIMEOUT);

const showDelete = ref(false);
const itemToDelete = ref('');
async function onDelete() {
  res = await orderStatusStore.delete(itemToDelete.value);
  resType = orderStatusStore.type;
  showDelete.value = false;
  textVisible.value = true;
  await orderStatusStore.getOrderStatuses();
  orderStatusData.value = orderStatusStore.orderStatusesData;
  pageLinks.value = orderStatusData.value.meta.links;
  currentPage.value = orderStatusStore.orderStatusesData.meta.current_page;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}

</script>

<style lang="scss" scoped>

</style>
