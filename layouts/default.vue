<template>
  <div class="min-h-full">
    <OrganismsHeader />
    <div class="p-4">
      <MoleculesLocale />
      <NuxtLoadingIndicator :height="4" />
      <slot />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Stallion | Warehouse ',
});
</script>

<style lang="scss" scoped>

</style>
