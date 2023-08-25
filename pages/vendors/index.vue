<template>

    <div
        class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div 
            class="sm:flex-auto">
            <h1 
                class="text-base font-semibold leading-6 text-gray-900">
                    {{ $t('purchaseOrder.heading_create_po') }}
            </h1>
        </div>
    </div>

    <div
        class=" items-center justify-center lg:ml-6 mt-2">
        <h1>{{ $t('lbl_vendor') }}</h1>
    </div>    
    <div
        class=" items-center justify-center lg:ml-6 py-4">
        <div 
            class="border border-gray-200 px-4 py-4 mb-6 sm:px-6">
            <div          
                class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                
                <div  
                    v-if="showLists"        
                    class="sm:col-span-1">                
                    <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('lbl_3plcust') }} 
                    </label>
                    <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
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
                               
                <div 
                    v-if="customerList.length > 0 && showLists"
                    class="sm:col-span-1">                
                    <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('lbl_vendors') }} 
                    </label>
                    <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                            <MoleculesMultiSelectDropdown                    
                                :option-list="vendors"
                                label="name"
                                track-by="hash"
                                :placeholder="$t('select_vendor')"
                                :multiple="true"
                                @change="handleSelectedOptions"
                            />
                        </div>
                    </div>
                </div>
                    
                <div 
                    v-if="customerList.length > 0 && showLists"
                    class="sm:col-span-1">                
                    <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('lbl_warehouse') }}
                    </label>
                    <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                            <MoleculesMultiSelectDropdown                    
                                :option-list="warehouses"
                                label="name"
                                track-by="hash"
                                :placeholder="$t('select_warehouse')"
                                @change="handleSelectedWarehouse"
                            />
                        </div>
                    </div>
                </div>

                <div class="sm:col-span-1">                
                    <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('maximum_products_for_po') }}: 
                    </label>
                    <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                            <MoleculesMultiSelectDropdown                    
                            :option-list="maxProductCount"
                            label="count"                            
                            :placeholder="$t('search_max_product_count')"                            
                            />
                        </div>
                    </div>
                </div>
                
            </div>            
        </div>
    </div>

    <div
        class="border border-gray-200 mb-1 h-12 py-1 lg:ml-6 ">        
        <label class="ml-4 mt-4">{{ $t('product.label') }}</label>
        <div class="float-right mr-2">                   
            <button
                class="app-button border-2 rounded-md py-2 px-3 text-center
                text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                    {{ $t('purchaseOrder.btn_auto_add_all_products') }}
            </button>                        
            <button
                class="app-button border-2 rounded-md py-2 px-3 text-center
                text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                    {{ $t('purchaseOrder.btn_auto_add_backordered_products') }}
            </button>
        </div>                            
    </div>
    
    <div 
        class="border border-gray-200 px-4 py-4 mb-6 sm:px-6 lg:ml-6">
        <p class="text-sm text-gray-400">We will only show products that belong to the Vendor and Warehouse of this Purchase Order.</p>
        <div          
            class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">            
            <div 
                class="sm:col-span-1">                
                <label
                    for="name"
                    class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('txt_search_by') }} 
                </label>
                <div class="relative mt-2 rounded-md">
                    <div class="mt-4 sm:mt-0 sm:pr-9">
                        <MoleculesMultiSelectDropdown                    
                        :option-list="productFilter"
                        label="filter"                            
                        :placeholder="$t('txt_all')"                            
                        />
                    </div>
                </div>
            </div>  
            
        </div> 
        <div
            class="relative mt-2">
            <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                    :placeholder="$t('purchaseOrder.lbl_search') ">
        </div>
    </div>
    
    <div
        class="border border-gray-200 px-4 py-4 mb-6 lg:ml-6 sm:px-6">
        <div 
            class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('product.label_product') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_quantity') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_manufacturer_sku') }}	
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_sell_ahead') }}		
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_item_price') }}			
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_total_price') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('purchaseOrder.col_save_price') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('lbl_action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td :colspan="8">
                            Use the search bar above to add a product that already exists in your inventory.
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">
                            <label
                                for="subtotal"
                                class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('purchaseOrder.subtotal') }} 
                            </label>
                            <div
                                class="relative mt-2">
                                <div
                                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CurrencyDollarIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                    />
                                </div>
                                <input                                                                                
                                    name="subtotal"
                                    class="block w-full rounded-md border-0 bg-white py-1.5
                                    pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    :placeholder="$t('purchaseOrder.price_placeholder') ">
                            </div>
                        </td>
                    </tr>
                    
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">
                            <label
                                for="shipping"
                                class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('purchaseOrder.shipping') }} 
                            </label>
                            <div
                                class="relative mt-2">
                                <div
                                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CurrencyDollarIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                    />
                                </div>
                                <input                                                                                
                                    name="shipping"
                                    class="block w-full rounded-md border-0 bg-white py-1.5
                                    pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    :placeholder="$t('purchaseOrder.price_placeholder') ">
                            </div>
                        </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">
                            <label
                                for="discount"
                                class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('purchaseOrder.discount') }} 
                            </label>
                            <div
                                class="relative mt-2">
                                <div
                                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CurrencyDollarIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                    />
                                </div>
                                <input                                                                                
                                    name="discount"
                                    class="block w-full rounded-md border-0 bg-white py-1.5
                                    pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    :placeholder="$t('purchaseOrder.price_placeholder') ">
                            </div>
                        </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">    </td>
                        <td class="px-6 py-4">
                            <label
                                for="total"
                                class="block text-sm font-medium leading-6 text-gray-900"> {{ $t('purchaseOrder.total') }} 
                            </label>
                            <div
                                class="relative mt-2">
                                <div
                                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CurrencyDollarIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                    />
                                </div>
                                <input                                                                                
                                    name="total"
                                    class="block w-full rounded-md border-0 bg-white py-1.5
                                    pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    :placeholder="$t('purchaseOrder.price_placeholder') ">
                            </div>
                        </td>
                    </tr>
                                                                    
                </tbody>
            </table>
        </div>

    </div>
    
    <div 
        class="border border-gray-200 px-4 py-4 mb-6 sm:px-6 lg:ml-6 text-right	">            
        <button
            class="text-right app-button border-2 rounded-md py-2 px-3 text-center
            text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                {{ $t('purchaseOrder.btn_save_order') }}
        </button>            
    </div>


</template>

<script setup>
import { useProductStore } from '../../stores/product';
import {
  MagnifyingGlassIcon, CurrencyDollarIcon
} from '@heroicons/vue/24/outline';

const productStore = useProductStore();
const customerList = ref([]);
const warehouses = ref([]);
const vendors = ref([]);

const maxProductCount = [ 
       { count: 100 }, 
       { count: 200 }, 
       { count: 300 },
       { count: 400 },
       { count: 'Unlimited' },
    ];
    
const productFilter = [ 
        { filter: 'Name' }, 
        { filter: 'SKU' }, 
        { filter: 'Barcode' },       
    ];    
        
await productStore.getCustomer();
customerList.value = productStore.productData;

const formData = ref({
  three_pl_customer_id: ref(''),
  vendor_id: ref([]),
  warehouse_id: ref(''),
});

const showLists = computed(() => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const userType = userInfo.user_type;
  return !!((userType === THREE_PL || userType === THREE_PL_STAFF));
});

function handleSelectedOptions(selectedValues) {
  formData.value.vendor_id = selectedValues.map((item) => item.hash);
}

function handleSelectedWarehouse(selectedValues) {
  formData.value.warehouse_id = selectedValues.hash;
}

function handleSelectedCustomer(selectedValues) {
  formData.value.three_pl_customer_id = selectedValues.hash;
  getDependentData();
}

async function getDependentData() {
  await productStore.getVendor(formData.value.three_pl_customer_id);
  vendors.value = productStore.productData;
  await productStore.getWarehouse(formData.value.three_pl_customer_id);
  warehouses.value = productStore.productData;
}

</script>