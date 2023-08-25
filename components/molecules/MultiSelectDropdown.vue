<template>
  <Multiselect
    v-model="selectedOptions"
    :options="optionList"
    :multiple="multiple"
    :track-by="trackBy"
    :label="label"
    :placeholder="placeholder"
    @select="$emit('change', selectedOptions)"
    @remove="$emit('change', selectedOptions)"
  />
</template>

<script setup>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

const selectedOptions = ref([]);
const props = defineProps({
  selected: {
    type: Array,
    default: null,
  },
  optionList: {
    type: Array,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  trackBy: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['change']);
onMounted(() => {
  if (props.selected) {
    selectedOptions.value = props.selected;
  }
});
</script>

<style scoped>
</style>
