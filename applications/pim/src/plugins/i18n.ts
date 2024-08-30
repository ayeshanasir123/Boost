import { createI18n } from 'vue-i18n'
export const i18n = createI18n({
    legacy: false,
    locale: 'sv',
    fallbackLocale: 'en',
    messages: {
      en: {
        ui: {
          logout: 'Logout'
        }
      },
      sv: {
        ui: {
          logout: 'Logga ut'
        }
      }
    }
  })