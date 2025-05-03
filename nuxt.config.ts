// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxt/ui',
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@vesp/nuxt-fontawesome',
    ],
    css: [
        'public/assets/css/styles.css',
    ],
})