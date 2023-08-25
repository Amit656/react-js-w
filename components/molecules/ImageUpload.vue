<template>
  <div class="relative mt-2 rounded-md">
    <div
      class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
        border-dashed rounded-md"
    >
      <div class="space-y-1 text-center">
        <div class="flex text-sm text-gray-600">
          <label
            for="file-upload"
            class="relative cursor-pointer bg-white rounded-md font-medium
                text-indigo-600 hover:text-indigo-500 focus-within:outline-none
                focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span> {{ $t('txt_uploadimg') }}</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              multiple
              accept="image/*"
              @change="onFileChange"
            >
          </label>
        </div>
      </div>
    </div>
    <div
      v-if="imagesShow.length > 0"
      class="flex flex-wrap mt-2"
    >
      <div
        v-for="(image, index) in imagesShow"
        :key="index"
        class="relative w-20 h-20 mr-2 mb-2"
      >
        <img
          :src="image"
          class="w-full h-full object-cover rounded-md"
        >
        <div
          class="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full
            flex justify-center items-center cursor-pointer"
          @click="removeImage(index)"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change']);

const images = ref([]);
const imagesShow = ref([]);

const createImage = (file) => {
  for (let i = 0; i < file.length; i += 1) {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push(file[i]);
      imagesShow.value.push(e.target.result);
    };
    reader.readAsDataURL(file[i]);
  }
};
const onFileChange = async (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  await createImage(files);
  emit('change', files);
  images.value = [];
  imagesShow.value = [];
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  imagesShow.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>

</style>
