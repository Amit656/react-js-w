<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="bg-gray-800"
  >
    <div class="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400
            hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset
            focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="items-center">
            <NuxtLink
              to="/"
            >
              <AtomsImage
                src="/logo-180x180.png"
                alt="Stallion Logo"
                class="hidden h-8 w-auto lg:block"
              />
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <Popover class="relative">
                <span
                  v-for="(item, key) in navigation"
                  :key="key"
                >
                  <PopoverButton
                    :class="[item.current ? 'bg-gray-900 text-white' : 'inline-flex items-center',
                             'gap-x-1 text-sm font-semibold leading-6 text-gray-300',
                             'hover:bg-gray-700 hover:text-white rounded-md px-3 py-2',
                             'text-sm font-medium']"
                    :aria-current="item.current ? 'page' : undefined"
                    @click="selected = key"
                  >
                    <span>{{ $t(key) }}  </span>
                    <ChevronDownIcon
                      v-if="item"
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                  </PopoverButton>
                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1"
                  >
                    <PopoverPanel
                      class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2
                      px-4"
                    >
                      <div
                        v-if="item && selected == key"
                        class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6
                        text-gray-900 shadow-lg ring-1 ring-gray-900/5"
                      >
                        <NuxtLink
                          v-for="menu in item"
                          :key="menu.name"
                          :to="menu.to"
                          class="block p-2 hover:text-indigo-600"
                        >
                          {{ menu.name }}
                        </NuxtLink>
                      </div>
                    </PopoverPanel>
                  </transition>
                </span>
              </Popover>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto
          sm:ml-6 sm:pr-0"
        >
          <Menu
            as="div"
            class="relative ml-3"
          >
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2
                focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                >
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white
                py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  <p class="block px-4 py-2 text-sm font-medium text-gray-700">
                    <!-- {{ email }} -->
                  </p>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300',
                   'hover:bg-gray-700 hover:text-white',
                   'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem,
  MenuItems, Popover, PopoverButton, PopoverPanel,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

// const email = localStorage.getItem('user_info');
// create an object for menu with sub-menu items and their links
const navigation = {
  '3PL': [
    { name: 'Customers', to: '/', local: 'locationType.label' },
  ],
  Inventory: [
    { name: 'Products', to: '/products', local: 'product.label' },
    { name: 'Location Types', to: '/location-types', local: 'locationType.label' },
    { name: 'Locations', to: '/locations', local: 'location.label' },
  ],
  Order: [
    { name: 'Order Statuses', to: '/order-statuses', local: 'orderStatus.label' },
  ],
  'Purchase Order': [
    { name: 'Vendors', to: '/vendors', local: '' },
  ],
};

const selected = ref('');

</script>
