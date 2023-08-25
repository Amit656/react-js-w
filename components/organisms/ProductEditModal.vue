<template>
  <div>
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        as="div"
        class="relative z-10"
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
                text-left shadow-xl transition-all sm:my-8 lg:w-full sm:max-w-2xl sm:p-6"
              >
                <form
                  ref="myForm"
                  class="space-y-8 divide-y divide-gray-200 "
                  action="#"
                  method="POST"
                  @submit.prevent="$emit('saveEdit', formData)"
                >
                  <div class="px-4 py-3 sm:px-6">
                    <div
                      class="border-b border-gray-200 px-4 py-4 flex items-start justify-between"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-base font-semibold leading-6 text-gray-900"
                      >
                        {{ $t('product.lbl_product_info') }}
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                          @click="$emit('cancelEdit')"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon
                            class="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="status"
                            v-model="formData.status"
                            name="cusstatus"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="status"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > Is Active? </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_name') }} <span class="text-red-600"> * </span> </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="name"
                            v-model="formData.name"
                            type="text"
                            name="name"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                             sm:text-sm sm:leading-6"
                            @blur="v$.name.$touch"
                          >
                        </div>
                      </div>
                      <div v-if="v$.name.$error">
                        <span
                          v-if="v$.name.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_name') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="sku"
                          class="block text-sm font-medium text-gray-900"
                        > {{ $t('product.lbl_sku') }} <span class="text-red-600"> * </span> </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="sku"
                            v-model="formData.sku"
                            type="text"
                            name="sku"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 f
                      sm:text-sm sm:leading-6"
                            @blur="v$.sku.$touch"
                          >
                        </div>
                      </div>
                      <div v-if="v$.sku.$error">
                        <span
                          v-if="v$.sku.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_sku') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="barcode"
                          class="block text-sm font-medium text-gray-900"
                        > {{ $t('product.lbl_barcode') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="barcode"
                            v-model="formData.barcode"
                            type="text"
                            name="barcode"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                      sm:text-sm sm:leading-6"
                            placeholder="If you don't enter a barcode, we will generate one for you"
                            @blur="v$.barcode.$touch"
                          >
                        </div>
                      </div>
                      <div v-if="v$.barcode.$error">
                        <span
                          v-if="v$.barcode.mustbeint.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.barcode_int') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_warehouse') }} <span class="text-red-600"> * </span> </label>
                        <div class="relative mt-2 rounded-md">
                          <MoleculesMultiSelectDropdown
                            :option-list="warehouses"
                            :selected="selectedwarehouse"
                            label="name"
                            :multiple="true"
                            track-by="hash"
                            :placeholder="$t('select_warehouse')"
                            class="w-full rounded-md border border-gray-300 text-left
                            text-base font-normal leading-5 text-gray-700 shadow-sm
                            sm:text-sm"
                            @change="handleWarehouse"
                          />
                        </div>
                      </div>
                      <div v-if="v$.warehouse_id.$error">
                        <span
                          v-if="v$.warehouse_id.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_warehouse') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="value"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_cost') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="cost"
                          v-model="formData.value"
                          type="number"
                          step="any"
                          name="value"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="weight"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_weight') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="weight"
                          v-model="formData.weight"
                          type="number"
                          step="any"
                          name="weight"
                          min="0"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="height"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_height') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="height"
                          v-model="formData.weight"
                          type="number"
                          step="any"
                          name="height"
                          min="0"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="width"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_width') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="width"
                          v-model="formData.width"
                          type="number"
                          step="any"
                          name="width"
                          min="0"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="length"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_length') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="length"
                          v-model="formData.length"
                          type="number"
                          step="any"
                          name="length"
                          min="0"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="custom_value"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_customsvalue') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="custom_value"
                          v-model="formData.custom_value"
                          type="number"
                          step="any"
                          name="custom_value"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_customsdesc') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <label
                        for="custom_description"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_customsvalue') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <textarea
                          id="custom_description"
                          v-model="formData.custom_description"
                          name="custom_description"
                          rows="2"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                        />
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_customsdesc') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <label
                        for="price"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_price') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="price"
                          v-model="formData.price"
                          type="number"
                          name="price"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="reorder_amount"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_reorder') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="reorder_amount"
                          v-model="formData.reorder_amount"
                          type="number"
                          name="reorder_amount"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_reorder') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <label
                        for="reorder_level"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_reorderlevel') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="reorder_level"
                          v-model="formData.reorder_level"
                          type="number"
                          name="reorder_level"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_reorderlevel') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <label
                        for="replinishment_level"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_replishment') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="replinishment_level"
                          v-model="formData.replenishment_level"
                          type="number"
                          name="replinishment_level"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        >
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_replishment') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="is_full"
                            v-model="formData.item_count_full"
                            name="is_full"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600
                            focus:ring-indigo-600 focus:ring-offset-gray-900"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="name"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_is_full') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="country"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > {{ $t('product.lbl_country') }} </label>
                      <div class="mt-2">
                        <MoleculesMultiSelectDropdown
                          :option-list="countryList"
                          :selected="selectedCountry"
                          label="name"
                          track-by="index"
                          searchable="true"
                          placeholder="Select a country"
                          class="w-full rounded-md border border-gray-300 text-left
                          text-base font-normal leading-5 text-gray-700 shadow-sm
                          sm:text-sm"
                          @change="handleCountry"
                        />
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="currency"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > {{ $t('product.lbl_currency') }} </label>
                      <div class="mt-2">
                        <MoleculesMultiSelectDropdown
                          :option-list="currencyList"
                          :selected="selectedCurrency"
                          label="code"
                          track-by="index"
                          searchable="true"
                          placeholder="Select a currency"
                          class="w-full rounded-md border border-gray-300 text-left
                          text-base font-normal leading-5 text-gray-700 shadow-sm
                          sm:text-sm"
                          @change="handleCurrency"
                        />
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="teriff_code"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_teriff') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="teriff_code"
                          v-model="formData.tarrif_code"
                          type="number"
                          name="teriff_code"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                        >
                      </div>
                    </div>
                    <div class="mt-5">
                      <label
                        for="tags"
                        class="block text-sm font-medium text-gray-900"
                      > {{ $t('product.lbl_tags') }} </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="tags"
                          v-model="formData.tags"
                          type="text"
                          name="tags"
                          min="1"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                     sm:text-sm sm:leading-6"
                        >
                      </div>
                      <p class="text-xs text-gray-500">
                        {{ $t('product.txt_tags') }}
                      </p>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="final_sale_item"
                            v-model="formData.final_sale_item"
                            name="final_sale_item"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="final_sale_item"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_final_sale_item') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="cycle_count"
                            v-model="formData.cycle_count"
                            name="cycle_count"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="cycle_count"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_dont_cycle') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="add_to_invoice"
                            v-model="formData.add_to_invoice"
                            name="add_to_invoice"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="add_to_invoice"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_dont_invoice') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="dont_show_on_custom_form"
                            v-model="formData.dont_show_on_custom_form"
                            name="dont_show_on_custom_form"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="dont_show_on_custom_form"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_dont_customs') }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="assembly_sku"
                            v-model="formData.assembly_sku"
                            name="assembly_sku"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="assembly_sku"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_assembly_sku') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="dropship_only"
                            v-model="formData.dropship_only"
                            name="dropship_only"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="dropship_only"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_dropship') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="need_serial_number"
                            v-model="formData.need_serial_number"
                            name="need_serial_number"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="need_serial_number"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_need_serial_number') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="lithium_ion"
                            v-model="formData.lithium_ion"
                            name="lithium_ion"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="lithium_ion"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_lithium_ion') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="is_virtual"
                            name="is_virtual"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="is_virtual"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_is_virtual') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="auto_fulfill"
                            v-model="formData.auto_fulfill"
                            name="auto_fulfill"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="auto_fulfill"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_auto_fulfill') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="auto_pack"
                            v-model="formData.auto_pack"
                            name="auto_pack"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/10 bg-white/5"
                          >
                        </div>
                        <div class="text-sm leading-6">
                          <label
                            for="name"
                            class="block text-sm font-normal leading-6 text-gray-900"
                          > {{ $t('product.txt_auto_pack') }} </label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="product_note"
                          class="block text-sm font-medium text-gray-900"
                        > {{ $t('product.txt_product_note') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <textarea
                            id="product_note"
                            v-model="formData.product_note"
                            role="3"
                            name="product_note"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="product_packer_note"
                          class="block text-sm font-medium text-gray-900"
                        > {{ $t('product.txt_product_packer_note') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <textarea
                            id="product_packer_note"
                            v-model="formData.product_packer_note"
                            role="3"
                            name="product_packer_note"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div class="sm:col-span-2">
                        <label
                          for="product_return_note"
                          class="block text-sm font-medium text-gray-900"
                        > {{ $t('product.txt_product_return_note') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <textarea
                            id="product_return_note"
                            v-model="formData.product_return_note"
                            role="3"
                            name="product_return_note"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5 flex justify-end  space-x-3">
                      <NuxtLink
                        ref="cancelButtonRef"
                        to="#"
                        type="button"
                        class="mt-3 inline-flex rounded-md bg-white px-3 py-2
                        text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        @click="$emit('cancelEdit')"
                      >
                        {{ $t('lbl_cancel') }}
                      </NuxtLink>
                      <button
                        type="submit"
                        class="inline-flex rounded-md bg-indigo-600 px-3
                        py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600 sm:col-start-2"
                      >
                        {{ $t('lbl_save') }}
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import useVuelidate from '@vuelidate/core';
import validators from '../../plugins/validations';
import countries from '../../data/countries.json';
import currencies from '../../data/currencies.json';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  warehouses: {
    type: Array,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['cancelEdit', 'saveEdit']);

const formData = ref(props.product);
const countryList = ref('');
countryList.value = countries.map((country, key) => ({
  name: country.name,
  index: key,
}));

const currencyList = ref('');
currencyList.value = Object.keys(currencies).map((currency) => ({
  code: currencies[currency].code,
  index: currency,
}));
const warehouses = ref(props.warehouses);

const rules = computed(() => ({
  name: { required: validators.nameReq },
  sku: { required: validators.locTypeReq },
  barcode: { required: validators.barcodeReq, mustbeint: validators.barcodeInt },
  warehouse_id: { required: validators.warehouseReq },
  value: { required: validators.costReq },
}));
const v$ = useVuelidate(rules, formData);

const selectedwarehouse = ref([]);
if (formData.value.warehouse_id) {
  selectedwarehouse.value = warehouses.value.filter(
    (warehouse) => warehouse.hash === formData.value.warehouse_id,
  );
}
function handleWarehouse(selectedValues) {
  formData.value.warehouse_id = selectedValues.hash;
}
const selectedCountry = ref([]);
if (formData.value.country_of_manufacturer) {
  selectedCountry.value = countryList.value.filter(
    (country) => country.index === formData.value.country_of_manufacturer,
  );
}
function handleCountry(selectedValues) {
  formData.value.country_of_manufacturer = selectedValues.index;
}
const selectedCurrency = ref([]);
if (formData.value.currency) {
  selectedCurrency.value = currencyList.value.filter(
    (currency) => currency.index == formData.value.currency,
  );
}
function handleCurrency(selectedValues) {
  formData.value.currency = selectedValues.index;
}
</script>

<style lang="scss" scoped>

</style>
