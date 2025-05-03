// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        '@vesp/nuxt-fontawesome',
    ],
    css: [
        'public/assets/css/tailwind.css',
        'public/assets/css/styles.css',
    ],
    ui: {
        colorMode: false
    }
})