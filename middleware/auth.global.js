export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.WAREHOUSE_URL;
  if (!localStorage.getItem('access_token')) {
    return navigateTo(`${baseURL}/login`, {
      external: true,
    });
  }
});
