import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,  
    locale: 'sv_SE',
    fallbackLocale: 'en_US',
    messages: {
      en_US: {
        ui: {
          logout: 'Logout'
        },
        en_US: "English (USA)",
        sv_SE: "Svenska"
      },
      sv_SE: {
        ui: {
          logout: 'Logga ut'
        },
        "Select Language": "Välj språk",
      },
    }
  })

export default i18n;